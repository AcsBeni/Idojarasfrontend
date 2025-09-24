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
        console.error('Error fetching chart data:', error);
    }
}
function initChart() {
    const ctx = document.querySelector('#chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
          label: 'Hőmérséklet c°',
          data: datas,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'időjárás'
            }
          },  
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      }
    );
}