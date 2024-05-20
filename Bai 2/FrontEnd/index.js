document.addEventListener('DOMContentLoaded', function () {
    const originAPI = "http://127.0.0.1:8000/";

    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const result = document.getElementById("result");

    const add = document.getElementById("add");
    const subtract = document.getElementById("sub");
    const multiply = document.getElementById("mul");
    const divide = document.getElementById("div");
    const clear = document.getElementById("clear");

    const checkInputs = () => {
        if (inputA.value === "" || inputB.value === "") {
            result.innerHTML = "Please enter both values!";
            return false;
        }
        return true;
    };

    const fetchResult = (operation) => {
        if (!checkInputs()) return;

        let url = `${originAPI}${operation}?a=${inputA.value}&b=${inputB.value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                result.innerHTML = data;
            });
    };

    add.addEventListener("click", () => fetchResult("add"));
    subtract.addEventListener("click", () => fetchResult("sub"));
    multiply.addEventListener("click", () => fetchResult("mul"));
    divide.addEventListener("click", () => {
        if (!checkInputs()) return;
        if (inputB.value === "0") {
            result.innerHTML = "Cannot divide by zero";
            return;
        }
        fetchResult("div");
    });

    clear.addEventListener("click", () => {
        inputA.value = "";
        inputB.value = "";
        result.innerHTML = "";
    });
});
