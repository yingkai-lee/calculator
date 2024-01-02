function add(numA, numB) {
	return numA + numB;
}
function sub(numA, numB){
	return numA - numB;
}
function mul(numA, numB){
	return numA * numB;
}
function div(numA, numB){
	if (numB == 0){
		alert("Divide by zero!");
		clearButton.click();
		return;
	}
	return numA / numB;
}

const opMap = {
	"+": add,
	"-": sub,
	"*": mul,
	"/": div,
}

function operate(numA, numB, op){
	return opMap[op](1.0*numA, 1.0*numB);
}

let firstNum = undefined;
let operator = "";
let secondNum = undefined;

let clearState = false;

let displaySection = document.querySelector("div").querySelector("div");

const clearButton = document.querySelector(".clear");

let numberSection = document.querySelector(".numbers");
let numberButtons = numberSection.querySelectorAll("button");
for (const button of numberButtons){
	button.addEventListener("click", function(){ 
		if (clearState){ // new number
			displaySection.textContent = button.textContent;
			clearState = false;
		}
		else{ // concat to old number
			displaySection.textContent += button.textContent
		}
	});
}

let operatorSection = document.querySelector(".operators");
let opButtons = operatorSection.querySelectorAll("button");
for (const button of opButtons){
	button.addEventListener("click", function(){
		if (firstNum){
			secondNum = Number(displaySection.textContent);
			let result = operate(firstNum, secondNum, operator)
			firstNum = result;
			secondNum = undefined;
			displaySection.textContent = result;
		}
		else {
			firstNum = Number(displaySection.textContent);
		}
		operator = button.textContent;
		clearState = true;
	});
}

document.querySelector(".equals").addEventListener("click", function(){
	if (!firstNum || !operator || displaySection.textContent == ""){
		alert("Invalid operation!");
		clearButton.click();
		return;
	}
	secondNum = Number(displaySection.textContent);
	let result = operate(firstNum, secondNum, operator)
	firstNum = undefined;
	secondNum = undefined;
	displaySection.textContent = result;
	clearState = true;
	operator = "";
});

clearButton.addEventListener("click", function(){
	firstNum = undefined;
	operator = "";
	secondNum = undefined;
	displaySection.textContent = "";
});