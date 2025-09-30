let callevents = []

async function GetCalendardate() {
  callevents = []
  try {
    const res = await fetch(`${Server}/weather/user/${loggeduser.id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await res.json();
    result.forEach(x => {
      
      let icon = weatherIcons[x.weather] || x.weather;

      let event = {
        title: `${icon} ${x.mintemp}-${x.temp}°C`, 
        start: x.date,
        allDay: true,
        extendedProps: {
          weather: x.weather,
          temp: x.temp,
          mintemp: x.mintemp
        }
      }
      callevents.push(event)
    });
  }
  catch (err) {
    Alert("danger", "Hiba történt!", err);
  }
}

function initCalendar() {
  var calendarEl = document.querySelector("#calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev today next',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
    },
    locale: 'hu',
    eventTextColor: 'purple',
    events: callevents,
  });

  calendar.render();
}

weatherIcons = {
  "Derült": "☀️",
  "Gyengén felhős": "🌤️",
  "Erősen felhős": "⛅",
  "Borult": "☁️",
  "Eső": "🌧️",
  "Zivatar": "⛈️",
  "Havazás": "❄️"
};