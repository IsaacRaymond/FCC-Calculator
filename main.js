var display = 0;
var subDisplay = "";

$("button").click(function() {
  var input = $(this).attr("id");

  //if it's not a number, send to correct process
  if (isNaN(input)) {
    window[input](); //call the function based on the button
    updateViewers();
  } else {
    //if it is a number,
    if (display.length > 10) {
      displayLengthError();
      updateViewers();
    } else {
      appendDigit(input);
      updateViewers();
    }
  }
}); //end button.click function

function appendDigit(input) {
  if (display == "0") {
    display = input;
    subDisplay += "" + input;
  } else if (isNaN(display)) {
    display = "" + input;
    subDisplay += "" + input;
  } else {
    display = "" + display + input;
    subDisplay += "" + input;
  }
}

function AC() {
  reset();
}

function CE() {
  if (subDisplay.search(/[^0-9.]/) == -1) {
    reset();
  } else {
    var temp = subDisplay
      .split("")
      .reverse()
      .join("");
    var index = temp.search(/[^0-9.]/);
    temp = temp.substring(index + 1);
    temp = temp
      .split("")
      .reverse()
      .join("");
    subDisplay = temp;
    display = 0;
  }
}

function divide() {
  display = "÷";

  if (isThisASecondOperation()) {
    subDisplay = subDisplay.slice(0, subDisplay.length - 1) + "÷";
  } else {
    subDisplay += "÷";
  }
}

function multiply() {
  display = "X";

  if (isThisASecondOperation()) {
    subDisplay = subDisplay.slice(0, subDisplay.length - 1) + "X";
  } else {
    subDisplay += "X";
  }
}

function subtract() {
  display = "-";
  if (isThisASecondOperation()) {
    subDisplay = subDisplay.slice(0, subDisplay.length - 1) + "-";
  } else {
    subDisplay += "-";
  }
}

function add() {
  display = "+";

  if (isThisASecondOperation()) {
    subDisplay = subDisplay.slice(0, subDisplay.length - 1) + "+";
  } else {
    subDisplay += "+";
  }
}

function equals() {
  var index = subDisplay.search(/[^0-9.]/);
  var sign = subDisplay[index];
  var runningTotal = parseFloat(subDisplay.slice(0, index));
  subDisplay = subDisplay.slice(index + 1);

  while (subDisplay.length != 0) {
    index = subDisplay.search(/[^0-9.]/);
    if (index == -1) {
      runningTotal = performOperation(
        runningTotal,
        parseFloat(subDisplay),
        sign
      );
      subDisplay = "";
    } else {
      var nextNumber = parseFloat(subDisplay.slice(0, index));
      runningTotal = performOperation(runningTotal, nextNumber, sign);
      sign = subDisplay[index];
      subDisplay = subDisplay.slice(index + 1);
    }
  }

  display = runningTotal;
  updateViewers();
}

function decimal() {
  if (display.search(/\./) == -1) {
    display = "" + display + ".";
    subDisplay += ".";
  }
}

function updateViewers() {
  $("#box-sub-text").text(subDisplay);
  $("#calc-box-text").text(display);
}

function reset() {
  display = 0;
  subDisplay = "";
}

function performOperation(runningTotal, nextNumber, operation) {
  if (operation == "÷") {
    return runningTotal / nextNumber;
  } else if (operation == "X") {
    return runningTotal * nextNumber;
  } else if (operation == "+") {
    return runningTotal + nextNumber;
  } else if (operation == "-") {
    return runningTotal - nextNumber;
  }
}

function isThisASecondOperation() {
  if (isNaN(subDisplay[subDisplay.length - 1])) {
    return true;
  }
  return false;
}
