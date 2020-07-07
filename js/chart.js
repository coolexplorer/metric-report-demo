var ctx = document.getElementById("milestone")
ctx.innerHTML = testProfile[0]["milestone"]

var ctx = document.getElementById("totalCCU")
ctx.innerHTML = testProfile[0]["totalCCU"]

var ctx = document.getElementById("testStartTime")
ctx.innerHTML = changeDateString(testProfile[0]["testStartTime"])

var ctx = document.getElementById("duration")
ctx.innerHTML = testProfile[0]["duration"]

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