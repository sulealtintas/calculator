const buttons = document.querySelectorAll("button");
const displayVal = document.querySelector(".display p");

let currentVal = "";
let num1 = "";
let num2 = "";
let op = "";

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

const calculate = function (type, value) {
    switch (type) {
        case "number":
            currentVal += value;
            displayVal.textContent = currentVal;
            break;

        case "operator":
            if (currentVal && num1 && op) {
                num2 = currentVal;
                currentVal = operate(num1, num2, op);
                displayVal.textContent = currentVal;
                num2 = "";
            } else if (num1 && op) {
                op = value;
            }
            if (currentVal) {
                num1 = currentVal;
                op = value;
                currentVal = "";
            }
            break;

        case "equals":
            if (currentVal && num1 && op) {
                num2 = currentVal;
                currentVal = operate(num1, num2, op);
                displayVal.textContent = currentVal;
                num1 = currentVal;
                num2 = "";
                op = "";
            }
            break;

        case "clear":
            currentVal = "";
            num1 = "";
            num2 = "";
            op = "";
            displayVal.textContent = "";
            break;

        case "decimal":
            if (!currentVal.includes("."))
                currentVal += ".";
            displayVal.textContent = currentVal;
            break;
    }
    console.log(`currentVal: ${currentVal}, num1: ${num1}, num2: ${num2}, op: ${op}`);
}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        const type = button.dataset.type;
        const value = button.dataset.value;
        console.log(type, value);
        calculate(type, value);
    })
})

window.addEventListener("keydown", function (e) {
    const key = document.querySelector(`button[data-value="${e.key}"]`);
    if (!key) return;
    const type = key.dataset.type;
    const value = key.dataset.value;
    calculate(type, value);
})