document.addEventListener('DOMContentLoaded', function() {
    let inputName = document.getElementById('inputName');
    let inputPassword = document.getElementById('inputPassword');
    let loginButton = document.getElementById('loginButton');
    let loginForm = document.getElementById('loginForm');

    const originAPI = "http://127.0.0.1:8000";

    loginButton.addEventListener('click', function() {
        let name = inputName.value;
        let password = inputPassword.value;

        let data = new URLSearchParams();
        data.append("username", name);
        data.append("password", password);

        fetch(`${originAPI}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.access_token) {
                alert("Login successful!");
                console.log(result.access_token);
                localStorage.setItem('token', result.access_token);
                window.location.href = "student.html";
            } else {
                alert("Login failed: " + result.detail);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    });
});
