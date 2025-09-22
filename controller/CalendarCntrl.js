async function GetCalendardate() {
    
}


function initCalendar(){
    var calendarEl = document.querySelector("#calendar")
    var calendar = new Fullcalendar.Calendar(calendarEl,{

        initialView: 'timeGridFourDay',
        initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev.today,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear' 
        },
        locale: 'hu',
        events: callevents

    })
    calendar.render();
}