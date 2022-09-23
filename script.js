const inputBillAmt= document.querySelector(".input-bill-amount");
const inputPeople = document.querySelector(".input-people");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tipCustom = document.querySelector(".tip-custom");
const btnReset = document.querySelector(".reset");
const error = document.querySelector(".error");

// Default values
inputBillAmt.value = "0.0";
inputPeople.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billVal = 0.0;
let peopleVal = 1;
let tipVal = 0.15;

// event listner for bill amount input
inputBillAmt.addEventListener("input", funcBillInput);

// event listener for number of people input
inputPeople.addEventListener("input", funcPeopleInput);

// tip handler
tips.forEach(function(val) {
    val.addEventListener("click", handleClick);
});

// event listener for custom tip
tipCustom.addEventListener("input", () => {
    tipVal = parseFloat(tipCustom.value / 100);
    tips.forEach(function(val) {
        val.classList.remove("active-tip");
    });
    calculateTip();
});

// event listener for reset button
btnReset.addEventListener("click", () => {
    inputBillAmt.value = "0.0";
    funcBillInput();
    inputPeople.value = "1";
    funcPeopleInput();
    tipCustom.value = "";
});

// click handler
function handleClick(e) {
    tips.forEach(function(val) {
        val.classList.remove("active-tip");
        if (e.target.innerHTML == val.innerHTML) {
            val.classList.add("active-tip");
            tipVal = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

// bill input function
function funcBillInput() {
    billVal = parseFloat(inputBillAmt.value);
    calculateTip();
}

// people input function
function funcPeopleInput() {
    peopleVal = parseFloat(inputPeople.value);

    if (peopleVal < 1) {
        error.style.display = "flex";
        inputPeople.style.border = "thick solid red";
    } else {
        error.style.display = "none";
        inputPeople.style.border = "none";
        calculateTip();
    }
}

// function to calculate tip
function calculateTip() {
    if (peopleVal >= 1) {
        let tipAmt = (billVal * tipVal) / peopleVal;
        let totalAmt = (billVal + tipAmt) / peopleVal;
        tipPerPerson.innerHTML = "$" + tipAmt.toFixed(2);
        totalPerPerson.innerHTML = "$" + totalAmt.toFixed(2);
    }
}
