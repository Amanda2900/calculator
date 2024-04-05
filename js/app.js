/* 
  - Handle button input
    - Number button
    - Functionality button
  -Function to update the display
  - Function to perform calcs / stack input

  - Button for light/dark mode
  - Make sure to set character limit/number limit for display string.
  - have a comma popup in appropriate places
*/ 

//Elements
const numButtons = document.querySelectorAll('button.num');
const opButtons = document.querySelectorAll('button.operation');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const decimal = document.getElementById('decimal');
const enter = document.getElementById('enter');
const display = document.getElementById('num-display');

// Variables
let firstNum = 0;
let secondNum = 0;
let total = 0;
let isDivideActive = false;
let isMultiplyActive = false;
let isSubtractActive = false;
let isAddActive = false;

// Event listeners for buttons
numButtons.forEach(function(button) {
  button.addEventListener('click', function() {

    if (
      isDivideActive === true || 
      isMultiplyActive === true || 
      isSubtractActive === true || 
      isAddActive === true
    ) {
      display.innerText = '0';
      manageDisplay(button);
      secondNum = display.innerText;
    } else {
      manageDisplay(button);
      firstNum = display.innerText;
    }
  });
});


opButtons.forEach(function(button) {
  button.addEventListener('click', function() {

    decimal.removeAttribute('disabled');

    if (button.innerText === '/') {
      isDivideActive = true;
    }

    if (button.innerText === 'x') {
      isMultiplyActive = true;
    }

    if (button.innerText === '-') {
      isSubtractActive = true;
    }

    if (button.innerText === '+') {
      isAddActive = true;
    }
  });
});


clear.addEventListener('click', function() {

  display.innerText = 0;
  total = 0;
  enter.removeAttribute('disabled');
  reset();
});


decimal.addEventListener('click', function() {
  this.setAttribute('disabled', '');

  display.innerText = display.innerText + this.innerText;
  if (
    isDivideActive === true || 
    isMultiplyActive === true || 
    isSubtractActive === true || 
    isAddActive === true
  ) secondNum = display.innerText;
  else firstNum = display.innerText;
});


backspace.addEventListener('click', function() {
  display.innerText = display.innerText.substring(0, display.innerText.length - 1);

  if (display.innerText.length === 0) display.innerText = '0';
  if (
    isDivideActive === true || 
    isMultiplyActive === true || 
    isSubtractActive === true || 
    isAddActive === true
  ) secondNum = display.innerText;
  else firstNum = display.innerText;
});


enter.addEventListener('click', function() {

  doMath(firstNum, secondNum);
  this.setAttribute('disabled', '');
  reset();
});

// functions
function manageDisplay(button) {
  if (display.innerText === '0') display.innerText = '';

  display.innerText = display.innerText + button.innerText;
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

function reset() {
  decimal.removeAttribute('disabled');
  isDivideActive = false;
  isMultiplyActive = false;
  isSubtractActive = false;
  isAddActive = false;
};
