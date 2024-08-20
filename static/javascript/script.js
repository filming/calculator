function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 === 0){
        return NaN;
    }
    return num1 / num2;
}

function operate(operator, firstNumber, secondNumber){
    switch (operator){
        case "add":
            return add(firstNumber, secondNumber);

        case "subtract":
            return subtract(firstNumber, secondNumber);

        case "multiply":
            return multiply(firstNumber, secondNumber);

        case "divide":
            return divide(firstNumber, secondNumber);
    }
}

let firstNumber, secondNumber, operator;
