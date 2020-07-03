// Area Chart Example
var ctx = document.getElementById("network_in").getContext('2d');
var cpuChart = new Chart(ctx, {
  data: {
    datasets: [{
      type: 'line',
      label: "auth",
      lineTension: 0.5,
      backgroundColor: color(chartColors[5]).alpha(0.1).rgbString(),
      borderColor: chartColors[5],
      borderWidth: 0.5,
      borderCapStyle: 'round',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      data: generateData()
    }], 
  },
  options: {
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        offset: true,
        ticks: {
          source: 'data',
          autoSkip: true,
          autoSkipPadding: 75,
          maxRotation: 0,
          sampleSize: 100
        },
      }],
      yAxes: [{
      }],
    },
    legend: {
      display: true,
      position: 'right',
      align: 'start',
      labels: {
          boxWidth: 10,
          fontSize: 10,
          fontColor: 'rgb(255, 99, 132)'
      }
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 10,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

ctx = document.getElementById("network_out").getContext('2d');
var cpuMaxChart = new Chart(ctx, {
  data: {
    datasets: [{
      type: 'line',
      label: "auth",
      lineTension: 0.5,
      backgroundColor: color(chartColors[5]).alpha(0.1).rgbString(),
      borderColor: chartColors[5],
      borderWidth: 0.5,
      borderCapStyle: 'round',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      data: generateData()
    }], 
  },
  options: {
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        offset: true,
        ticks: {
          source: 'data',
          autoSkip: true,
          autoSkipPadding: 75,
          maxRotation: 0,
          sampleSize: 100
        },
      }],
      yAxes: [{
      }],
    },
    legend: {
      display: true,
      position: 'right',
      align: 'start',
      labels: {
          boxWidth: 10,
          fontSize: 10,
          fontColor: 'rgb(255, 99, 132)'
      }
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 10,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});