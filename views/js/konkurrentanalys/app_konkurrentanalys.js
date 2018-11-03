var height = 300;

window.onresize = function (event) {
  screenResize()
};
screenResize()

var target = document.getElementById('#map');
var title = document.querySelector('#title');
var underTitle = document.querySelector('#underTitle')
var varugruppsBtn = document.getElementById("varugrupp");
var barText = document.querySelector(".bartext")
var barchartExists = document.querySelector("bar")

function drawGraphs(data, laenData) {
  d3.queue()
    .defer(d3.json, "../src/sverige.topojson")
    .defer(d3.json, "../src/sweden-counties.json")
    // .defer(d3.json, `konkurrentanalysdata/${artNr}`)

    .await(function (error, kommunMapData, laenMapData) {
      if (error) throw error;
      //!Definierar inputs
      // console.log(data, kommunMapData)

      var extremeYears = d3.extent(data, d => +d.Year);
      var currentYear = extremeYears[1];
      var currentDataType = d3.select('input[name="data-type"]:checked')
        .attr("value");
      var currentCalculationType = d3.select('input[name="calculation-type"]:checked')
        .attr("value");
      var geoData = topojson.feature(kommunMapData, kommunMapData.objects.sverige).features;

      // updateTitle(currentDataType, currentCalculationType, currentYear)

      //! Function-calls
      drawMap(geoData, laenMapData, data, laenData, currentYear, currentDataType, currentCalculationType);
      
      var visningsVal = currentDataType + currentCalculationType
      lineGraph(data, visningsVal)
      // drawBar(data, "", visningsVal)

      //! Värden på års-togglarn
      d3.select("#year")
        .property("min", extremeYears[0])
        .property("max", extremeYears[1])
        .property("value", extremeYears[1])
        .on("input", () => {
          currentYear = +d3.event.target.value;

          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType);
          // highlightBars(currentYear)
          // updateTitle(currentDataType, currentCalculationType, currentYear)

        })


      //!När data-type ändras renderas kartor om
      d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          var kommun = d3.select(".active").data()[0].properties.KNKOD;
          currentDataType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          updateTitle(currentDataType, currentCalculationType, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType);
          drawBar(data, kommun, visningsVal)

        });

      //!När calculation-type ändras renderas kartor om
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          //?Osäker på dessa
          var kommun = d3.select(".active").data()[0].properties.KNKOD;
          currentCalculationType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          updateTitle(currentDataType, currentCalculationType, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType);
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
        var isLaen = tgt.classed("states");
        var isBar = tgt.classed("bar");

        var units = currentDataType === "Mängd" ? "kg" : "kronor";
        var calculation = currentCalculationType === "Total" ? "totalt" : "per capita"

        var tooltipData;

        // console.log(tgt.data()[0].properties.data)
        if (isBar) {
          tooltipData = tgt.data()[0]
          var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g, "'")
          // tooltipKommun
          // console.log(data)
        };

        var tooltipSort = '';
        if (isKommun) tooltipData = tgt.data()[0].properties.data, tooltipNamn = tgt.data()[0].properties.KNNAMN, tooltipSort = "Kommun";
        if (isLaen) tooltipData = tgt.data()[0].properties.data, tooltipNamn = tgt.data()[0].properties.NAME_1, tooltipSort = "Län";
        
        tooltip
          .style("opacity", +(isKommun || isBar || isLaen))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");

        // if (isKommun) var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal]
        if (isKommun) tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g, "'");
        // if (isKommun && tooltipData.kommun) tooltipData.KommunNamn = 
        if (isKommun) tooltipData.kommun === "" ? tooltipData.KommunNamn = tooltipKommun.KNNAMN : null

        
        if (isLaen) tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g, "'");

        // <p>Kommun: ${kommunnamn[tooltipData.KommunNummer]}</p>

        if (tooltipData) {
          tooltip
            .html(`
        <p>${tooltipSort}: ${tooltipNamn}</p>
        <p>Mängd: ${tooltipAmount} ${units} - ${calculation}</p>
        <p>År: ${currentYear}</p>
      `)
        }
      };
    });
}

function formatDataType(key) {
  return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
}

function updateTitle(currentDataType, currentCalculationType, currentYear) {
  title.textContent 
  underTitle.textContent = currentDataType + ' - ' + currentCalculationType + ' - ' + currentYear;
}

function screenResize() {
  var mapChartWidth = +d3.select(".map-container")
    .node().offsetWidth;

  var mapWidth = mapChartWidth/3;

  // var barChartWidth = +d3.select(".bar-container")
  //   .node().offsetWidth;

  // console.log(mapChartWidth, barChartWidth)

  createMap(380, height)
  // createBar(barChartWidth, height)    

}