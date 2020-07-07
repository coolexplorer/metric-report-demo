var ctx = document.getElementById("cpu").getContext('2d');
var cpuChart = new Chart(ctx, getChartConfig(makeDataSets(cpuData)));

var ctx = document.getElementById("cpu_max").getContext('2d');
var cpuMaxChart = new Chart(ctx, getChartConfig(makeDataSets(cpuMaxData)));

var ctx = document.getElementById("memory").getContext('2d');
var memChart = new Chart(ctx, getChartConfig(makeDataSets(memoryData)));

var ctx = document.getElementById("memory_max").getContext('2d');
var memMaxChart = new Chart(ctx, getChartConfig(makeDataSets(memoryMaxData)));

var ctx = document.getElementById("network_in").getContext('2d');
var networkInChart = new Chart(ctx, getChartConfig(makeDataSets(networkInData)));

var ctx = document.getElementById("network_out").getContext('2d');
var networkOutChart = new Chart(ctx, getChartConfig(makeDataSets(networkOutData)));