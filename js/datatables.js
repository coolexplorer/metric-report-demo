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
      console.log(data.cpu)
      console.log(data.memory)
      var reg = /([0-9.]*)% \/ ([0-9.]*)% \/ ([0-9.]*)%/i;
      var cpuMatchs = data.cpu.match(reg);
      var memMatchs = data.memory.match(reg);

      var isCpuOverTarget = false;
      var isMemOverTarget = false;

      var cpuCriteria = parseFloat(data.cpuCriteria.replace('%', ''));
      var memCriteria = parseFloat(data.memCriteria.replace('%', ''));

      for (i=1; i < 4; i++) {
        if (parseFloat(cpuMatchs[i]) >= cpuCriteria) {
          isCpuOverTarget = true;
        }

        if (parseFloat(memMatchs[i]) >= memCriteria) {
          isMemOverTarget = true;
        }
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

