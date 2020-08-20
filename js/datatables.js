// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#ccpProfile').DataTable({
    data: testProfile,
    columns: [
      { data: 'totalCCU' },
      { data: 'pcCCU' },
      { data: 'mobileCCU' }
    ],
    paging: false,
    searching: false,
    info: false
  });
});

// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#testProfile').DataTable({
    data: testProfile,
    columns: [
      { data: 'targetServer' },
      { data: 'testStartTime' },
      { data: 'duration' },
      { data: 'rampupDuration' }
    ],
    paging: false,
    searching: false,
    info: false
  });
});


// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#serverProfile').DataTable({
    data: serverProfile,
    columns: [
      { data: 'serviceName' },
      { data: 'version' },
      { data: 'podCount' },
      { data: 'serviceType' },
      { data: 'createdAt' }
    ]
  });
});

// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#serverMetric').DataTable({
    pageLength: 100,
    'rowCallback': function(row, data, index) {
      console.log(data.cpu);
      console.log(data.memory);
      var reg = /([0-9.]*)% \/ ([0-9.]*)% \/ ([0-9.]*)%/i;
      var cpuMatchs = data.cpu.match(reg);
      var memMatchs = data.memory.match(reg);

      console.log(cpuMatchs);
      console.log(memMatchs);

      var criteriaReg = /AVG \< ([0-9.]*)%\, MAX \< ([0-9.]*)%/i;
      var cpuCriteriaMatchs = data.cpuCriteria.match(criteriaReg);
      var memCriteriaMatchs = data.memCriteria.match(criteriaReg);

      console.log(cpuCriteriaMatchs);
      console.log(memCriteriaMatchs);

      var isCpuOverTarget = false;
      var isMemOverTarget = false;
    
      if (parseFloat(cpuMatchs[1]) >= parseFloat(cpuCriteriaMatchs[1]) || parseFloat(cpuMatchs[3]) >= parseFloat(cpuCriteriaMatchs[2])) {
        isCpuOverTarget = true;
      }

      if (parseFloat(memMatchs[1]) >= parseFloat(memCriteriaMatchs[1]) || parseFloat(memMatchs[3]) >= parseFloat(memCriteriaMatchs[2])) {
        isMemOverTarget = true;
      }

      if (isCpuOverTarget) {
        $('td:eq(2)', row).css('color', 'red');
      }

      if (isMemOverTarget) {
        $('td:eq(4)', row).css('color', 'red');
      }
    },
    data: serverMetric,
    columns: [
      { data: 'serviceName' },
      { data: 'cpuCriteria' },
      { data: 'cpu' },
      { data: 'memCriteria' },
      { data: 'memory' }
    ]
  });
});

