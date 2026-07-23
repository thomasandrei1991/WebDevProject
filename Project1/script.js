const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    // Update the calculator screen so it shows the current input value.
    display.value = currentInput;
}

function clearCalculator() {
    // Reset all calculator state so the display returns to its starting value.
    currentInput = '0';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(value) {
    // Add a digit to the current entry, replacing the old display when needed.
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function appendDecimal() {
    // Add a decimal point to the current number if one is not already present.
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function performOperation(nextOperator) {
    // Handle an operator press by storing the current value and preparing for the next input.
    const inputValue = parseFloat(currentInput);

    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operator) {
        const result = calculate(previousValue, inputValue, operator);
        currentInput = String(result);
        previousValue = result;
    }

    operator = nextOperator;
    shouldResetDisplay = true;
}

function calculate(a, b, op) {
    // Perform the requested arithmetic operation and return the result.
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        default:
            return b;
    }
}

function evaluateExpression() {
    // Complete the calculation when the equals button is pressed.
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(currentInput);
    const result = calculate(previousValue, inputValue, operator);

    currentInput = String(result);
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

buttons.forEach((button) => {
    // Attach a click handler to every calculator button.
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === 'clear') {
            // Clear the calculator when the clear button is pressed.
            clearCalculator();
        } else if (action === 'equals') {
            // Evaluate the current expression when equals is pressed.
            evaluateExpression();
        } else if (value) {
            if (!isNaN(value) || value === '.') {
                if (value === '.') {
                    // Add a decimal point when the dot button is used.
                    appendDecimal();
                } else {
                    // Add a number digit when a numeric button is pressed.
                    appendNumber(value);
                }
            } else {
                // Use the selected operator for the next calculation step.
                performOperation(value);
            }
        }
    });
});

// Show the initial calculator display when the page loads.
updateDisplay();
