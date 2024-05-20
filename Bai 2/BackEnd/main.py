from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:5501",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/add")
def add(a: float, b: float):
    return a + b

@app.get("/sub")
def sub(a: float, b: float):
    return a - b

@app.get("/mul")
def mul(a: float, b: float):
    return a * b

@app.get("/div")
def div(a: float, b: float):
    if b == 0:
        raise HTTPException(status_code=400, detail="Can't divide by zero")
    return a / b