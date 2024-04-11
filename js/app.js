/* 
  - Button for light/dark mode
  - Keyboard presses register visually on buttons
  - update with switchstatements
*/ 

// Elements
const numButtons = document.querySelectorAll('button.num');
const opButtons = document.querySelectorAll('button.operation');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const decimal = document.getElementById('decimal');
const enter = document.getElementById('enter');
const display = document.getElementById('num-display');
const errorDisplay = document.getElementById('error-display');

// Variables
let firstNum = 0;
let secondNum = 0;
let isDecimalActive = false;
let isErrorActive = false;
let isTotalEntered = false;
let total = 0;
let isDivideActive = false;
let isMultiplyActive = false;
let isSubtractActive = false;
let isAddActive = false;

const buttonNumbers = new Set ([0,1,2,3,4,5,6,7,8,9]);
const buttonOperators = new Set(['+','-','/','x','*']);


// Event listeners
document.addEventListener('keydown', function(keyPressed) {
  if (isErrorActive === true) return;

  if (buttonNumbers.has(parseInt(keyPressed.key)) && isTotalEntered === false) numButtonPress(keyPressed.key);

  if (buttonOperators.has(keyPressed.key) && isTotalEntered === false) opButtonPress(keyPressed.key);

  if (keyPressed.key === 'Enter' || keyPressed.key === '=' && isTotalEntered === false) {
    doMath(firstNum, secondNum);
    isTotalEntered = true;
  } 

  if (keyPressed.key === '.' && isDecimalActive === false && isTotalEntered === false) {
    decButtonPress(keyPressed.key);
  }

  if (keyPressed.key === 'Backspace' && isTotalEntered === false) {
    backspaceButtonPress();4
  }

  if (keyPressed.key === 'c' || keyPressed.key === 'C') {
    reset();
  }
});

numButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (isTotalEntered === true || isErrorActive === true) return;

    if (buttonNumbers.has(parseInt(button.innerText)) && isErrorActive === false) {
      numButtonPress(button.innerText);
    } else {
        error();
      }
  });
});

opButtons.forEach(function(button) {
  button.addEventListener('click', function() {

    if (isTotalEntered === true || isErrorActive === true) return;

    if (buttonOperators.has(button.innerText) && isErrorActive === false) {
      opButtonPress(button.innerText);  
    } else {
      error();
    }
  });
});

clear.addEventListener('click', function() {

  if (isErrorActive === true) return;

  if (this.innerText === 'C' && isErrorActive === false) {
    reset()
  } else {
    error();
  }
});

decimal.addEventListener('click', function() {
  if (
    isTotalEntered === true || 
    isErrorActive === true || 
    isDecimalActive === true
  ) return;

  if (this.innerText === '.' && isErrorActive === false) {
    decButtonPress(this.innerText)
  } else {
    error();
  }
});

backspace.addEventListener('click', function() {
  if (isTotalEntered === true || isErrorActive === true) return;

  if (this.innerText === '←' && isErrorActive === false) {
    backspaceButtonPress();
  } else {
    error();
  }
});

enter.addEventListener('click', function() {
  if (isTotalEntered === true || isErrorActive === true) return;

  if (this.innerText === '=' && isErrorActive === false) {
    doMath(firstNum, secondNum);
    isTotalEntered = true;
  } else {
    error();
  }
});

// Functions
function numButtonPress(button) {
  switch(true) {
    case isDivideActive:
    case isMultiplyActive:
    case isSubtractActive:
    case isAddActive:
      display.innerText = secondNum;
        switch(true) {
          case display.innerText.length < 20:
            manageDisplay(button);
            secondNum = display.innerText;
            break;
          default:
            break;
        }
      break;
    default:
      switch(true) {
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

function decButtonPress(button) {
  display.innerText = display.innerText + button;
  switch(true) {
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

  switch(true) {
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
  isTotalEntered = false;
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

  switch(true) {
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

function error() {
  isErrorActive = true;
  display.innerText = "ERROR";
  errorDisplay.innerText = 'Now why did you do that? Please refresh the page to continue.'
}
