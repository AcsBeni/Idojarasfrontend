let chart = null;
let labels = [];
let datas = [];
let mindatas =[];
let weatherData = [
];
const weatherIcons = {
  "Derült": "☀️",
  "Gyengén felhős": "🌤️",
  "Erősen felhős": "⛅",
  "Borult": "☁️",
  "Eső": "🌧️",
  "Zivatar": "⛈️",
  "Havazás": "❄️"
};

async function getchartdata(){
   
    try {
        
        const res = await fetch(`${Server}/weather/user/${loggeduser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await res.json();
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        labels = result.map(item => item.date);
        datas = result.map(item => item.temp);
        mindatas = result.map(item => item.mintemp)
        weatherData = result.map(item => item.weather)
        console.log(datas)
        console.log(labels)
    } catch (error) {
      Alert( "danger","Hiba történt!",err );
    }
}
function initChart() {
  const ctx = document.querySelector('#chart').getContext('2d');

  // Create gradient for line
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(196, 33, 168, 0.6)');
  gradient.addColorStop(1, 'rgba(154, 54, 235, 0)');

  chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Max hőmérséklet',
        data: datas,
        fill: '+1', // Fill to the next dataset (mindatas)
        backgroundColor: 'rgba(218, 66, 248, 0.3)',
        borderColor: 'rgb(218, 66, 248)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(183, 0, 255)',
        pointHoverRadius: 6,
        pointRadius: 4
      },
      {
        label: 'Min hőmérséklet',
        data: mindatas,
        fill: false, // Don't fill below min line
        borderColor: 'rgb(66, 133, 244)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(66, 133, 244)',
        pointHoverRadius: 6,
        pointRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Időjárás alakulása',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 30 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: function(context) {
            return context.parsed.y + '°C';
          }
        }
      }
    },
    scales: {
      x: {
            ticks: {
              font: { size: 15 },
              callback: function(value, index, ticks) {
                const dateLabel = this.getLabelForValue(value);
                const icon = Gettheweather(weatherData[index]);
                return [dateLabel, icon];
              }
            }
      },
      y: {
        min: -50,       
        max: 50,        
        title: { display: true, text: 'Hőmérséklet (°C)' },
        ticks: { font: { size: 12 } }
      }
    }
  }
});

}

function Gettheweather(condition) {
   return weatherIcons[condition] || "";
}