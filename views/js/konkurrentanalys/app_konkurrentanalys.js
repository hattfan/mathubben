// var height = 300;

// window.onresize = function (event) {
//   screenResize()
// };
// screenResize()

createMap()

var target = document.getElementById('#map');
var title = document.querySelector('#title');
var underTitle = document.querySelector('#underTitle')
var varugruppsBtn = document.getElementById("varugrupp");
var barText = document.querySelector(".bartext")
var barchartExists = document.querySelector("bar")

function drawGraphs(data, laenData, sverigeData) {

  d3.queue()
    .defer(d3.json, "../src/sverige.topojson")
    .defer(d3.json, "../src/sweden-counties.json")
    // .defer(d3.json, `konkurrentanalysdata/${artNr}`)

    .await(function (error, kommunMapData, laenMapData) {
      if (error) throw error;
      //!Definierar inputs
      // console.log(data, kommunMapData)

      var extremeYears = d3.extent(data, d => +d.Year);
      var currentYear = extremeYears[1]
      $("#slider").slider("value", extremeYears[1])
      var currentDataType = d3.select('input[name="data-type"]:checked')
        .attr("value");
      var currentCalculationType = d3.select('input[name="calculation-type"]:checked')
        .attr("value");
      var geoData = topojson.feature(kommunMapData, kommunMapData.objects.sverige).features;

      // updateTitle(currentDataType, currentCalculationType, currentYear)

      //! Function-calls
      drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType);
      
      var visningsVal = currentDataType + currentCalculationType
      
      // lineGraph(data, visningsVal, 'Sverige')
      // drawBar(data, "", visningsVal)

      var startPos = $("#slider").slider("value")
      
      //!Värden på års-slidern
      $("#slider").on("slidestop", function(event, ui) { 
        console.log(startPos)  
        var endPos = ui.value;
          if (startPos != endPos) {
            // d3.select("#map").selectAll("*").remove();
            // d3.select("#line").selectAll("*").remove();
            // document.querySelector("#line-chart-name").innerText = 'Sverige'
            currentYear = endPos;
            drawMap(geoData, laenMapData, data, laenData, currentYear, currentDataType, currentCalculationType);
            // lineGraph(data, visningsVal)

          }
          startPos = endPos;
      });

      //!När data-type ändras renderas kartor om
      d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          currentDataType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          console.log(visningsVal);
          // d3.select("#map").selectAll("*").remove();
          // d3.select("#line").selectAll("*").remove();
          document.querySelector("#line-chart-name").innerText = 'Sverige'
          drawMap(geoData, laenMapData, data, laenData, currentYear, currentDataType, currentCalculationType);
          // drawBar(data, kommun, visningsVal)

        });

      //!När calculation-type ändras renderas kartor om
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          currentCalculationType = d3.event.target.value;
          visningsVal = currentDataType + currentCalculationType
          console.log(visningsVal);
          // d3.select("#map").selectAll("*").remove();
          // d3.select("#line").selectAll("*").remove();
          document.querySelector("#line-chart-name").innerText = 'Sverige'
          drawMap(geoData, laenMapData, data, laenData, currentYear, currentDataType, currentCalculationType);
          // drawBar(data, kommun, visningsVal)
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

        var units = currentDataType === "Mangd" ? "kg" : "kronor";
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

        if (isKommun) {
          tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g, "'");
          tooltipProdukt = tooltipData['Benamning'] === undefined ? "" : tooltipData['Benamning'];          
          tooltipData.kommun === "" ? tooltipData.KommunNamn = tooltipKommun.KNNAMN : null;
        }

        if (isLaen) {
          tooltipProdukt = tooltipData['Benamning'] === undefined ? "" : tooltipData['Benamning'];
          tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g, "'");
        }

        if (tooltipData) {
          tooltip
            .html(`
        <p>${tooltipSort}: ${tooltipNamn}</p>
        <p>Mängd: ${tooltipAmount} ${units} - ${calculation}</p>
        <p>År: ${currentYear}</p>
        <p>Produkt: ${tooltipProdukt}</p>
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

  // debugger
  // document.querySelector("#line")?d3.select(".line-container").append("svg").attr("id", "line"):null

    
  updateMapSize()
  // createLine()
  // createBar(barChartWidth, height)    

}