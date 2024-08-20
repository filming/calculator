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

let firstNumber = null, secondNumber = null, operator = "";
const displayValueLabel = document.querySelector(".main__display-value");

let currNumInput = "";
let lastBtnClickedType = "";

function updateDisplay(){
    // debug logging
    console.log("==============");
    console.log("cNI = " + currNumInput);
    console.log("fN = " + firstNumber);
    console.log("sN = " + secondNumber);
    console.log("O = " + operator);
    console.log("==============");

    if (lastBtnClickedType === "digit"){
        displayValueLabel.textContent = currNumInput;
    } 
    else if (lastBtnClickedType === "operator" || lastBtnClickedType === "utility"){
        displayValueLabel.textContent = firstNumber;
    }
}

document.addEventListener("DOMContentLoaded", event => {
    // update the display & variables when a digit is clicked
    const numericBtns = document.querySelectorAll(".digit");

    numericBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {
            currNumInput += currBtn.textContent;
            
            lastBtnClickedType = "digit";
            updateDisplay();
        })
    });

    // update the first & second num vals when user clicks an arithmetic operator
    const arithmeticBtns = document.querySelectorAll(".arithmetic");

    arithmeticBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {            
            
            // only perform operation if numbers have been given since the last operation button click
            if (currNumInput !== ""){
                if (firstNumber === null){
                    firstNumber = Number(currNumInput);
                    operator = currBtn.id;

                    lastBtnClickedType = "operator";
                    currNumInput = "";
                    updateDisplay();
                }
                else {
                    secondNumber = Number(currNumInput);
                    
                    // reset calculator instance and show an error if user is dividing by 0.
                    if (secondNumber === 0 && operator === "divide") {
                        firstNumber = null, secondNumber = null, operator = "";
                        currNumInput = "";
                        lastBtnClickedType = "";
                        
                        displayValueLabel.textContent = "ERROR: ZERO DIVISION";
                    } 
                    else {
                        // operate using currently stored operation
                        // we now have both numbers, so we can compute the result and store it as the firstNumber
                        firstNumber = operate(operator, firstNumber, secondNumber);
                        
                        // setup the vars for the next operation
                        operator = currBtn.id;
                        secondNumber = null;

                        lastBtnClickedType = "operator";
                        currNumInput = "";
                        updateDisplay();
                    }
                }
            } 
            else {
                // user has not given us any new digit input since their last operator click, so just change the operator
                operator = currBtn.id;
                lastBtnClickedType = "operator";
            }
        });
    });

    // perform different actions when a utility button is clicked
    const utilityBtns = document.querySelectorAll(".utility");

    utilityBtns.forEach(currBtn => {
        currBtn.addEventListener("click", clickEvent => {

            if (currBtn.id === "equal"){
                if (currNumInput !== ""){
                    if (firstNumber === null){
                        firstNumber = Number(currNumInput);
    
                        lastBtnClickedType = "utility";
                        operator = "";
                        currNumInput = "";
                        updateDisplay();
                    }
                    else {
                        secondNumber = Number(currNumInput);
                        
                        // operate using currently stored operation
                        // we now have both numbers, so we can compute the result and store it as the firstNumber
                        firstNumber = operate(operator, firstNumber, secondNumber);
                        
                        // setup the vars for the next operation
                        operator = "";
                        secondNumber = null;

                        lastBtnClickedType = "utility";
                        currNumInput = "";
                        updateDisplay();
                    }
                }
            }
        });
    });
});
