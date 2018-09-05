var height = 300;

window.onresize = function(event) {
  screenResize()
};

screenResize()

var target = document.getElementById('#map');

var title = document.querySelector('#title');
var underTitle = document.querySelector('#underTitle')
var varugruppsBtn = document.getElementById("varugrupp");
var barText = document.querySelector(".bartext")
var barchartExists = document.querySelector("bar")

// varugruppsBtn.onclick = dataFetch();
document.getElementById("renderGraph").addEventListener("click", function () {
  dataFetch()}, false)

function dataFetch() {
  barchartExists ? barText.innerHTML = '' : barText.innerHTML = `<h3 style="margin: 10% 0 0 10%">Klicka på en kommun för att se detaljer</h3>`
  
  title.textContent = "Hämtar data"

  // console.log(spinner)
  varugruppValue = varugruppsBtn.options[varugruppsBtn.selectedIndex].value;
  
  // var routeRequest = ('http://127.0.0.1:3030/dbyear2/' + varugruppValue);
  var routeRequest = ('/varugrupptest/' + varugruppValue);

  d3.queue()
    .defer(d3.json, "../src/sverige.topojson")
    .defer(d3.json, routeRequest)

    .await(function (error, mapData, data) {
      if (error) throw error;
      //!Definierar inputs
      var extremeYears = d3.extent(data, d => +d.Year);
      // var currentYear = extremeYears[0];
      var currentYear = extremeYears[1];
      var currentDataType = d3.select('input[name="data-type"]:checked')
        .attr("value");
      var currentCalculationType = d3.select('input[name="calculation-type"]:checked')
        .attr("value");
      var geoData = topojson.feature(mapData, mapData.objects.sverige).features;
      
      updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)

      //! Function-calls
      drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
      var visningsVal = currentDataType + currentCalculationType
      // drawBar(data, "", visningsVal)

      //! Värden på års-togglarn
      d3.select("#year")
        .property("min", extremeYears[0])
        .property("max", extremeYears[1])
        .property("value", extremeYears[1])
        .on("input", () => {
          currentYear = +d3.event.target.value;

          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          highlightBars(currentYear)
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)

        })


      //!När data-type ändras renderas kartor om
      d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          var kommun = d3.select(".active").data()[0].properties.KNKOD;
          currentDataType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          drawBar(data, kommun, visningsVal)

        });

      //!När calculation-type ändras renderas kartor om
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          //?Osäker på dessa
          var kommun = d3.select(".active").data()[0].properties.KNKOD;
          currentCalculationType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          drawBar(data, kommun, visningsVal)
        });

      //!Vid ändring av musen på kartan uppdateras tooltip
      d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);

      function updateTooltip() {
        var visningsVal = currentDataType + currentCalculationType;
        var tooltip = d3.select(".tooltip");
        var tgt = d3.select(d3.event.target);
        var isKommun = tgt.classed("kommun");
        var isBar = tgt.classed("bar");

        var units = currentDataType === "Mängd" ? "kg" : "kronor";
        var calculation = currentCalculationType === "Total" ? "totalt" : "per capita"

        var tooltipData;

        // console.log(tgt.data()[0].properties.data)
        if (isBar) {
          tooltipData = tgt.data()[0]
          var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g , "'")
          // tooltipKommun
          // console.log(data)
        };

        if (isKommun) tooltipData = tgt.data()[0].properties.data, tooltipKommun = tgt.data()[0].properties;
        tooltip
          .style("opacity", +(isKommun || isBar))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
          
          // if (isKommun) var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal]
          if (isKommun) tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g , "'");
          // if (isKommun && tooltipData.kommun) tooltipData.KommunNamn = 
          if (isKommun) tooltipData.kommun === "" ? tooltipData.KommunNamn = tooltipKommun.KNNAMN :null

        if (tooltipData) {
          tooltip
            .html(`
        <p>Kommun: ${tooltipData.KommunNamn}</p>
        <p>Mängd: ${tooltipAmount} ${units} - ${calculation}</p>
        <p>År: ${tooltipData.Year}</p>
      `)
        }
      };
    });
}

function formatDataType(key) {
  return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
}

function updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear){
  title.textContent = varugruppValue 
  underTitle.textContent = currentDataType + ' - ' + currentCalculationType + ' - ' + currentYear;
}

function screenResize(){
  var mapChartWidth = +d3.select(".map-container")
    .node().offsetWidth;

  var barChartWidth = +d3.select(".bar-container")
    .node().offsetWidth;

    // console.log(mapChartWidth, barChartWidth)

    createMap(mapChartWidth, height)
    createBar(barChartWidth, height)    

}