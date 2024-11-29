function makeConfig(dataSheets, ChartDataLabels){
    const config = {
        type: "doughnut",
        data: dataSheets,
        options: {
          cutout: '85%', // размер внутренней области бублика      
         layout: {
          // !отступы самого графика, иначе цыфры срезаются
          padding: {
              top: 30,
              bottom: 30,
              left: 30,
              right: 30
          }
      },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
                  const value = tooltipItem.raw;
                  const percentage = ((value / total) * 100).toFixed(0) + '%';
                  return `${tooltipItem.label}: ${percentage}`;
                }
              }
            },
            legend: {
              display: false, // Скрыл легенду легенду (не подходит под дизайн)
              clip: false,
            },
            datalabels: {
              formatter: (value, ctx) => {              
                return value + '%';
              },            
              color: (context) => {
                  
                  return context.dataset.backgroundColor[context.dataIndex];
              },
              
              anchor: 'end', 
              align: 'end', 
              offset: 5 // сдвиг на 20 пикселей
              
            }
          }
        },
        plugins: [ChartDataLabels], 
      };

      return config;
}

export {makeConfig};