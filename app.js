// Function: calculate tip
function calcTip() {
    const bill = document.getElementById('bill').value;
    const service = document.getElementById('service').value;
    const split = document.getElementById('split').value;

    // Input Validation
    if(bill === '' || service === 0) {
        displayAlert('Please fill in all fields', 'danger');
    }

// Check to see if input is empty or <= 1
if(split === '' || split <= 1){
    split = 1;
    document.getElementById("each").style.display = "none";
}
 else {
     document.getElementById("each").style.display = "block";
 }

 // Calculate Tip
let total = (bill * service) / split;

// round 2 decimal places
total = Math.round(total * 100)/100;

total = total.toFixed(2);

// Display tip to UI
document.getElementById("totalTip").style.display = "block";
document.getElementById("tip").innerHTML = total;


}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
  calcTip();
};


// Alert user/require all fields filled 
function displayAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form-group');
    container.insertBefore(div,form);

    //vanish in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};
