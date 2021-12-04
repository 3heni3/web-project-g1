let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
let numberPattern = /^\d+$/
function isValidEmail (email) {
    return emailPattern.test(email);
}
function isNumber(num) {
    return numberPattern.test(num);
}
function validateLogIn() {
    let email = document.forms["login-form"]["email"].value;
    if (!isValidEmail(email)) {
        alert("Email entered is not valid!")
        return false;
    }
}

function validateRegister() {
    let email = document.forms["register-form"]["email"].value;
    if (!isValidEmail(email)) {
        alert("Email entered is not valid!")
        return false;
    }
    let fname = document.forms["register-form"]["fname"].value;
    let lname = document.forms["register-form"]["lname"].value;
    if (!validateName(fname)) {
        alert("First name should not contain numbers, but alphabet characters only.")
        return false;
    }
    if (!validateName(lname)) {
        alert("Last name should not contain numbers, but alphabet characters only.")
        return false;
    }

}

function validateCreditCardNumber() {
    let num = document.forms["payment-form"]["credit-card-number"].value;
    return num.length == 16 && isNumber(num);
}

function isValidID() {
    let id_ = document.forms["payment-form"]["id"].value;
    console.log(id_.length)
    console.log(`${isNumber(id_)}`)
    return id_.length == 9 && isNumber(id_);
}

function isValidCVV() {
    let cvv = document.forms["payment-form"]["cvv"].value;
    return cvv.length == 3 && isNumber(cvv);
}

function isNotExpired() {
    let expire_date = document.forms["payment-form"]["expiration"].value;
    let arr = expire_date.split('/')
    if (!arr.length == 2) {
        alert("Please write the expiration in the following form: mm/yyyy, e.g 02/2023")
        return false;
    }
    let month = arr[0];
    let year = arr[1];
    if (!isNumber(month) || ! isNumber(year) || month.length != 2 || year.length != 4) {
        alert("Month or year are not a number. Please enter 2 digits representing the month, and 4 digits representing a year, e.g 02/2023")
        return false;
    }
    month = parseInt(month)
    year = parseInt(year)
    if (month < 0 || month > 12) {
        alert("Month enterd is invalid. Month should be between 1-12")
        return false;
    }
    var today = new Date().toISOString().split('T'[0])[0].split('-')
    var todayYear = today[0]
    var todayMonth = today[1]
    if (year > todayYear) {
        return true;
    }
    if (year == todayYear) {
        if (month < todayMonth) {
            alert("Credit card expiration date is already expired")
            return false;
        }
    }
    if (year < todayYear) {
        alert("Credit card expiration date is already expired")
        return false;
    }
    return true;
}

function isValidPayment() {
    if (!validateCreditCardNumber()) {
        alert("Credit card is invalid. It should consist of 16 digits")
        return false;
    }
    if (!isValidID()) {
        alert("ID is invalid. It should consist of 9 digits")
        return false;
    }
    if (!isValidCVV()) {
        alert("CVV is invalid. It should consist of 3 digits")
        return false;
    }
    if (!isNotExpired()) {
        return false;
    }
    alert("Payment received!")
    return true;
}
function validateName(name) {
    return !(/\d/.test(_string));
}