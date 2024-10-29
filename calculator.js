const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

/* Armazena valores */
let selectedButtonNumber = '';
let selectedButtontOperator = '';
let previousNumber = ''; // numero anterior ao operador
let displayResult = '';

/* Funcionalidades dos valores */

buttons.forEach(button => { 
  button.addEventListener('click', () => { 
    const value = button.textContent;
    const action = button.dataset.action; 

    if (action === 'delete') {
      selectedButtonNumber = selectedButtonNumber.slice(0, -1);
      display.value = selectedButtonNumber;
    } else if (value === 'c') {
      selectedButtonNumber = '';
      selectedButtontOperator = '';
      previousNumber = '';
      display.value = '';
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      selectedButtontOperator = value; 
      previousNumber = selectedButtonNumber; // numero atual armazenado na variavel
      selectedButtonNumber = ''; // receber o próximo valor
    } else if (value === '=') {
      let result;
      switch (selectedButtontOperator) { // bloco operador selecionado
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
        default: // selectedButtonOperator inválido retorna e sai
          return;
      }
      selectedButtonNumber = result.toString();
      display.value = selectedButtonNumber; // após o resultado
      selectedButtontOperator = ''; // prepara para a próxima operação
      previousNumber = '';
      displayResult = true;
    } else {
      if (displayResult && !isNaN(value)) { // se o resultado tá sendo exibido e um número foi clicado
        selectedButtonNumber = value;
        displayResult = false; // Reseta o estado
      } else {
        if (value === '.' && selectedButtonNumber === '') {
          selectedButtonNumber = '0.';
        } else {
          selectedButtonNumber += value;
        }
      }
      display.value = selectedButtonNumber;
    }
  });
});
