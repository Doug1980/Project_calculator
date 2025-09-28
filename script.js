/* ====== LÓGICA DA CALCULADORA ====== */
const display = document.getElementById('display');
let currentValue = '';
let operator = '';
let previousValue = '';

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            // números e ponto
            currentValue += value;
        } else if (value === '+' || value === '-' || value === 'X' || value === '/' || value === '%') {
            if (currentValue === '' && previousValue !== '') {
                // permite trocar operador antes de digitar próximo número
                operator = value;
            } else {
                operator = value;
                previousValue = currentValue;
                currentValue = '';
            }
        } else if (value === '=') {
            if (previousValue === '' || currentValue === '' || operator === '') return;

            const a = parseFloat(previousValue);
            const b = parseFloat(currentValue);
            let result;

            switch (operator) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case 'X': result = a * b; break;
                case '/': result = a / b; break;
                case '%': result = a % b; break;
            }

            display.value = result;
            currentValue = result.toString();
            previousValue = '';
            operator = '';
            return;
        } else if (value === 'C') {
            currentValue = '';
            previousValue = '';
            operator = '';
        }

        // atualiza display mostrando toda a expressão
        display.value = previousValue + (operator ? ' ' + operator + ' ' : '') + currentValue;
    });
});