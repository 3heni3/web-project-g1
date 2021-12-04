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
        alert("האימייל שהוכנס אינו תקין")
        return false;
    }
}

function validateRegister() {
    let email = document.forms["register-form"]["email"].value;
    if (!isValidEmail(email)) {
        alert("האימייל שהוכנס אינו תקין")
        return false;
    }
    let fname = document.forms["register-form"]["fname"].value;
    let lname = document.forms["register-form"]["lname"].value;
    if (!validateName(fname)) {
        alert("שם פרטי לא יכול להכיל מספרים, אלא אותיות בלבד")
        return false;
    }
    if (!validateName(lname)) {
        alert("שם משפחה לא יכול להכיל מספרים, אלא אותיות בלבד")
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
        alert("בבקשה תכתוב את תאריך פג התוקף בצורה של חח/שששש, לדוגמא 02/2023")
        return false;
    }
    let month = arr[0];
    let year = arr[1];
    if (!isNumber(month) || ! isNumber(year) || month.length != 2 || year.length != 4) {
        alert("החודש או השנה אינם מספר, בבבקשה הכנס 2 ספרות המייצגות את החודש ו-4 ספרות המייצגות את השנה, לדוגמא 02/2023")
        return false;
    }
    month = parseInt(month)
    year = parseInt(year)
    if (month < 0 || month > 12) {
        alert("מספר החודש איננו תקין וצריך להיות בין 1-12")
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
            alert("הכרטיס אשראי פג תוקף")
            return false;
        }
    }
    if (year < todayYear) {
        alert("הכרטיס אשראי פג תוקף")
        return false;
    }
    return true;
}

function isValidPayment() {
    if (!validateCreditCardNumber()) {
        alert("כרטיס האשראי שהוכנס איננו תקין. כרטיס אשראי צריך להיות מורכב מ-16 ספרות")
        return false;
    }
    if (!isValidID()) {
        alert("תעודת הזהות שהוכנסה אינה תקינה. תעודת זהות צריכה להיות מורכבת מ-9 ספרות")
        return false;
    }
    if (!isValidCVV()) {
        alert("שלוש הספרות בגב הכרטיס שהוכנסו אינן תקינות, אנא וודא/י כי הכנסת 3 ספרות")
        return false;
    }
    if (!isNotExpired()) {
        return false;
    }
    alert("התשלום התקבל ונקלט במערכת!")
    return true;
}
function validateName(name) {
    return !(/\d/.test(_string));
}