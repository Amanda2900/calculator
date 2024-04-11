console.log('Hello World');
let operator = 'Add';

function doOperatorSwitch(operator) {
  switch (operator.toLowerCase()) {
    case 'divide':
    case '/':
      console.log('Divide');
      break;
    case 'add':
    case '+':
      console.log('Add');
      break;
    default:
      console.log('What is this?');
      break;
  }
}

doOperatorSwitch(operator);
doOperatorSwitch('Subtract');