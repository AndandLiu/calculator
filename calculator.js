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

    if(operator == "add") {
        solution = add(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "sub") {
        solution = subtract(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "multi") {
        solution = multiply(parseFloat(num1), parseFloat(num2));
    }
    else if(operator == "divide") {
        solution = divide(parseFloat(num1), parseFloat(num2));
    }
    solution = Math.round(solution * 100) / 100;

    return solution;
}

function displayNum(num) {

    if(num == ".") {
        const decimal = document.querySelector("#decimal");
        decimal.disabled = true;
    }

    if(currentOperator != "") {
        secondNum += num;
        display(secondNum);
    }
    else {
        firstNum += num;
        display(firstNum);
    }
}

function calculatorOperator(operator) {

    if(firstNum == "") {
        clearAll();
        display("ERROR");
    }
    else {
        const decimal = document.querySelector("#decimal");
        decimal.disabled = false;

        if(currentOperator == "divide" && secondNum == "0") {
            clearAll();
            display("DON'T DO THAT");
        }
        else if(currentOperator != "" && secondNum != "") {
            firstNum = operate(firstNum, secondNum, currentOperator);
            secondNum = "";
            currentOperator = operator;
            display(firstNum);
        }
        else {
            currentOperator = operator;
        }
    }
}

function equals() {
    if(currentOperator == "divide" && secondNum == "0") {
        clearAll();
        display("DON'T DO THAT");
    }
    else if(currentOperator != "" && secondNum != "") {
        const solution = operate(firstNum, secondNum, currentOperator);
        clearAll();
        display(solution);
    }
    else {
        clearAll();
        display("ERROR");
    }
}

function clearAll() {
    const decimal = document.querySelector("#decimal");
    decimal.disabled = false;
    firstNum = "";
    secondNum = "";
    currentOperator = "";
    display("");
}

function display(text) {
    const display = document.querySelector("#display");

    display.textContent = text;
}