document.addEventListener('DOMContentLoaded', function() {
    const authorList = document.getElementById("authors");
    const list = document.createDocumentFragment();
    const postInputName = document.getElementById("postInputName");
    const postInputEmail = document.getElementById("postInputEmail");
    const postButton = document.getElementById("postButton");

    const APIUrl = "https://jsonplaceholder.typicode.com/users";

    fetch(APIUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(author => {
            let li = document.createElement("li");
            let name = document.createElement("h2");
            let email = document.createElement("span");

            name.innerHTML = `Name : ${author.name}`;
            email.innerHTML = `Email : ${author.email}`;

            li.appendChild(name);
            li.appendChild(email);

            list.appendChild(li);
        });

        authorList.appendChild(list);
    })
    .catch(error => {
        console.error(error);
    });

    postButton.addEventListener("click", function() {
        const name = postInputName.value;
        const email = postInputEmail.value;

        fetch(APIUrl, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    });
    
});
