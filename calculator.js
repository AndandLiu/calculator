let firstNum = "", secondNum = "", currentOperator = "";

const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const multiply = function(num1, num2) {
    return num1 * num2;
};

const divide = function(num1, num2) {
    return num1 / num2;
};

function operate(num1, num2, operator) {
    let solution = 0;

    if(operator == "+") {
        solution = add(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "-") {
        solution = subtract(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "*") {
        solution = multiply(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "/") {
        solution = divide(parseFloat(num1), parseFloat(num2));
    }
    solution = Math.round(solution * 100) / 100;

    return solution;
}

function displayNum(num) {

    if(num == ".") {
        disableDecimalButton(true);
    }

    if(currentOperator != "") {
        secondNum += num;
        updateDisplay();
    }
    else {
        firstNum += num;
        updateDisplay();
    }
}

function calculatorOperator(operator) {

    if(firstNum == "") {
        clearAll();
        updateDisplay("ERROR");
    }
    else {
        disableDecimalButton(false);

        if(currentOperator == "divide" && secondNum == "0") {
            clearAll();
            updateDisplay("DON'T DO THAT");
        }
        else if(currentOperator != "" && secondNum != "") {
            updateDisplay("past");
            firstNum = operate(firstNum, secondNum, currentOperator);
            secondNum = "";
            currentOperator = operator;
            updateDisplay();
        }
        else {
            currentOperator = operator;
            updateDisplay();
        }
    }
}

function equals() {
    if(currentOperator == "divide" && secondNum == "0") {
        clearAll();
        updateDisplay("DON'T DO THAT");
    }
    else if(currentOperator != "" && secondNum != "") {
        updateDisplay("past");
        const solution = operate(firstNum, secondNum, currentOperator);
        clearAll();
        firstNum = solution.toString();
        updateDisplay();
    }
    else {
        clearAll();
        updateDisplay("ERROR");
    }
}

function clearAll() {
    disableDecimalButton(false);
    firstNum = "";
    secondNum = "";
    currentOperator = "";
    updateDisplay();
}

function clearButton() {
    clearAll();
    updateDisplay("past");
}

function updateDisplay(text) {
    const display = document.querySelector("#display");
    const pastDisplay = document.querySelector("#pastDisplay");

    if(text == undefined) {
        display.textContent = firstNum + " " + currentOperator + " " + secondNum;
    }
    else if(text == "past") {
        pastDisplay.textContent = firstNum + " " + currentOperator + " " + secondNum;
    }
    else {
        display.textContent = text;
    }
}

function backSpace() {
    if(secondNum != "") {
        if(secondNum.slice(-1) == ".") {
            disableDecimalButton(false);
        }
        secondNum = secondNum.substring(0, secondNum.length - 1);
        updateDisplay();
    }
    else if(currentOperator != "") {
        currentOperator = ""
        updateDisplay();
    }
    else if(typeof firstNum == "string") {
        if(firstNum.slice(-1) == ".") {
            disableDecimalButton(false);
        }
        firstNum = firstNum.substring(0, firstNum.length - 1);
        updateDisplay();
    }
}

function disableDecimalButton(bool) {
    const decimal = document.querySelector("#decimal");

    decimal.disabled = bool;
}

document.addEventListener('keydown', function(event) {
    if(!isNaN(event.key) || event.key == ".") {
        displayNum(event.key);
    }
    else if(event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
        calculatorOperator(event.key);
    }
    else if(event.key == "=" || event.key == "Enter") {
        equals();
    }
    else if(event.key == "Backspace") {
        backSpace();
    }
    else if(event.key == "Escape") {
        clearButton();
    }
});