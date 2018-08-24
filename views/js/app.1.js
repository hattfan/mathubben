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
var title = document.querySelector('#title')
var varugruppsBtn = document.getElementById("varugrupp");
// varugruppsBtn.onclick = dataFetch();
document.getElementById("renderGraph").addEventListener("click", function () {
  dataFetch()}, false)

createMap(width, width * 4 /5)
createBar(width, height)
// dataFetch();

function dataFetch() {
  
  varugruppValue = varugruppsBtn.options[varugruppsBtn.selectedIndex].value;
  title.textContent = varugruppValue;
  var routeRequest = ('http://127.0.0.1:3030/dbyear2/' + varugruppValue);

  // var routeRequest = ('http://localhost:3030/db/Chark');

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
          var active = d3.select(".active").data()[0];
          var country = active ? active.properties.country : "";
          currentDataType = d3.event.target.value;
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          // drawBar(data, currentDataType, country);
        });

      //!När calculation-type ändras renderas kartor om
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          var active = d3.select(".active").data()[0];
          var country = active ? active.properties.country : "";
          currentCalculationType = d3.event.target.value;
          drawMap(geoData, data, currentYear, currentDataType, currentCalculationType, varugruppValue);
          // drawBar(data, currentDataType, country);
        });

      //!Vid ändring av musen på kartan uppdateras tooltip
      d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);

      function updateTooltip() {
        var tooltip = d3.select(".tooltip");
        var tgt = d3.select(d3.event.target);
        var isKommun = tgt.classed("kommun");

        var test;
        var percentage = "";

        if (isKommun) test = tgt.data()[0].properties;
        tooltip
          .style("opacity", +(isKommun))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");

        if (test) {
          tooltip
            .html(`
        <p>Kommun: ${test.KNNAMN}</p>
        <p>Mängd: ${test.data} kg</p>
      `)
        }
      };
    });
}

function formatDataType(key) {
  return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
}