/* 
  - Handle button input
    - Number button
    - Functionality button
  -Function to update the display
  - Function to perform calcs / stack input

  - Button for light/dark mode
*/ 

//Buttons
const numButtons = document.querySelectorAll('button.num');
const opButtons = document.querySelectorAll('button.operation');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const decimal = document.getElementById('decimal');
const enter = document.getElementById('enter');

//Other elements
const display = document.getElementById('num-display');


numButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (display.innerText === '0') display.innerText = '';

    display.innerText = display.innerText + button.innerText;
  });
});


opButtons.forEach(function(button) {
  button.addEventListener('click', function() {

    decimal.removeAttribute('disabled');

    if (button.innerText === '/') {
      console.log('divide');
    }

    if (button.innerText === 'x') {
      console.log('multiply');
    }

    if (button.innerText === '-') {
      console.log('subtract');
    }

    if (button.innerText === '+') {
      console.log('add');
    }

  });
});


clear.addEventListener('click', function() {
  display.innerText = 0;
  decimal.removeAttribute('disabled');
});


decimal.addEventListener('click', function() {
  display.innerText = display.innerText + this.innerText;
  this.setAttribute('disabled', '');
});


backspace.addEventListener('click', function() {
  display.innerText = display.innerText.substring(0, display.innerText.length - 1);

  if (display.innerText.length === 0) display.innerText = '0';
});


enter.addEventListener('click', function() {
  console.log('equals');
})