// Query Selectors, variables

const bill = document.querySelector(".bill");
const custom = document.querySelector(".custom");
const tipTotal = document.querySelector(".tip-total");
const total = document.querySelector(".total");
const people = document.querySelector(".people");
const reset = document.querySelector(".reset-btn");
const percent = document.querySelectorAll(".percent");
const cbzText = document.querySelector(".cant-be-zero");
const pplBorder = document.querySelector(".people-border");
const inputs = document.querySelectorAll(".num-input");
const inputBox = document.querySelectorAll(".selected");

const inputArray = Array.from(inputs);
const inputBoxArray = Array.from(inputBox);
const percentArray = Array.from(percent);
let tipAmt = 0;


//Enable/Disable Reset Button
reset.disabled = true;
setInterval(enableResetButton, 100);

// Functions
function hundredMax(e){
    e.value = e.value.replace(/[^0-9]/g, "");
    if(parseFloat(e.value)>100){
        e.value = 100;
    }
}

function updateTotal(){
    let billAmt = parseFloat(bill.value);
    let peopleAmt = parseFloat(people.value);
    let totalTip = ((billAmt * tipAmt) / 100);
    let totalBill = (billAmt + totalTip);

    if(!isNaN(bill.value) && !isNaN(people.value) && !isNaN(tipAmt) && bill.value > 0 && people.value > 0 && tipAmt >= 0){
        tipTotal.innerHTML = (totalTip/peopleAmt).toFixed(2);
        total.innerHTML = (totalBill/peopleAmt).toFixed(2);
    }
}

function removePressed(){
    percentArray.forEach(function(btn){
        btn.classList.remove("pressed");
    });
}

function enableResetButton(){
    if (bill.value.length> 0 && people.value.length> 0 && parseFloat(people.value) !== 0){
        reset.disabled = false;
    } else {
        reset.disabled = true;
    }
}

function resetAll(){
    bill.value = "";
    people.value = "";
    custom.value = "";
    tipTotal.innerHTML = "0.00";
    total.innerHTML = "0.00";
}

// Event Listeners

bill.addEventListener("input", function(event){
    this.value = this.value.replace(/[^0-9.]/g, "");
});

bill.addEventListener("blur", function(event) {
    
    let decimal = this.value.split(".")[1];
    
    if(this.value.trim() === ""){this.value = "";}
    else if (!decimal){this.value = parseFloat(this.value).toFixed(2);}
    else if(decimal.length>2){ this.value = parseFloat(this.value).toFixed(2);}

    console.log(this.value);
    updateTotal();
});

inputArray.forEach(function(e, index){
    e.addEventListener("click", function(){
        inputBoxArray.forEach(function(inpt){
            inpt.classList.remove("input-selected");
        });
        inputBoxArray[index].classList.toggle("input-selected");
    });
});

percentArray.forEach(function(e, index){
    e.addEventListener("click", function(){
        switch (index){
            case 0:
                tipAmt = 5;
                break;
            case 1:
                tipAmt = 10;
                break;
            case 2:
                tipAmt = 15;
                break;
            case 3:
                tipAmt = 25;
                break;
            case 4:
                tipAmt = 50;
                break;
            default:
                tipAmt = custom.value;
        }

        removePressed();
        this.classList.toggle("pressed");

        custom.value="";
        console.log(tipAmt);
        updateTotal();
    });
});

custom.addEventListener("click", removePressed);
custom.addEventListener("input", function(event) {
    tipAmt = custom.value;
    hundredMax(this);
    updateTotal();
});

people.addEventListener("input", function(event) {
    hundredMax(this);
    updateTotal();
    if(parseFloat(this.value) === 0){   
        pplBorder.classList.add("border-cbz");
        cbzText.classList.add("show-cbz");
    } else{
        pplBorder.classList.remove("border-cbz");
        cbzText.classList.remove("show-cbz");
    }

});

reset.addEventListener("click", function(event){
    resetAll();
    removePressed();
});
