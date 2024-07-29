const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

/* Armazena valores */
let selectedButtonNumber = '';
let selectedButtontOperator = '';
let previousNumber = '';
let displayResult = '';

/* Funcionalidades dos valores */

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const action = button.dataset.action;
    
    if 
      (action === 'delete') {
        selectedButtonNumber = selectedButtonNumber.slice(0, -1);
        display.value = selectedButtonNumber;
    } else if (value === 'c') {
        selectedButtonNumber = '';
        selectedButtontOperator = '';
        previousNumber = '';
        display.value = '';
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      selectedButtontOperator = value;
      previousNumber = selectedButtonNumber;
      selectedButtonNumber = '';
    } else if (value === '=') {
      let result;
      switch (selectedButtontOperator) {
        case '+':
          result = parseFloat(previousNumber) + parseFloat(selectedButtonNumber);
          break;
        case '-':
          result = parseFloat(previousNumber) - parseFloat(selectedButtonNumber);
          break;
        case '*':
          result = parseFloat(previousNumber) * parseFloat(selectedButtonNumber);
          break;
        case '/':
          if (parseFloat(selectedButtonNumber) === 0) {
            result = 'Erro';
          } else {
              result = parseFloat(previousNumber) / parseFloat(selectedButtonNumber);
          }
          break;
        default:
          return;
      }
      selectedButtonNumber = result.toString();
      display.value = selectedButtonNumber;
      selectedButtontOperator = '';
      previousNumber = '';
      displayResult = true;
    } else {
      if (displayResult && !isNaN(value)) { 
        selectedButtonNumber = value;
        displayResult = false; // Reseta o estado
    } else {
        selectedButtonNumber += value;
    }
    display.value = selectedButtonNumber;
    }
  });
});

