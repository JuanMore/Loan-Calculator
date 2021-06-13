// Function to calc loan
function calculateResult(){

    // Initialize variables from user input
    const loanAmount = document.querySelector('#loan').value;
    const aprRate = document.querySelector('#apr').value;
    const termLength = document.querySelector('#term').value;
    const monthlyPayment = document.getElementById("monthly-payment")
    const totalPayment = document.getElementById("total-payment")
    const totalInterest = document.getElementById("total-interest")

    // Calculate Loan
    // Initialize variables
    let principal = parseFloat(loanAmount);
    let interest = parseFloat(aprRate) / 100 / 12;
    let payments = parseFloat(termLength) * 12;

    // Compute payment calculation
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest)/(x-1);

    if(isFinite(monthly)) {
        // Round to 2 decimals
        monthlyPayment.value = monthly.toFixed(2);
        // the total loan amount
        totalPayment.value = (monthly * payments).toFixed(2);
          // Get total interest payment
        totalInterest.value = ((monthly * payments) - principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please fill required fields')
    }

    // Display results to UI
    // document.getElementById("monthly").style.display.innerHTML = total;
    monthlyPayment.innerHTML = `$${monthlyPayment.value}`;
    totalPayment.innerHTML = `$${totalPayment.value}`;
    totalInterest.innerHTML = `$${totalInterest.value}`;

    // Save user input
    save(loanAmount, aprRate, termLength);
  
}

// Call function to compute results 
document.getElementById('calculate').onclick = function(e) {
    // Show loader
    document.getElementById('loading').style.display = 'block';
    // hide results
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResult, 2000);

    e.preventDefault();
}

function showError(error) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');

    // Get element
    const card = document.querySelector('.card');
    const cardBody = document.querySelector('.card-body');
    // Add class
    errorDiv.className = 'alert alert-danger';
    // create a text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, cardBody);

    // Clear error msg after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}

// function save to local storage
function save(loanAmount, aprRate, termLength){
    if(window.localStorage){
        localStorage.loan = loanAmount;
        localStorage.apr = aprRate;
        localStorage.years = termLength;
    }
};


// Auto attempt to restore input fields from last session; when document first loads 
window.onload = function() {
    if(window.localStorage && localStorage.loan){
         document.querySelector('#loan').value = localStorage.loan;
         document.querySelector('#apr').value = localStorage.apr;
         document.querySelector('#term').value = localStorage.years;
    }

};