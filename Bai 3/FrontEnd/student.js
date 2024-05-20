document.addEventListener('DOMContentLoaded', function() {
    const originAPI = "http://127.0.0.1:8000";

    let table = document.getElementById("table");
    fetch(`${originAPI}/students`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(student => {
            let row = document.createElement("tr");
            let idCell = document.createElement("td");
            idCell.textContent = student.id; 
            let nameCell = document.createElement("td");
            nameCell.textContent = student.name;
            let usernameCell = document.createElement("td");
            usernameCell.textContent = student.username; 
            let emailCell = document.createElement("td");
            emailCell.textContent = student.email; 


            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(usernameCell);
            row.appendChild(emailCell);

            table.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
