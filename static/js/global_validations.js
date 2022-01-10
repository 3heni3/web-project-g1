let numberPattern = /^\d+$/
let visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
let mastercardRegEx = /^5[1-5][0-9]{14}$/;
let amexpRegEx = /^3[47][0-9]{13}$/;
let discovRegEx = /^6(?:011|5[0-9][0-9])[0-9]{12}$/;

function isNumber(num) {
    return numberPattern.test(num);
}

function isCellularPhone(num) {
    return isNumber(num) && num.length === 10 && num.startsWith("05")
}

function isHomePhone(num) {
    return isNumber(num) && num.length === 7 && num.startsWith("0")
}

function isValidPhone(num) {
    return isCellularPhone(num) || isHomePhone(num)
}


function isNotExpired(expire_date) {
    let arr = expire_date.split('/')
    if (!(arr.length === 2)) {
        return "בבקשה תכתוב את תאריך פג התוקף בצורה של חח/שששש, לדוגמא 02/2023"
    }
    let month = arr[0];
    let year = arr[1];
    if (!isNumber(month) || !isNumber(year) || month.length !== 2 || year.length !== 4) {
        return "החודש או השנה אינם מספר, בבבקשה הכנס 2 ספרות המייצגות את החודש ו-4 ספרות המייצגות את השנה, לדוגמא 02/2023"
    }
    month = parseInt(month)
    year = parseInt(year)
    if (month < 0 || month > 12) {
        return "מספר החודש איננו תקין וצריך להיות בין 1-12"
    }
    let today = new Date().toISOString().split('T'[0])[0].split('-')
    let todayYear = today[0]
    let todayMonth = today[1]
    if (year > todayYear) {
        return "";
    }
    if (year === todayYear) {
        if (month < todayMonth) {
            return "הכרטיס אשראי פג תוקף"
        }
    }
    if (year < todayYear) {
        return "הכרטיס אשראי פג תוקף"
    }
    return "";
}


function isEnglishName(name) {
    return /^[a-z]+$/i.test(name)
}

function isHebrewName(name) {
    return /^[\u0590-\u05fe]+$/i.test(name)
}

function validateName(name) {
    return (/^[a-z\u0590-\u05fe]+$/i.test(name));
}

function setValidFormCell(cell, cellError) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    cellError.textContent = ''; // Reset the content of the message
    cell.setCustomValidity("")
    cellError.className = 'error'; // Reset the visual state of the message
}

function setInvalidFormCell(cell, cellError, errorMsg) {
    cellError.textContent = errorMsg
    cell.setCustomValidity(errorMsg)
    cellError.className = 'error active';
}

function emailFormValidation(form) {
    let emailFormCells = form.querySelectorAll(".email-form-element")
    emailFormCells.forEach(function (emailCell) {
        let email = emailCell.querySelector('input')
        let emailError = emailCell.querySelector('.error')
        email.addEventListener('input', function () {
            // Each time the user types something, we check if the
            // form fields are valid.

            if (email.validity.valid) {
                setValidFormCell(email, emailError)
            } else {
                // If there is still an error, show the correct error
                showError();
            }
        });

        form.addEventListener('submit', function (event) {
            // if the email field is valid, we let the form submit

            if (!email.validity.valid) {
                // If it isn't, we display an appropriate error message
                showError();
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

        function showError() {
            if (email.validity.valueMissing) {
                // If the field is empty,
                // display the following error message.
                emailError.textContent = 'ֿֿנא להכניס אימייל';
            } else if (email.validity.typeMismatch) {
                // If the field doesn't contain an email address,
                // display the following error message.
                emailError.textContent = 'נא הכנס אימייל תקין';
            } else if (email.validity.tooShort) {
                // If the data is too short,
                // display the following error message.
                emailError.textContent = `אימייל צריך להיות באורך ${email.minLength} לפחות. אתה הכנסת ${email.value.length} תווים.`
            }

            // Set the styling appropriately
            emailError.className = 'error active';
        }

    })
}

function phoneFormValidation(form) {
    let phoneFormCells = form.querySelectorAll(".phone-form-element")
    phoneFormCells.forEach(function (phoneCell) {
        let phone = phoneCell.querySelector('input')
        let phoneError = phoneCell.querySelector('.error')
        phone.addEventListener('input', function () {
            let isValid = isValidPhone(phone.value)

            if (isValid) {
                setValidFormCell(phone, phoneError)
            } else {
                // If there is still an error, show the correct error
                setInvalidFormCell(phone, phoneError, "נא הכנס מספר טלפון סלולרי או ביתי תקין.");
            }
        });

        form.addEventListener('submit', function (event) {
            // if the phone field is valid, we let the form submit
            let isValid = isValidPhone(phone.value)
            if (!isValid) {
                // If it isn't, we display an appropriate error message
                setInvalidFormCell(phone, phoneError, "נא הכנס מספר טלפון סלולרי או ביתי תקין.");
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

    })
}

function nameFormValidation(form) {
    let nameFormCells = form.querySelectorAll(".name-form-element")
    nameFormCells.forEach(function (nameCell) {
        let name = nameCell.querySelector('input')
        let nameError = nameCell.querySelector('.error')
        name.addEventListener('input', function () {
            let isOnlyHebrew = isHebrewName(name.value)
            let isOnlyEnglish = isEnglishName(name.value)
            let isValid = isOnlyHebrew || isOnlyEnglish || name.value === ''
            if (isValid) {
                setValidFormCell(name, nameError)
            } else {
                let isOnlyLetters = validateName(name.value)
                if (!isOnlyLetters) {
                    let errorMsg = 'נא הכנס רק אותיות בשם, באנגלית או בעברית'
                    setInvalidFormCell(name, nameError, errorMsg);
                } else {
                    //    we have a mix of hebrew/english chars
                    let errorMsg = 'נא נכנס רק אותיות באנגלית, או רק אותיות בעברית, לא את שניהם ביחד.'
                    setInvalidFormCell(name, nameError, errorMsg);
                }
                // If there is still an error, show the correct error
            }
        });

        form.addEventListener('submit', function (event) {
            // if the phone field is valid, we let the form submit
            let isValid = validateName(name.value) || name.value === ''
            if (!isValid) {
                let isOnlyLetters = validateName(name.value)
                if (!isOnlyLetters) {
                    let errorMsg = 'נא הכנס רק אותיות בשם, באנגלית או בעברית'
                    setInvalidFormCell(name, nameError, errorMsg);
                } else {
                    //    we have a mix of hebrew/english chars
                    let errorMsg = 'נא נכנס רק אותיות באנגלית, או רק אותיות בעברית, לא את שניהם ביחד.'
                    setInvalidFormCell(name, nameError, errorMsg);
                }
                // If it isn't, we display an appropriate error message
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

    })
}

function isValidCreditcard(ccVal) {
    return visaRegEx.test(ccVal) || mastercardRegEx.test(ccVal) || amexpRegEx.test(ccVal) || discovRegEx.test(ccVal)
}

function creditCardFormValidation(form) {
    let creditCardFormCells = form.querySelectorAll(".creditCardName-form-element")
    creditCardFormCells.forEach(function (creditCardCell) {
        let creditCard = creditCardCell.querySelector('input')
        let creditCardError = creditCardCell.querySelector('.error')
        creditCard.addEventListener('input', function () {
            if (isValidCreditcard(creditCard.value)) {
                setValidFormCell(creditCard, creditCardError)
            } else {
                setInvalidFormCell(creditCard, creditCardError, "אנא הכנס תוקף כרטיס אשראי תקין");
            }

        });

        form.addEventListener('submit', function (event) {
            if (!isValidCreditcard(creditCard.value)) {
                // If it isn't, we display an appropriate error message
                setInvalidFormCell(creditCard, creditCardError, "אנא הכנס תוקף כרטיס אשראי תקין");
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

    })
}

function numberEleFormValidation(form, length, eleName) {
    let numCells = form.querySelectorAll(`.${eleName}-form-element`)
    numCells.forEach(function (numCell) {
        let numInput = numCell.querySelector('input')
        let numInputError = numCell.querySelector('.error')
        numCell.addEventListener('input', function () {
            if (numInput.value.length === length) {
                setValidFormCell(numInput, numInputError)
            } else {
                setInvalidFormCell(numInput, numInputError, `האורך צריך להיות כ${length} ספרות`);
            }

        });

        form.addEventListener('submit', function (event) {
            if (!numInput.value.length === length) {
                // If it isn't, we display an appropriate error message
                setInvalidFormCell(numInput, numInputError, `האורך צריך להיות כ${length} ספרות`);
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

    })
}

function CreditCardExpiredFormValidation(form) {
    let CCExpDateCells = form.querySelectorAll(`.CCExpDate-form-element`)
    CCExpDateCells.forEach(function (ExpDateCell) {
        let expDate = ExpDateCell.querySelector('input')
        let expDateError = ExpDateCell.querySelector('.error')
        ExpDateCell.addEventListener('input', function () {
            let errorMsg = isNotExpired(expDate.value)
            if (errorMsg === "") {
                setValidFormCell(expDate, expDateError)
            } else {
                setInvalidFormCell(expDate, expDateError, errorMsg)
            }

        });

        form.addEventListener('submit', function (event) {
            let errorMsg = isNotExpired(expDate.value)
            if (errorMsg !== "") {
                // If it isn't, we display an appropriate error message
                setInvalidFormCell(expDate, expDateError, errorMsg)
                // Then we prevent the form from being sent by canceling the event
                event.preventDefault();
            }
        });

    })
}

(function addFormValidations() {
    let forms = document.querySelectorAll('form')
    forms.forEach(function (form) {
        phoneFormValidation(form)
        nameFormValidation(form)
        emailFormValidation(form)
        creditCardFormValidation(form)
        numberEleFormValidation(form, 9, "ID")
        numberEleFormValidation(form, 3, "CVV")
        CreditCardExpiredFormValidation(form)
    })
})();