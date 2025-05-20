const display = document.getElementById("display");

function appendToDisplay(input) {
  const operators = ["+", "-", "*", "/"];
  const lastChar = display.value.slice(-1);
  
  if (operators.includes(input) && operators.includes(lastChar)) {
    return; // Prevent consecutive operators
  }
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
    setTimeout(() => {
      clearDisplay();
    }, 2000);
  } 
} 