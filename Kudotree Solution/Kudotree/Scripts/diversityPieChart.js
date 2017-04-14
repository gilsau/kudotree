$(document).ready(function () {

    //Resize Chart Container
    ResizePieChartContainter();

    $(window).resize(function () {
        ResizePieChartContainter();
    });
    
    //Create pie chart
    var data = [
      ['Heavy Industry', 10], ['Retail', 11], ['Light Industry', 12],
      ['Out of home', 13], ['Commuting', 14], ['Orientation', 40]
    ];
    var plot1 = jQuery.jqplot('profDivGraph', [data],
      {
          title: {
              show: true,
              text: "PROFESSIONAL DIVERSITY GRAPH",
          },

          seriesDefaults: {
              // Make this a pie chart.
              renderer: jQuery.jqplot.PieRenderer,
              rendererOptions: {
                  dataLabels: 'label',
                  showDataLabels: true,
              }
          },

          legend: {
              show: false,
          }
      }
    );

    //Event handler for Pie Slice Click
    $('#profDivGraph').bind('jqplotDataClick',
        function (ev, seriesIndex, pointIndex, data) {
            $('#tblPieChartRightPanel').find('tbody tr td').text(data[0] + ', ' + data[1] + '%');
        }
    );
    
    
});

function ResizePieChartContainter() {
    //console.log('width');
    //console.log($('#profDivGraph').parent().width());

    $('#profDivGraph').css('width', 100);
    $('#profDivGraph').css('height', 100);
}