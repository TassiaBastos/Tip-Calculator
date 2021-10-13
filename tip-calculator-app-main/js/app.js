const bill = document.getElementById("inp-bill");
const tipBtns = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const errorMsg = document.querySelector(".error-msg");
const results = document.querySelectorAll(".val");
const resetBtn = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", setTipCustomValue);
people.addEventListener("keyup", setPeopleValue);
resetBtn.addEventListener("click", reset);

let billValue = 0.0; //default value
let tipValue = 0.15; //default value -> 15% button is active
let peopleValue = 1;

function validateInputs(inputType, inp) {
  let regx;
  inputType === "float" ? (regx = /^[0-9]*\.?[0-9]*$/) : (regx = /^[0-9]*$/);

  return inp.value.match(regx);
}

function setBillValue() {
  if (!validateInputs("float", bill)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  billValue = parseFloat(bill.value) || 0.0;
  calculateTip();
}

function handleClick(event) {
  tipBtns.forEach((btn) => {
    //clear active state
    btn.classList.remove("btn-active");

    //set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  //clear custom tip
  tipCustom.value = "";

  calculateTip();
  // console.log(tipValue);
}

function setTipCustomValue() {
  if (!validateInputs("int", tipCustom)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }
  //remove active state from buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  tipValue = parseInt(tipCustom.value / 100);

  if (tipCustom !== "") {
    calculateTip();
  }

  // console.log(tipValue);
}

function setPeopleValue(e) {
  let value = e.target.value;

  if (!validateInputs("int", people)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = value;

  if (peopleValue <= 0) {
    errorMsg.classList.add("show-error-msg");
    people.classList.add("show-error-msg");
  } else {
    errorMsg.classList.remove("show-error-msg");
    people.classList.remove("show-error-msg");
  }

  calculateTip();
  // console.log(peopleValue);
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  bill.value = "0.0";
  setBillValue();

  tipBtns[2].click();

  people.value = "1";
  setPeopleValue();
}
