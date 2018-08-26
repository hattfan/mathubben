// 4. make bar chart
// 5. tooltip!
// var width = 500;
// var height = 500;
var width = +d3.select(".chart-container")
              .node().offsetWidth;
var height = 300;
//Från d3-kurs
// var width = +d3.select(".chart-container")
// .node().offsetWidth;
// var height = 300;

// loader settings
var opts = {
  lines: 9, // The number of lines to draw
  length: 9, // The length of each line
  width: 5, // The line thickness
  radius: 14, // The radius of the inner circle
  color: '#EE3124', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 40, // Afterglow percentage
  className: 'spinner', // The CSS class to assign to the spinner
};

var target = document.getElementById('#map');

var title = document.querySelector('#title');
var underTitle = document.querySelector('#underTitle')
var varugruppsBtn = document.getElementById("varugrupp");
// varugruppsBtn.onclick = dataFetch();
document.getElementById("renderGraph").addEventListener("click", function () {
  dataFetch()}, false)

createMap(width, width * 4 /5)
createBar(width, height)
// dataFetch();

function dataFetch() {
  
  title.textContent = "Hämtar data"

  var spinner = new Spinner(opts).spin(target);

  // console.log(spinner)
  varugruppValue = varugruppsBtn.options[varugruppsBtn.selectedIndex].value;
  
  var routeRequest = ('http://127.0.0.1:3030/dbyear2/' + varugruppValue);

  // var routeRequest = ('http://localhost:3030/db/Chark');

  d3.queue()
    .defer(d3.json, "../src/sverige.topojson")
    .defer(d3.json, routeRequest)

    .await(function (error, mapData, data) {
      if (error) throw error;
      spinner.stop();
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
      drawBar(data, currentYear, currentDataType, currentCalculationType);

      //! Värden på års-togglarn
      d3.select("#year")
        .property("min", extremeYears[0])
        .property("max", extremeYears[1])
        .property("value", extremeYears[1])
        .on("input", () => {
          currentYear = +d3.event.target.value;
          // console.log(currentYear)
          // console.log(data, currentYear, currentDataType, currentCalculationType, varugruppValue)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)

        })
      // .on("input", () => {
      //   currentYear = +d3.event.target.value;
      //   drawMap(geoData, data, currentYear, currentDataType);
      //   drawPie(data, currentYear);
      //   highlightBars(currentYear);
      // });

      //!När data-type ändras renderas kartor om
      d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          //?Osäker på dessa
          var active = d3.select(".active").data()[0];
          var kommun = active ? active.properties.kommun : "";
          currentDataType = d3.event.target.value;
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
        });

      //!När calculation-type ändras renderas kartor om
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          //?Osäker på dessa
          var active = d3.select(".active").data()[0];
          var kommun = active ? active.properties.kommun : "";
          currentCalculationType = d3.event.target.value;
          updateTitle(currentDataType, currentCalculationType, varugruppValue, currentYear)
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
        });

      //!Vid ändring av musen på kartan uppdateras tooltip
      d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);

      function updateTooltip() {
        var visningsVal = currentDataType + currentCalculationType;
        var tooltip = d3.select(".tooltip");
        var tgt = d3.select(d3.event.target);
        var isKommun = tgt.classed("kommun");
        // console.log(isKommun)
        var units = currentDataType === "Mängd" ? "kg" : "kronor";
        var calculation = currentCalculationType === "Total" ? "totalt" : "per capita"

        var tooltipData;

        // console.log(tgt.data()[0].properties.data)

        if (isKommun) tooltipData = tgt.data()[0].properties.data, tooltipKommun = tgt.data()[0].properties;
        // console.log(tooltipData)
        tooltip
          .style("opacity", +(isKommun))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
          
          // if (isKommun) var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal]
          if (isKommun) var tooltipAmount = tooltipData[visningsVal] === undefined ? 0 : tooltipData[visningsVal].toLocaleString().replace(/,/g , "'");


        if (tooltipData) {
          tooltip
            .html(`
        <p>Kommun: ${tooltipKommun.KNNAMN}</p>
        <p>Mängd: ${tooltipAmount} ${units} - ${calculation}</p>
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