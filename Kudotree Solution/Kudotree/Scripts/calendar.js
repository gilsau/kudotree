var months = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"];

$(document).ready(function () {

    //Event handler for Calendar Arrow Clicks
    $('.calendarLeftArrow, .calendarRightArrow').click(function () {
        GetCalendar(this);
    });
});

function GetCalendar(arrow) {
    var month = $(arrow).attr('data-month');
    var year = $(arrow).attr('data-year');
    var container = $('#calendarContainer');

    container.html('<img src="../images/loading_animated.gif" style="width:' + container.width() + 'px;height:' + container.height() + 'px;" />');

    //Show dialog for at least 3 seconds
    setTimeout(function () {

        //Run ajax
        $.ajax({
            type: "GET",
            url: "/account/calendar",
            data: { AccountId: 1, Month: month, Year: year }
        })
        .fail(function (response) {
            console.log('fail');
            console.log("response.statusText: " + response.statusText);
            console.log("response.responseText: " + response.responseText);
        })
        .done(function (response) {

            container.html(response);
            $('.calendarLeftArrow, .calendarRightArrow').on('click', function () {
                GetCalendar(this);
            });

            //console.log("response.statusText: " + response.statusText);
            //console.log("response.responseText: " + response.responseText);
        });

    }, 1000);
}