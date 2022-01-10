let form = document.getElementById('change-details-form')
form.addEventListener('submit', function (event) {
    let hasInput = false;
    for (let field of form.elements) {
        if (field.type === 'submit') {
            continue
        }
        if (field.value !== '') {
            hasInput = true;
            break;
        }
    }
    if (!hasInput) {
        alert('לא בחרת שום פרט לשנות.');
        event.preventDefault();
        return false;
    }
});