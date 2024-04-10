/* 
  - Button for light/dark mode
  -Keyboard function for backspace and decimal
*/ 

//Elements
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
let total = 0;

let isDivideActive = false;
let isMultiplyActive = false;
let isSubtractActive = false;
let isAddActive = false;
let isDecimalActive = false;
let isErrorActive = false;
let isTotalEntered = false;

const buttonNumbers = new Set ([0,1,2,3,4,5,6,7,8,9]);
const buttonOperators = new Set(['+', '-', '/', 'x']);

// Event listeners

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


  document.addEventListener('keydown', function(keyPressed) {
    if (isErrorActive === true) return;

    console.log(keyPressed.key)

    if (buttonNumbers.has(parseInt(keyPressed.key)) && isErrorActive === false && isTotalEntered === false) numButtonPress(keyPressed.key);

    if (buttonOperators.has(keyPressed.key) && isErrorActive === false && isTotalEntered === false) opButtonPress(keyPressed.key);

    if (keyPressed.key === 'Enter' && isErrorActive === false &&isTotalEntered === false) {
      doMath(firstNum, secondNum);
      isTotalEntered = true;
    } 

    if (keyPressed.key === 'c' && isErrorActive === false) {
      reset();
    }
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

    display.innerText = display.innerText + this.innerText;
    if (
      isDivideActive === true || 
      isMultiplyActive === true || 
      isSubtractActive === true || 
      isAddActive === true
    ) {
      secondNum = display.innerText;
    } else firstNum = display.innerText;

    isDecimalActive = true;

  } else {
    error();
  }
});


backspace.addEventListener('click', function() {

  if (isTotalEntered === true || isErrorActive === true) return;

  if (this.innerText === '←' && isErrorActive === false) {
    display.innerText = display.innerText.substring(0, display.innerText.length - 1);

    if (display.innerText.length === 0) display.innerText = '0';
    if (
      isDivideActive === true || 
      isMultiplyActive === true || 
      isSubtractActive === true || 
      isAddActive === true
    ) secondNum = display.innerText;
    else firstNum = display.innerText;
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

// functions
function numButtonPress(button) {
  if (
    isDivideActive === true || 
    isMultiplyActive === true || 
    isSubtractActive === true || 
    isAddActive === true
  ) {
    display.innerText = secondNum;
    if (display.innerText.length < 20) {
      manageDisplay(button);
      secondNum = display.innerText;
    } else return;
  } else {
    if (display.innerText.length < 20) {
      manageDisplay(button);
      firstNum = display.innerText;
    } else return;
  }
};

function opButtonPress(button) {
  if (button === '/') isDivideActive = true;

  if (button === 'x') isMultiplyActive = true;

  if (button === '-') isSubtractActive = true;

  if (button === '+') isAddActive = true;

  isDecimalActive = false;
};

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

function doMath(firstNum, secondNum) {
  let first = parseFloat(firstNum);
  let second = parseFloat(secondNum);

  if (isDivideActive === true) total = first / second;
  if (isMultiplyActive === true) total = first * second;
  if (isSubtractActive === true) total = first - second;
  if (isAddActive === true) total = first + second;

  display.innerText = total;
};


function error() {
  isErrorActive = true;
  display.innerText = "ERROR";
  errorDisplay.innerText = 'Now why did you do that? Please refresh the page to continue.'
}
