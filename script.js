// Query Selectors, variables

const bill = document.querySelector(".bill");
const custom = document.querySelector(".custom");
const tipTotal = document.querySelector(".tip-total");
const total = document.querySelector(".total");
const people = document.querySelector(".people");
const reset = document.querySelector(".reset-btn");
const percent = document.querySelectorAll(".percent");
const percentArray = Array.from(percent);
let tipAmt = 0;

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

    if(!isNaN(bill.value) && !isNaN(people.value) && !isNaN(tipAmt) && bill.value > 0 && people.value > 1 && tipAmt >= 0){
        tipTotal.innerHTML = (totalTip/peopleAmt).toFixed(2);
        total.innerHTML = (totalBill/peopleAmt).toFixed(2);
    }
}

function removePressed(){
    percentArray.forEach(function(btn){
        btn.classList.remove("pressed");
    });
}

function resetAll(){
    bill.value = "";
    people.value = "";
    custom.value = "";
    tipTotal.innerHTML = "0.00";
    total.innerHTML = "0.00";
}

// Event Listeners

bill.addEventListener("blur", function(event) {
    this.value = this.value.replace(/[^0-9.]/g, "");
    let decimal = this.value.split(".")[1];
    if(!decimal){
        this.value = parseFloat(this.value).toFixed(2);
    }else if(decimal.length>2){
        this.value = parseFloat(this.value).toFixed(2);
    }

    console.log(this.value);
    updateTotal();
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
});

reset.addEventListener("click", function(event){
    resetAll();
    removePressed();
});
