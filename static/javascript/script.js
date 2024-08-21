let firstNumber = 0, secondNumber = null, operator = "add";
let currNumInput = "";
let lastBtnClickedType = "";
const displayValueLabel = document.querySelector(".main__display-value");

function add(num1, num2){
    const response = {error: false, message: null, value: null};

    response.value = num1 + num2;

    return response;
}

function subtract(num1, num2){
    const response = {error: false, message: null, value: null};
    
    response.value = num1 - num2;

    return response;
}

function multiply(num1, num2){
    const response = {error: false, message: null, value: null};

    response.value = num1 * num2;

    return response;
}

function divide(num1, num2){
    const response = {error: false, message: null, value: null};

    if (num2 === 0){
        response.error = true;
        response.message = "ERROR: ZERO DIVISION";   
    }
    else {
        response.value = Number((num1 / num2).toFixed(15));
    }

    return response;
}

// handles the overall operation of two numbers and an operator
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

// update the UI with values stored in our variables
function updateDisplay(){
    if (lastBtnClickedType === "digit"){
        displayValueLabel.textContent = currNumInput;
    }
    else if (lastBtnClickedType === "operator" || lastBtnClickedType === "utility" || lastBtnClickedType === ""){
        displayValueLabel.textContent = firstNumber;
    }
}

// set calculator back to its initial state
function resetCalculator(){
    firstNumber = 0;
    secondNumber = null;
    operator = "add";
    currNumInput = "";
    lastBtnClickedType = "";
}

// perform an operation with the currently stored numbers and operator and update display with result
function performOperation(operationType, currBtn){

    // perform operation only if user has given numeric input since the last operation button click
    if (currNumInput !== ""){

        secondNumber = Number(currNumInput);

        // use both numbers and the operator currently stored to get a result
        const operationResponse = operate(operator, firstNumber, secondNumber);

        // reset the calculator if we come across an operation error
        if (operationResponse.error === true){
            resetCalculator();
            displayValueLabel.textContent = operationResponse.message;
        }
        else {
            firstNumber = operationResponse.value;

            // setup the vars for the next operation
            currNumInput = "";
            secondNumber = null;

            if (operationType === "arithmetic"){
                operator = currBtn.id;
                lastBtnClickedType = "operator";
            } 
            else if (operationType === "utility"){
                operator = "add";
                lastBtnClickedType = "utility";
            }

            updateDisplay(); 
        }

    } 
    // allows the user to change the previously set operator (for example, if they misclick or change their mind)
    else if (operationType === "arithmetic"){
        operator = currBtn.id;
    }
}

document.addEventListener("DOMContentLoaded", event => {
    // update the variables & display when a digit is clicked
    const numericBtns = document.querySelectorAll(".digit");

    numericBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {
            currNumInput += currBtn.textContent;
            
            lastBtnClickedType = "digit";
            updateDisplay();
        })
    });

    // perform operations when user clicks on arithmetic buttons
    const arithmeticBtns = document.querySelectorAll(".arithmetic");

    arithmeticBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {
            performOperation("arithmetic", currBtn);
        });
    });

    // perform different actions when a utility button is clicked
    const utilityBtns = document.querySelectorAll(".utility");

    utilityBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {

            if (currBtn.id === "equal"){
                performOperation("utility", currBtn);
            }
            else if (currBtn.id === "clear"){
                // set the calculator to its initial state when clear button is clicked
                resetCalculator();
                updateDisplay();
            }
        });
    });
});
