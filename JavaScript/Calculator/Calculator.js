let expression = "";
const input = document.querySelector(".calculator-input")

function click(value){
    if (isNaN(parseInt(value)))
        processSymbol(value);
    else
        processNumber(value);
}

function processNumber(num){
    if (expression === "0") 
            expression = num;
    else 
            expression += num;

    input.value = expression;
}

function solveDivideMultiplication(operators,numbers){
    for (let i = 0; i < operators.length; i++) {
        let symbol = operators[i];

        if (symbol === "x" || symbol === "÷") {
            let leftNumber = numbers[i];
            let rightNumber = numbers[i + 1];
            let result;

            if (symbol === "x")
                result = leftNumber * rightNumber;
            else 
                result = leftNumber / rightNumber;

            numbers.splice(i, 2, result); 
            operators.splice(i, 1);

            i -= 1; 
        }

        console.log(numbers);
        console.log(operators);
    }
}

function solveAddSubtract(operators, numbers){   
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        let symbol = operators[i];
        let nextNumber = numbers[i + 1];

        if (symbol === "+")
            result = result + nextNumber;
        
        else if (symbol === "-") 
            result = result - nextNumber;
    }
    input.value = result;
}

function processMath(expression){
    console.log(`This is the expression: ${expression}`);
    const parts = expression.split(" ");

    let numbers = []
    let operators = [];
    
    parts.forEach(p => {
        if ("+-x÷".includes(p)) {
            operators.push(p);
        } else {
            numbers.push(parseInt(p));
        }
    });
    console.log(numbers);
    console.log(operators);

    solveDivideMultiplication(operators,numbers);
    solveAddSubtract(operators,numbers); 

}

function opValidation(operator){
    const lastPart = expression.substring(expression.length-2,expression.length).trim();
    if (!isNaN(parseInt(lastPart))){
         expression += " " + operator + " ";
        input.value = expression;
    }
}

function processSymbol(symbol){
    switch(symbol){
        case "C":
            expression = "0";
            input.value = "";
            break;
        case "=":
            processMath(expression);
            expression = "0";
            break;
        case "←":
            // Backspace fix: remove blank spaces around ops as well
            expression = expression.substring(0,expression.length-1);
            input.value = expression || "";
            break;
        case "+":
        case "-":
        case "÷":
        case "x":
            opValidation(symbol);
            break;
    }
}

function init(){
document.querySelector(".calculator-container")
    .addEventListener("click", function (event) {
      click(event.target.innerText);
    });
}

init();