const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");

function parseInput(value) {
    const num = parseFloat(value);
    return Number.isNaN(num) ? null : num;
}

function calculate(operator) {
    const num1 = parseInput(firstNumber.value);
    const num2 = parseInput(secondNumber.value);

    if (num1 === null || num2 === null) {
        result.value = "Enter valid numbers";
        return;
    }

    if (operator === "/" && num2 === 0) {
        result.value = "Cannot divide by zero";
        return;
    }

    switch (operator) {
        case "+":
            result.value = num1 + num2;
            break;
        case "-":
            result.value = num1 - num2;
            break;
        case "*":
            result.value = num1 * num2;
            break;
        case "/":
            result.value = num1 / num2;
            break;
        default:
            result.value = "Unknown operator";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        calculate(button.dataset.op);
    });
});

