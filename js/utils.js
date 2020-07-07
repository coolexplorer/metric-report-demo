// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Legend Click 
var original = Chart.defaults.global.legend.onClick;
Chart.defaults.global.legend.onClick = function(e, legendItem) {
  var index = legendItem.datasetIndex;
  var ci = this.chart;
  var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;       
  var anyOthersAlreadyHidden = false;
  var allOthersHidden = true;

  // figure out the current state of the labels
  ci.data.datasets.forEach(function(e, i) {
    var meta = ci.getDatasetMeta(i);

    if (i !== index) {
      if (meta.hidden) {
        anyOthersAlreadyHidden = true;
      } else {
        allOthersHidden = false;
      }
    }
  });

  // if the label we clicked is already hidden 
  // then we now want to unhide (with any others already unhidden)
  if (alreadyHidden) {
    ci.getDatasetMeta(index).hidden = null;
  } else { 
    // otherwise, lets figure out how to toggle visibility based upon the current state
    ci.data.datasets.forEach(function(e, i) {
      var meta = ci.getDatasetMeta(i);

      if (i !== index) {
        // handles logic when we click on visible hidden label and there is currently at least
        // one other label that is visible and at least one other label already hidden
        // (we want to keep those already hidden still hidden)
        if (anyOthersAlreadyHidden && !allOthersHidden) {
          meta.hidden = true;
        } else {
          // toggle visibility
          meta.hidden = meta.hidden === null ? !meta.hidden : null;
        }
      } else {
        meta.hidden = null;
      }
    });
  }

  ci.update();
}

/* Create color array */
var color = Chart.helpers.color;
var chartColors = [
  "#9f5500",
  "#0061cc",
  "#b7a207",
  "#5a36a5",
  "#73c14d",
  "#9359cc",
  "#568600",
  "#738fff",
  "#cd960d",
  "#78afff",
  "#f29a43",
  "#006dad",
  "#ed5948",
  "#46baed",
  "#800c0e",
  "#69c170",
  "#c4379c",
  "#00711d",
  "#ff64b9",
  "#007a49",
  "#cc185b",
  "#aab64c",
  "#800066",
  "#5d6200",
  "#ff6693",
  "#005f51",
  "#ac0038",
  "#88b9a1",
  "#7f0044",
  "#334500",
  "#bea3dc",
  "#792b00",
  "#4b3466",
  "#f49866",
  "#26462d",
  "#d6a29a",
  "#473e1b",
  "#b3b183",
  "#66506c",
  "#694700"
]

/* Get Data Set */
function makeDataSets(data) {
    var dataSets = [];
    Object.keys(data).forEach(function(key) {
        var index = Object.keys(data).indexOf(key);
        dataSets.push(getDataSet(data, key, index));
    });
    return dataSets;
}

function getDataSet(data, key, index) {
  return {
    type: 'line',
    label: key,
    lineTension: 0.5,
    backgroundColor: color(chartColors[index]).alpha(0.2).rgbString(),
    borderColor: chartColors[index],
    borderWidth: 0.5,
    borderCapStyle: 'round',
    pointHoverBorderWidth: 2,
    pointRadius: 0.5,
    data: data[key]
  }
}

function getChartConfig(datasets, yAxeType) {
  return {
    data: {
        datasets: datasets,
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
                time: {
                  unit: 'second',
                  tooltipFormat:'YYYY-MM-DD HH:mm:ss',
                  displayFormats: {
                    'millisecond':'HH:mm:ss',
                    'second': 'HH:mm:ss',
                    'minute': 'HH:mm:ss',
                    'hour': 'HH:mm:ss',
                    'day': 'HH:mm:ss',
                    'week': 'HH:mm:ss',
                    'month': 'HH:mm:ss',
                    'quarter': 'HH:mm:ss',
                    'year': 'HH:mm:ss'
                  }
                },
                ticks: {
                  source: 'auto',
                  autoSkip: true,
                  autoSkipPadding: 75,
                  maxRotation: 0,
                  sampleSize: 100
                },
            }],
            yAxes: [{
              type: 'linear',
              ticks: {
                min: 0,
                callback: function(value, index, values) {
                  return number_format(changeYAxeValue(yAxeType, value), 0) + getYAxePostfix(yAxeType);
                }
              }
            }],
        },
        legend: {
            display: true,
            position: 'right',
            align: 'start',
            labels: {
                boxWidth: 10,
                fontSize: 10,
                fontColor: 'rgb(0, 0, 0)'
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
            displayColors: true,
            intersect: false,
            mode: 'nearest',
            caretPadding: 10,
            position: 'nearest',
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(changeYAxeValue(yAxeType, tooltipItem.yLabel), 3) + getYAxePostfix(yAxeType);
                }
            }
        }
    }
  }
}

/* Date Converter */
function changeDateString(isoString) {
  return moment(isoString).format("YYYY-MM-DD HH:mm")
}

/* Change Y Axe Value */
function changeYAxeValue(yAxeType, yAxeValue) {
  if (yAxeType == "percent") {
    return yAxeValue * 100;
  } else {
    return yAxeValue / 1024;
  }
}

function getYAxePostfix(yAxeType) {
  if (yAxeType == "percent") {
    return "%";
  } else {
    return "KB"
  }
}