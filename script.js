const buttons = document.querySelectorAll(".operator, .number");
const displayVal = document.querySelector(".display p");

let currentVal = "";
let num1 = "";
let num2 = "";
let op = "";

const clearInput = function () {
    num1 = "";
    num2 = "";
    op = "";
}

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
            if (currentVal && num1 && !op) {
                clearInput();
                currentVal = value.toString();
                displayVal.textContent = currentVal;
            } else {
                currentVal += value;
                displayVal.textContent = currentVal;
            }
            break;

        case "operator":
            if (currentVal && num1 && op) {
                num2 = currentVal;
                currentVal = operate(num1, num2, op).toString();
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
                currentVal = operate(num1, num2, op).toString();
                displayVal.textContent = currentVal;
                clearInput();
                num1 = currentVal;
            }
            break;

        case "clear":
            clearInput();
            currentVal = "";
            displayVal.textContent = "";
            break;

        case "decimal":
            if (currentVal && num1 && !op) {
                clearInput();
                currentVal = "0.";
                displayVal.textContent = currentVal;
            } else if (!currentVal) {
                currentVal = "0.";
                displayVal.textContent = currentVal;
            } else if (!currentVal.includes(value)) {
                currentVal += value;
                displayVal.textContent = currentVal;
            }
            break;

        case "sign":
            if (currentVal.startsWith("-")) {
                currentVal = currentVal.slice(1,currentVal.length);
                displayVal.textContent = currentVal;
            } else {
                currentVal = "-" + currentVal;
                displayVal.textContent = currentVal;
            }
            break;

        case "backspace":
            if (currentVal && num1 && !op) {
                clearInput();
                currentVal = "";
                displayVal.textContent = "";
            } else {
                currentVal = currentVal.slice(0,currentVal.length-1);
                displayVal.textContent = currentVal;
                break;
            }

    }
    console.log(`currentVal: ${currentVal}, num1: ${num1}, num2: ${num2}, op: ${op}`);

}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        const type = button.dataset.type;
        const value = button.dataset.value;
        calculate(type, value);
    })
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        calculate("equals");
    } else {
        const key = document.querySelector(`div[data-value="${e.key}"]`);
        if (!key) return;
        const type = key.dataset.type;
        const value = key.dataset.value;
        calculate(type, value);
    }
})