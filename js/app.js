/* 
  - Button for light/dark mode
  - Keyboard presses register visually on buttons
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
  switch (true) {
    case isErrorActive:
      break;
    case !isTotalEntered:
      switch (true) {
        case buttonNumbers.has(parseInt(keyPressed.key)):
          numButtonPress(keyPressed.key);
          break;
        case buttonOperators.has(keyPressed.key):
          opButtonPress(keyPressed.key);
          break;
        case keyPressed.key === 'Enter':
        case keyPressed.key === '=':
          doMath(firstNum, secondNum);
          isTotalEntered = true;
          break;
        case keyPressed.key === 'Backspace':
          backspaceButtonPress();
          break;
        case !isDecimalActive:
          switch (keyPressed.key) {
            case '.':
            decButtonPress();
            break;
          }
      }
      default:
        switch (keyPressed.key) {
          case 'C':
          case 'c':
            reset();
            break;
        }
  }
});

numButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    switch (true) {
      case isTotalEntered:
      case isErrorActive:
        break;
      default:
        switch (true) {
          case buttonNumbers.has(parseInt(button.id)):
            numButtonPress(button.id);
            break;
          default:
            error();
            break;
        }
        break;
    }
  });
});

opButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    switch (true) {
      case isTotalEntered:
      case isErrorActive:
        break;
      default:
        switch (true) {
          case buttonOperators.has(button.id):
            opButtonPress(button.id);
            break;
          default:
            error();
            break;
        }
        break;
    }
  });
});

clear.addEventListener('click', function() {
  switch (true) {
    case isErrorActive:
      break;
    default:
      switch (this.id) {
        case 'clear':
          reset();
          break;
        default:
          error();
          break;
      }
      break;
  }
});

decimal.addEventListener('click', function() {
  switch (true) {
    case isTotalEntered:
    case isErrorActive:
    case isDecimalActive:
      break;
    default:
      switch (this.id) {
        case 'decimal':
          decButtonPress();
          break;
        default:
          error();
          break;
      }
      break;
  }
});

backspace.addEventListener('click', function() {
  switch (true) {
    case isTotalEntered:
    case isErrorActive:
      break;
    default:
      switch (this.id) {
        case 'backspace':
          backspaceButtonPress();
          break;
        default:
          error();
          break;
      }
      break;
  }
});

enter.addEventListener('click', function() {
  switch (true) {
    case isTotalEntered:
    case isErrorActive:
      break;
    default:
      switch (this.id) {
        case 'enter':
          doMath(firstNum, secondNum);
          isTotalEntered = true;
          break;
        default:
          error();
          break;
      }
      break;
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

function decButtonPress() {
  display.innerText = display.innerText + '.';
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