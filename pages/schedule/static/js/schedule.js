function calculateAvailableHours(dateVal) {
    fetch(`/available_hours?` + new URLSearchParams({'date_': dateVal}))
        .then(response => response.json())
        .then(hours => {
            if (hours.length === 0) {
                alert('אין תורים פנויים בתאריך שביקשת, נא לנסות תאריך אחר.')
                return false
            }
            let hourOptions = hours.map(hour => `<option value=${hour}>${hour}</option>`)
            let innerHTML = `
            <span>אנא בחר שעה</span>
            <br>
            <select name="hour" id="hour" required>
            ${hourOptions.join('\n')}
            </select>
            `
            let scheduleHourFormElement = document.getElementById('schedule-hour')
            scheduleHourFormElement.innerHTML = innerHTML
        })
}

document.getElementById('date').addEventListener('change', function () {
    let dateVal = this.value
    calculateAvailableHours(dateVal)
})
calculateAvailableHours(document.getElementById('date').value)