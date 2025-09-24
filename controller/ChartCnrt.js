let chart = null;
let labels = [];
let datas = [];

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
      datasets: [{
        label: 'Hőmérséklet',
        data: datas,
        fill: true,
        backgroundColor: gradient,
        borderColor: 'rgb(218, 66, 248)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(183, 0, 255)',
        pointHoverRadius: 6,
        pointRadius: 4
      }]
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
            font: { size: 12 },
            callback: function(value, index, ticks) {
              const dateLabel = this.getLabelForValue(value);
              return [dateLabel,  '☁️'/*Gettheweather()*/];
            }
          }
        }
      }
    }
  });
}

async function Gettheweather() {
    return;
}