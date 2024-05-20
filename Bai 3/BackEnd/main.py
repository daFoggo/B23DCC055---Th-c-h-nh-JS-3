from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import requests


app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str
    hashedpassword: str 
    
database = {
    "user1": {
        "username": "user1",
        "password": "password1",
        "hashedpassword" : "hashedpassword1",
        "disabled": False
    },
    "user2": {
        "username": "user2",
        "password": "password2",
        "hashedpassword" : "hashedpassword2",
        "disabled": False
    }
}

def hash_password(password: str):
    return "hashed" + password

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(database, username: str):
    if username in database:
        user_dict = database[username]
        return User(**user_dict)
    
def decode_token(token: str):
    user = get_user(database, token)
    return user

def getStudentFromAPI():
    try:
        response = requests.get("https://jsonplaceholder.typicode.com/users")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching data from API", e)
        return None

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = database.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username")
    
    user = User(**user_dict)
    hashed_password = hash_password(form_data.password)
    
    if not hashed_password == user.hashedpassword:
        raise HTTPException(status_code=400, detail="Incorrect password or username")
    
    return {"access_token": user.username, "token_type": "bearer"}

@app.get("/users/me")
async def read_user_me(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    if user is None or user.disabled:
        raise HTTPException(status_code=400, detail="Invalid token")
    return user

@app.get("/students")
async def getStudents():
    studentData = getStudentFromAPI()
    if studentData is None:
        raise HTTPException(status_code=400, detail="Error fetching data from API")
    else :
        return studentData
    