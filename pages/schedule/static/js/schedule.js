window.addEventListener('load', () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    if (now.getMinutes() !== 0) {
        if (now.getMinutes() < 30) {
            now.setMinutes(30)
        } else {
            //  No need to worry about moving to next day because the barber shop is open until 6PM max.
            now.setMinutes(0)
            now.setHours(now.getHours() + 1)
        }
    }
    let meeting_time = document.getElementById('meeting_time');
    meeting_time.value = now.toISOString().slice(0, -8);
});

function calcNextWeek() {
    let currDate = new Date()
    let dates = new Array(5);
    let index = 0;
    while (count < 5) {
        while (currDate.getDay() === 6 || currDate.getDay() === 0) {
            currDate.setDate(currDate.getDate() + 1);
        }
        dates[index++] = currDate
    }
    return dates
}