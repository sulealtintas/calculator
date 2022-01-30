const add = function (n1, n2) {
    return n1 + n2;
};

const subtract = function (n1, n2) {
    return n1 - n2;
};

const multiply = function (n1, n2) {
    return n1 * n2;
};

const divide = function (n1, n2) {
    return n1 / n2;
};

const operate = function (n1, n2, op) {
    n1 = +n1;
    n2 = +n2;

    if (op === "+") {
        return add(n1, n2);
    }
    if (op === "-") {
        return subtract(n1, n2);
    }
    if (op === "*") {
        return multiply(n1, n2);
    }
    if (op === "/") {
        return divide(n1, n2);
    }
}

const buttons = document.querySelectorAll("button");
const displayVal = document.querySelector(".display p");

let currentVal = "";
let num1 = "";
let num2 = "";
let op = "";

buttons.forEach(button => {
    button.addEventListener("click", function () {
        if (button.classList.contains("number")) {
            currentVal += this.dataset.value;
            displayVal.textContent = currentVal;
        }
        else if (button.classList.contains("operator")) {
            if (num1 && op) {
                num2 = currentVal;
                currentVal = operate(num1,num2,op);
                displayVal.textContent = currentVal;
                num2 = "";
            }
            num1 = currentVal;
            op = this.dataset.operator;
            currentVal = "";
        }
        else if (button.classList.contains("equals")) {
            num2 = currentVal;
            currentVal = operate(num1,num2,op);
            displayVal.textContent = currentVal;
            num1 = currentVal;
            num2 = "";
            op = "";
        }
        else if (button.classList.contains("clear")) {
            currentVal = "";
            num1 = "";
            num2 = "";
            op = "";
            displayVal.textContent = "";
        }
        console.log(`currentVal: ${currentVal}, num1: ${num1}, num2: ${num2}, op: ${op}`);
    })
})