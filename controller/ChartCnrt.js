let chart = null;
let labels = [];
let datas = [];

async function getchartdata(){
    
    try {
        const res = await fetch(`${Server}/steps/user/${loggeduser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        labels = result.map(item => item.date);
        datas = result.map(item => item.steps);

        
       
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }

}

function initChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
          label: 'My First dataset',

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
              text: 'Lépésszámok'
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