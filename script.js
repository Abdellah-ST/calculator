const calculatorDisplay =document.querySelector('h1');
const inputBtns =document.querySelectorAll('button');
const clearBtn= document.getElementById('clear-btn');

let firstValue=0;
let operatorValue='';
let awaitingNextValue=false;
function sendNumValue(number) {
  // replace current display if first walue is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent=number;
    awaitingNextValue=false;
  }else {
    // display if the content is 0 else add number
    const displayValue=calculatorDisplay.textContent;
    calculatorDisplay.textContent=displayValue==='0'? number :displayValue+number;
  }
}

// add addDecimal
function addDecimal() {
  //  if op presed dont add  decimal
  if(awaitingNextValue) return;
  // if no decimal add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
  }
}

// calculate first and second values
const calculate={
  '/':(firstNumber,secondNumber)=> firstNumber/secondNumber,
  '*':(firstNumber,secondNumber)=> firstNumber*secondNumber,
  '+':(firstNumber,secondNumber)=> firstNumber+secondNumber,
  '-':(firstNumber,secondNumber)=> firstNumber-secondNumber,
  '=':(firstNumber,secondNumber)=> secondNumber,
};

function addOperator(operator) {
  const currentValue=Number(calculatorDisplay.textContent);
  // prevent multiple operator
  if(operatorValue&&awaitingNextValue){
    calculatorDisplay.textContent+=operator;
    operatorValue=operator;
    return ;
  }
  // asssing firstValue if htere is none
  if (!firstValue) {
    firstValue=currentValue;
  }else {
    const calculation=calculate[operatorValue](firstValue,currentValue);
    calculatorDisplay.textContent+=calculation;
    firstValue=calculation;
  }
  // ready for next value
  awaitingNextValue=true;
  operatorValue=operator;

}

// add eventlisteners for numbers
inputBtns.forEach((inputBtn) => {
  if(inputBtn.classList.length===0){
    inputBtn.addEventListener('click',() => sendNumValue(inputBtn.value));
  }else if(inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click',() => addOperator(inputBtn.value));
  }else if(inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click',() => addDecimal());
  }
});

// reset display
function resetAll() {
   firstValue=0;
   operatorValue='';
   awaitingNextValue=false;
  calculatorDisplay.textContent='0';
}
// eventlisteners
clearBtn.addEventListener('click',resetAll);
