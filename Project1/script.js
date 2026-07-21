const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(value) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function performOperation(nextOperator) {
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
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === 'clear') {
            clearCalculator();
        } else if (action === 'equals') {
            evaluateExpression();
        } else if (value) {
            if (!isNaN(value) || value === '.') {
                if (value === '.') {
                    appendDecimal();
                } else {
                    appendNumber(value);
                }
            } else {
                performOperation(value);
            }
        }
    });
});

updateDisplay();
