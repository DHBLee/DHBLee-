
const errorMessage = document.querySelectorAll('.error-message')

document.addEventListener('DOMContentLoaded', () => {
   
    const amountInput = document.getElementById('amount');

    // Event listener for when the input loses focus
    amountInput.addEventListener('blur', () => {
        const value = amountInput.value.replace(/,/g, ''); // Remove existing commas
        if (!isNaN(value) && value.trim() !== '') { // Check if the value is a number
            // Format the number with commas and update the input value
            amountInput.value = parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
    });


    const clear = document.querySelector('#clear');

    // Event listener for clear function
    clear.addEventListener('click', () => {
        location.reload();
    })
    
    const calculateBtn = document.querySelector('.form_calculate');

    calculateBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const amountValue = document.getElementById('amount');
        const termValue = document.getElementById('term');
        const rateValue = document.getElementById('rate');

        const amount = amountValue.value;
        const term = termValue.value;
        const rate = rateValue.value;

        const mortgageType = document.querySelector('input[name="same"]:checked');
        const mortgageTypeValue = mortgageType ? mortgageType.value : null;

        if (!amount || !term || !rate || !mortgageTypeValue) {
            errorInput(amountValue, termValue, rateValue, mortgageTypeValue);
        } else {
            errorMessage.forEach(message => {
                message.style.display = 'none';
            })

            calculateMortgage(amount, term, rate, mortgageTypeValue);
        }
    });
});

const divs = document.querySelectorAll('.value2 div');

divs.forEach(div => {
  div.addEventListener('click', function() {
    divs.forEach(d => d.classList.remove('clicked'));

    this.classList.add('clicked');
  });

  
});

function calculateMortgage(amount, term, rate, mortgageTypeValue) {

    const p = parseNumber(amount);
    const annualR = parseFloat(rate) / 100;
    const monthlyR = annualR / 12;
    const n = parseInt(term) * 12;

    console.log(p);
    console.log(annualR);
    console.log(monthlyR);
    console.log(n);

    let monthlyPayment;
    let totalPayment;
    if (monthlyR === 0) {
        monthlyPayment = p / n;
    } else {
        monthlyPayment = p * ((monthlyR * Math.pow(1 + monthlyR, n)) / (Math.pow(1 + monthlyR, n) - 1)); 
    }
    totalPayment = (monthlyPayment * 12) * parseInt(term);

    console.log(`Monthly Payment: ${monthlyPayment.toFixed(2)}`);
    console.log(`Total Payment: ${totalPayment.toFixed(2)}`);

    updateHTML(monthlyPayment, totalPayment);
    console.log(`Amount: ${amount}, Term: ${term}, Rate: ${rate}, MortgageType: ${mortgageTypeValue}`);
}

function errorInput(amountValue, termValue, rateValue, mortgageTypeValue) {

    // Reset the inputs
    amountValue.value = '';
    termValue.value = '';
    rateValue.value = '';
    
    // Reset the radio buttons
    const mortgageTypes = document.querySelectorAll('input[name="same"]');
    mortgageTypes.forEach(type => {
        type.checked = false; // Uncheck all radio buttons

    });

    // Show the error message
    errorMessage.forEach(message => {
        message.style.display = 'block';
    })



    const year = document.querySelector('.form_years_right');
    const percent = document.querySelector('.form_percent_right');
    const unit = document.querySelector('.form_unit');

    const divs = document.querySelectorAll('.value2 div.clicked');
    const inputs = document.querySelectorAll('.value input');

    divs.forEach(div => {
        div.classList.remove('clicked');
    });

    inputs.forEach(input => {
        console.log('error');
        input.style.borderColor = 'red';
    });

    year.style.backgroundColor = 'red';
    year.style.color = 'white';

    percent.style.backgroundColor = 'red';
    percent.style.color = 'white';

    unit.style.backgroundColor = 'red';
    unit.style.color = 'white';


}

function updateHTML(monthlypayment, totalpayment) {
    const monthly = document.querySelector('.value_monthly');
    const total = document.querySelector('.value_total');

    document.querySelector('.result_none').style.display = 'none';
    document.querySelector('.result_shown').style.display = 'flex';

    monthly.innerHTML = `£${monthlypayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    total.innerHTML = `£${totalpayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function parseNumber(input) {
    const cleanvalue = input.replace(/,/g, '');
    return parseFloat(cleanvalue);
}