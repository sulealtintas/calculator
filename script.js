const buttons = document.querySelectorAll(".operator, .number");
const displayVal = document.querySelector(".display p");
const decimals = 4;

let currentVal = "";
let n1 = "";
let n2 = "";
let op = "";

const clearInput = function () {
    n1 = "";
    n2 = "";
    op = "";
}

const round = function (number, decimals) {
    return Math.round(number * 10 ** decimals) / 10 ** decimals;
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
    let result;

    if (op === "+") {
        result = add(n1, n2);
    }
    if (op === "-") {
        result = subtract(n1, n2);
    }
    if (op === "*") {
        result = multiply(n1, n2);
    }
    if (op === "/") {
        result = divide(n1, n2);
    }

    if (result.toString().length <= 16) {
        console.log(result.toString().length);
        return round(result, decimals).toString();
    } else {
        return result.toExponential(4).toString();
    }
}

const calculate = function (type, value) {
    switch (type) {
        case "number":
            if (currentVal && n1 && !op) {
                clearInput();
                currentVal = value;
                displayVal.textContent = currentVal;
            } else if (currentVal.length < 15) {
                currentVal += value;
                displayVal.textContent = currentVal;
            }
            break;

        case "operator":
            if (currentVal && n1 && op) {
                n2 = currentVal;
                currentVal = operate(n1, n2, op);
                displayVal.textContent = currentVal;
                n2 = "";
            } else if (n1 && op) {
                op = value;
            }
            if (currentVal) {
                n1 = currentVal;
                op = value;
                currentVal = "";
            }
            break;

        case "equals":
            if (currentVal && n1 && op) {
                n2 = currentVal;
                currentVal = operate(n1, n2, op);
                displayVal.textContent = currentVal;
                clearInput();
                n1 = currentVal;
            }
            break;

        case "clear":
            clearInput();
            currentVal = "";
            displayVal.textContent = "";
            break;

        case "decimal":
            if (currentVal && n1 && !op) {
                clearInput();
                currentVal = "0.";
                displayVal.textContent = currentVal;
            } else if (!currentVal) {
                currentVal = "0.";
                displayVal.textContent = currentVal;
            } else if (!currentVal.includes(value) && currentVal.length < 15) {
                currentVal += value;
                displayVal.textContent = currentVal;
            }
            break;

        case "sign":
            if (currentVal.startsWith("-")) {
                currentVal = currentVal.slice(1, currentVal.length);
                displayVal.textContent = currentVal;
            } else {
                currentVal = "-" + currentVal;
                displayVal.textContent = currentVal;
            }
            break;

        case "backspace":
            if (currentVal && n1 && !op) {
                clearInput();
                currentVal = "";
                displayVal.textContent = "";
            } else if (!currentVal && n1 && op) {
                break;
            } else {
                currentVal = currentVal.slice(0, currentVal.length - 1);
                displayVal.textContent = currentVal;
            }
    }
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