// Elements
const display = document.getElementById('num-display');
const errorDisplay = document.getElementById('error-display');

// Variables
let firstNum = 0;
let secondNum = 0;
let isDecimalActive = false;
let isErrorActive = false;
let total = 0;
let isDivideActive = false;
let isMultiplyActive = false;
let isSubtractActive = false;
let isAddActive = false;

// Functions
function numButtonPress(button) {
  switch (true) {
    case isDivideActive:
    case isMultiplyActive:
    case isSubtractActive:
    case isAddActive:
      display.innerText = secondNum;
        switch (true) {
          case display.innerText.length < 20:
            manageDisplay(button);
            secondNum = display.innerText;
            break;
          default:
            break;
        }
      break;
    default:
      switch (true) {
        case display.innerText.length < 20:
          manageDisplay(button);
          firstNum = display.innerText;
          break;
        default:
          break;
      }
      break;
  }
};

function opButtonPress(button) {
  switch (button) {
    case '/':
      isDivideActive = true;
      break;
    case 'x':
    case '*':
      isMultiplyActive = true;
      break;
    case '-':
      isSubtractActive = true;
      break;
    case '+':
      isAddActive = true;
      break;
  }
  isDecimalActive = false;
};

function decButtonPress() {
  display.innerText = display.innerText + '.';
  switch (true) {
    case isDivideActive:
    case isMultiplyActive:
    case isSubtractActive:
    case isAddActive:
      secondNum = display.innerText;
      break;
    default:
      firstNum = display.innerText;
      break;
  }
  isDecimalActive = true;
}

function backspaceButtonPress() {
  display.innerText = display.innerText.substring(0, display.innerText.length - 1);

  if (display.innerText.length === 0) display.innerText = '0';

  switch (true) {
    case isDivideActive:
    case isMultiplyActive:
    case isSubtractActive:
    case isAddActive:
      secondNum = display.innerText;
      break;
    default:
      firstNum = display.innerText;
      break;
  }
}

function reset() {
  isDivideActive = false;
  isMultiplyActive = false;
  isSubtractActive = false;
  isAddActive = false;
  firstNum = 0;
  secondNum = 0;
  total = 0;
  display.innerText = 0;
}

function manageDisplay(button) {
  if (display.innerText === '0') display.innerText = '';

  display.innerText = display.innerText + button;
};

function doMath(first, second) {
  firstNum = parseFloat(first);
  secondNum = parseFloat(second);

  switch (true) {
    case isDivideActive:
      total = firstNum / secondNum;
      break;
    case isMultiplyActive:
      total = firstNum * secondNum;
      break;
    case isSubtractActive:
      total = firstNum - secondNum;
      break;
    case isAddActive:
      total = firstNum + secondNum;
      break;
  }
  display.innerText = total;
};

function errorMsg() {
  isErrorActive = true;
  display.innerText = "ERROR";
  errorDisplay.innerText = 'Now why did you do that? Please refresh the page to continue.'
}

export {
  numButtonPress,
  opButtonPress,
  decButtonPress,
  backspaceButtonPress,
  reset,
  doMath,
  errorMsg,
  firstNum,
  secondNum,
  isDecimalActive,
  isErrorActive
}