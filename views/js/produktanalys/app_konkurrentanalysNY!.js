// var height = 300;

// window.onresize = function (event) {
//   screenResize()
// };
// screenResize()

createMap();
createPie();

var target = document.getElementById('#map');
var title = document.querySelector('#title');
var underTitle = document.querySelector('#underTitle')
var varugruppsBtn = document.getElementById("varugrupp");
var barText = document.querySelector(".bartext")
var barchartExists = document.querySelector("bar")
var initGraphCreated = false;

function drawGraphs(data, laenData, sverigeData, colors) {
  d3.queue()
    .defer(d3.json, "../src/sverige.topojson")
    .defer(d3.json, "../src/sweden-counties.json")
    // .defer(d3.json, `konkurrentanalysdata/${artNr}`)

    .await(function (error, kommunMapData, laenMapData) {
      if (error) throw error;
      //!Definierar inputs
      var geoData = topojson.feature(kommunMapData, kommunMapData.objects.sverige).features;

      // if (!initGraphCreated) {
        var extremeYears = d3.extent(data, d => +d.Year);
        var currentYear = extremeYears[1]
        
        var startPos = $("#slider").slider("value")
        $("#slider").slider("value", extremeYears[1])
        var currentDataType = d3.select('input[name="data-type"]:checked')
          .attr("value");
        var currentCalculationType = d3.select('input[name="calculation-type"]:checked')
          .attr("value");

        drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        initGraphCreated = true;
      // }

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //! ÅRSSLIDER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!Stor slider
      $("#slider").on("slidestop", function (event, ui) {
        var endPos = ui.value;
        if (startPos != endPos) {
          currentYear = endPos;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        }
        startPos = endPos;
      });

      $("#small-slider").on("slidestop", function (event, ui) {
        var endPos = ui.value;
        if (startPos != endPos) {
          currentYear = endPos;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        }
        startPos = endPos;
      });
      //############## END Slider-change ##############

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!När data-type ändras renderas kartor om !!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!Stor toolbar
      d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          currentDataType = d3.event.target.value;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        });
      //!Liten toolbar
      d3.selectAll('input[name="data-type-small"]')
        .on("change", () => {
          currentDataType = d3.event.target.value;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        });
      //############## END Calculation-type ##############

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!När calculation-type ändras renderas kartor om !!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!Stor toolbar
      d3.selectAll('input[name="calculation-type"]')
        .on("change", () => {
          currentCalculationType = d3.event.target.value;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        });
      //!Liten toolbar
      d3.selectAll('input[name="calculation-type-small"]')
        .on("change", () => {
          currentCalculationType = d3.event.target.value;
          drawMap(geoData, laenMapData, data, laenData, sverigeData, currentYear, currentDataType, currentCalculationType, colors);
        });
      //############## END Calculation-type ##############

      //!Vid ändring av musen på kartan uppdateras tooltip
      d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);

      function updateTooltip() {
        var visningsVal = currentDataType + currentCalculationType;
        var tooltip = d3.select(".tooltip");
        var tgt = d3.select(d3.event.target);
        var isKommun = tgt.classed("kommun-map");
        var isLaen = tgt.classed("states");
        var isBar = tgt.classed("bar");
        var isArc = tgt.classed("arc");

        var units = currentDataType === "Mangd" ? "kg" : "kronor";
        var calculation = currentCalculationType === "Total" ? "totalt" : "per capita"

        var tooltipData, tooltipArc;

        var tooltipSort = '';
        debugger
        if (isKommun) tooltipData = tgt.data()[0].properties.data, tooltipNamn = tgt.data()[0].properties.KNNAMN, tooltipSort = "Kommun";
        if (isLaen) tooltipData = tgt.data()[0].properties.data, tooltipNamn = tgt.data()[0].properties.NAME_1, tooltipSort = "Län";
        if (isArc) tooltipArc = tgt.data()[0].data;

        tooltip
          .style("opacity", +(isKommun || isArc || isLaen))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");

        if (isKommun) {
          tooltipData.kommun === "" ? tooltipData.KommunNamn = tooltipKommun.KNNAMN : null;
        }

        if (isLaen) {
          tooltipProdukt = tooltipData['Benamning'] === undefined ? "" : tooltipData['Benamning'];


          tooltip
            .html(`
        <p>Produkt: ${tooltipArc.Benamning}</p>
        <p>Procent: ${getPercentage(tgt.data()[0])}</p>
        <p>År: ${currentYear}</p>
        `)
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

function getPercentage(d) {
  var angle = d.endAngle - d.startAngle;
  var fraction = 100 * angle / (Math.PI * 2);
  // console.log();
  return fraction.toFixed(2) + "%";
}

function updateTitle(currentDataType, currentCalculationType, currentYear) {
  title.textContent
  underTitle.textContent = currentDataType + ' - ' + currentCalculationType + ' - ' + currentYear;
}

function screenResize() {
  var mapChartWidth = +d3.select(".map-container")
    .node().offsetWidth;

  var mapWidth = mapChartWidth / 3;

  // debugger
  // document.querySelector("#line")?d3.select(".line-container").append("svg").attr("id", "line"):null


  updateMapSize()
  // createLine()
  // createBar(barChartWidth, height)    

}