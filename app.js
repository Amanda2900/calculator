import { 
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
} from "./modules/functions.js";

// Elements
const numButtons = document.querySelectorAll('button.num');
const opButtons = document.querySelectorAll('button.operation');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const decimal = document.getElementById('decimal');
const enter = document.getElementById('enter');

//Variables
let isTotalEntered = false;

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
            isTotalEntered = false;
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
            errorMsg();
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
            errorMsg();
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
          isTotalEntered = false;
          break;
        default:
          errorMsg();
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
          errorMsg();
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
          errorMsg();
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
          errorMsg();
          break;
      }
      break;
  }
});