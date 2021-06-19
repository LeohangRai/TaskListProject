//Grabbing all the UI elements that are used as input fields
const amountEl = document.getElementById('amount');
const interstEl = document.getElementById('interest');
const yearsEl = document.getElementById('years');

//These results and loading div will be "display:none" in the html file
const resultsEl = document.querySelector('#results');
const loadingEl = document.querySelector('.loading');

//Grabbing all the UI elements that are used for displaying the resulst
const monthlyPayEl = document.getElementById('monthly-payment');
const totalPayEl = document.getElementById('total-payment');
const totalInterestEl = document.getElementById('total-interest');



//Adding eventlistener for the form submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //show the loading div
    loadingEl.style.display = 'block';
    //hiding the results div. the results div from previous submit may persist so we need to hide it
    resultsEl.style.display = 'none';
    //clear the loading div after 2 sec
    setTimeout(clearLoading, 2000)
    //calculate and show the results after 2 sec
    setTimeout(calculateResults,2000);

    e.preventDefault();
});


//Function for calculating results
function calculateResults(){
    //Grabbing the values from the input fields and parsing them into Floats
    const principal = parseFloat(amount.value);  //We need them in float that's why parseFloat
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Calculate monthly payment (Don't worry about the formulae)
    const x = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    // //Calculate the total payment
    const calculatedTotalPay = (monthly * calculatedPayments);
    // //Calculate the total interest
    const calculatedTotalInterest = ((monthly*calculatedPayments) - principal)

    
    //show the results in the display input fields
    //if the montlypayment result is finite, show the results in the display fields
    if(isFinite(monthly)){
        monthlyPayEl.value = monthly.toFixed(2); //toFixed converts the number into a decimal num, 2 means 2 decimal points
        totalPayEl.value = calculatedTotalPay.toFixed(2);
        totalInterestEl.value = calculatedTotalInterest.toFixed(2);

        //show the results div, it is initially display:none; in html file
        resultsEl.style.display = 'block';

    }
    else    {
        //Input error handling  
        //our own function to be called if the input field values are not legit
        showError();
    }
}


//Function to show error if the input field values are not legit
function showError(){

    //create a div element to show during error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode("Please check your numbers!"));

    //Grab the card div and the h1 elements so that we can append our error div in the parent 'card div' before 'h1'
    const cardDiv = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Append the errorDiv to the card div before h1
    cardDiv.insertBefore(errorDiv, heading);

    //Clearing the error div from the card after 3 seconds
    setTimeout(clearError, 3000); //the clearError function basically just clears the error div
}


//Function to clear the error div
function clearError(){
    //clear the errorDiv element from the DOM
    document.querySelector('.alert').remove();
}


//Function to clear the loading div
function clearLoading(){
    loadingEl.style.display = 'none';
}