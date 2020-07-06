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

function generateData() {
  var unit = 'hour';

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomBar(date, lastClose) {
    var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
    return {
      t: date.valueOf(),
      y: close
    };
  }

  var date = moment('Jan 01 1990', 'MMM DD YYYY');
  var now = moment();
  var data = [];
  for (; data.length < 600 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
    data.push(randomBar(date, data.length > 0 ? data[data.length - 1].y : 30));
  }
  console.log(data);
  return data;
}

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
/* https://codenebula.io/javascript/frontend/dataviz/2019/04/18/automatically-generate-chart-colors-with-chart-js-d3s-color-scales/ */
var color = Chart.helpers.color;
var colorScale = d3.interpolateInferno;
var colorRangeInfo = {
  colorStart: 0,
  colorEnd: 1,
  useEndAsStart: true,
}
function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var colorRange = colorRangeInfo.colorEnd - colorRangeInfo.colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}

function calculatePoint(i, intervalSize, colorRangeInfo) {
  return (colorRangeInfo.useEndAsStart
    ? (colorRangeInfo.colorEnd - (i * intervalSize))
    : (colorRangeInfo.colorStart + (i * intervalSize)));
}

var chartColors = interpolateColors(10, colorScale, colorRangeInfo);

