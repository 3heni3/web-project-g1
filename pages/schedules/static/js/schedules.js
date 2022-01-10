function cancelSchedule(scheduleDate) {
    console.log(scheduleDate)
    $.ajax({
        type: "POST",
        url: "/schedules",
        data: JSON.stringify({"date_": scheduleDate}),
        contentType: "application/json",
        dataType: 'json',
        success: function () {
            alert("התור בוטל בהצלחה!");
            location.reload();
        },
        error: function (err) {
            console.log(err)
            alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
        },
        async: false
    })
}