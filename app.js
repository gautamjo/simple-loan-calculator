// listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e) {
    // hide results
    document.querySelector("#results").style.display = "none";
    // show loader
    document.querySelector("#loading").style.display = "block";
    // delay results
    setTimeout(calculateResults, 1000);

    // since its a form submit prevent the default behaviour
    e.preventDefault();

});

// calculateResults function
function calculateResults() {
    // ui variables
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // show results
        document.querySelector("#results").style.display = "block";
        // hide loader
        document.querySelector("#loading").style.display = "none";


    } else {
        showError("Please Check Your Input");
    }
}

// show error
function showError(error) {
    // hide loader
    document.querySelector("#loading").style.display = "none";
    // hide results
    document.querySelector("#results").style.display = "none";
    // create a div
    const errDiv = document.createElement("div");

    // get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // add class
    errDiv.className = "alert alert-danger";

    // create text node and append to div
    errDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errDiv, heading);

    // clear error after 2 seconds
    setTimeout(clearError, 2000);
}

// clear error function
function clearError() {
    document.querySelector(".alert").remove();
}