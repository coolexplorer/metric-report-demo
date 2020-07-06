var ctx = document.getElementById("cpu").getContext('2d');
var dataSets = [];
Object.keys(cpuData).forEach(function(key) {
  var index = Object.keys(cpuData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var cpuChart = new Chart(ctx, getChartConfig(dataSets));

ctx = document.getElementById("cpu_max").getContext('2d');
dataSets = [];
Object.keys(cpuMaxData).forEach(function(key) {
  var index = Object.keys(cpuMaxData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var cpuMaxChart = new Chart(ctx, getChartConfig(dataSets));

ctx = document.getElementById("memory").getContext('2d');
dataSets = [];
Object.keys(memoryData).forEach(function(key) {
  var index = Object.keys(memoryData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var memChart = new Chart(ctx, getChartConfig(dataSets));

ctx = document.getElementById("memory_max").getContext('2d');
dataSets = [];
Object.keys(memoryData).forEach(function(key) {
  var index = Object.keys(memoryData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var memMaxChart = new Chart(ctx, getChartConfig(dataSets));

ctx = document.getElementById("network_in").getContext('2d');
dataSets = [];
Object.keys(networkInData).forEach(function(key) {
  var index = Object.keys(networkInData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var networkInChart = new Chart(ctx, getChartConfig(dataSets));

ctx = document.getElementById("network_out").getContext('2d');
dataSets = [];
Object.keys(networkOutData).forEach(function(key) {
  var index = Object.keys(networkOutData).indexOf(key);
  dataSets.push(getDataSet(key, index));
});
var networkOutChart = new Chart(ctx, getChartConfig(dataSets));