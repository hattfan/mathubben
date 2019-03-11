document.querySelector("#refresh-box").addEventListener("click", function() {
  window.location.reload(false); 
});

function resetAll(){
  d3.select("#map").selectAll("*").remove();
  d3.select("#line").selectAll("*").remove();
  d3.select("#kommun-map").selectAll("*").remove();
  d3.select("#pie").selectAll("*").remove();
}

    /*=============================================
    =            Projections of kommuner          =
    =============================================*/
    function projectionCalculation(selectedLaen) {
      switch (selectedLaen) {

          case '01':
              var scale = 4950, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1130 - scale / 20, scale + scale / 1.75 - 1230])
              break;
          case '03':
              var scale = 5200, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1100 - scale / 20, scale + scale / 1.75 - 1200])
              break;
          case '04':
              var scale = 5800, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1200 - scale / 20, scale + scale / 1.75 - 1550])
              break;
          case '05':
              var scale = 5000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-920 - scale / 20, scale + scale / 1.75 - 1440])
              break;
          // x mer minus - vänster
          // y mer minus - uppåt
          case '06':
              var scale = 5000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-800 - scale / 20, scale + scale / 1.75 - 1570])
              break;
          case '07':
              var scale = 6000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1020 - scale / 20, scale + scale / 1.75 - 2050])
              break;

          case '08':
              var scale = 3500, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-600 - scale / 20, scale + scale / 1.75 - 1100])
              break;

          case '09':
              var scale = 5000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1150 - scale / 20, scale + scale / 1.75 - 1580])
              break;

          case '10':
              var scale = 8000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1520 - scale / 20, scale + scale / 1.75 - 2900])
              break;
          case '12':
              var scale = 6000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-930 - scale / 20, scale + scale / 1.75 - 2210])
              break;
          case '13':
              var scale = 5500, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-760 - scale / 20, scale + scale / 1.75 - 1830])
              break;
          case '14':
              var scale = 3000, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-320 - scale / 20, scale + scale / 1.75 - 830])
              break;

          case '17':
              var scale = 2800, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-300 - scale / 20, scale + scale / 1.75 - 600])
              break;

          case '18':
              var scale = 4800, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-825 - scale / 20, scale + scale / 1.75 - 1200])
              break;

          case '19':
              var scale = 5800, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-1150 - scale / 20, scale + scale / 1.75 - 1400])
              break;
          case '20':
              var scale = 2650, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-325 - scale / 20, scale + scale / 1.75 - 450])
              break;
          case '21':
              var scale = 2700, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-400 - scale / 20, scale + scale / 1.75 - 450])
              break;
          case '22':
              var scale = 2500, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-400 - scale / 20, scale + scale / 1.75 - 250])
              break;
          case '23':
              var scale = 1700, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-150 - scale / 20, scale + scale / 1.75 - 100])
              break;
          case '24':
              var scale = 1700, translateCalc = 2100;
              var projection = d3.geoMercator()
                  .scale(scale)
                  .translate([-200 - scale / 15, scale + scale / 1.75])
              break;
          case '25':
              var projection = d3.geoMercator()
                  .scale(1200)
                  .translate([-200, 2030])
              break;
          default:
              break;
      }
      return projection
  }
  /*=====  End of Projections of kommuner======*/