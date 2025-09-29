let callevents = []

async function GetCalendardate() {
  callevents=[]
  try {
    const res = await fetch(`${Server}/weather/user/${loggeduser.id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await res.json();
    result.forEach(x => {
      let event = {
        title: `${x.weather}\n
                ${x.temp} C°`, 
        start: x.date,                  
        allDay: false,
        extendedProps: {
          weather: x.weather,           
          icon: x.iconUrl              
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
   
    eventContent: function (arg) {
      let weather = arg.event.extendedProps.weather || "";
      let icon = arg.event.extendedProps.icon;

      
      let emojiMap = {
        "Derült": "☀️",
        "Eső": "🌧️",
        "Borult": "☁️",
        "Havazás": "❄️",
        "Zivatar": "⛈️"
      };

      
      let innerHtml = "";
      if (icon) {
        innerHtml = `<img src="${icon}" alt="${weather}" style="width:20px;height:20px;margin-right:4px;">`;
      } else if (emojiMap[weather.toLowerCase()]) {
        innerHtml = `<span style="font-size:18px;margin-right:4px;">${emojiMap[weather.toLowerCase()]}</span>`;
      }

     
      innerHtml += `<span>${arg.event.title}</span>`;

      return { html: innerHtml };
    }
  });

  calendar.render();
}
