document.querySelector("#show-login").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
})
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
})
document.querySelector(".popup-register .close-btn-register").addEventListener("click", function () {
    document.querySelector(".popup-register").classList.remove("active");
})
document.querySelector("#show-register").addEventListener("click", function () {
    document.querySelector(".popup-register").classList.add("active");
    document.querySelector(".popup").classList.remove("active");
})

document.querySelector('#login-form').addEventListener('submit', function (e) {
    let register_form = document.forms["login-form"]
    let user_data = {"email": register_form['email-sign'].value, "password": register_form['password-sign'].value}
    $.ajax({
        type: "POST",
        url: "/log_in",
        data: JSON.stringify(user_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            if (!result.valid) {
                alert("הפרטים שהזנת לא נכונים. אנא וודא שהמייל והסיסמא נכונים")
                e.preventDefault();
            }
            else {
                alert('התחברת בהצלחה לאתר!')
            }
        },
        error: function () {
            alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
        },
        async: false
    })
})
document.querySelector('#register-form').addEventListener('submit', function (e) {
    let register_form = document.forms["register-form"]
    let email = register_form['email-reg'].value
    let password = register_form['password-reg'].value
    let user_data = {
        "email": email, "password": password, "first_name": register_form['fname'].value,
        'last_name': register_form['lname'].value
    }
    $.ajax({
        type: "POST",
        url: "/register",
        data: JSON.stringify(user_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            if (!result.valid) {
                alert("משתמש כבר קיים במערכת. נא להשתמש במייל אחר")
                e.preventDefault();
            } else {
                $.ajax({
                    type: "POST",
                    url: "/log_in",
                    data: JSON.stringify({"email": email, "password": password}),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function (result) {
                        if (!result.valid) {
                            alert("נא נסה להתחבר עוד כמה דק׳ לאחר שהמערכת שמרה את הפרטים")
                            e.preventDefault();
                        }
                        else {
                            alert('נרשמת בהצלחה לאתר! ברוכים הבאים!')
                        }
                    },
                    error: function () {
                        alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
                    },
                    async: false
                })
            }
        },
        error: function () {
            alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
        },
        async: false
    })
})