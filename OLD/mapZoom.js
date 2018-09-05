function createMap(width, height) {
  d3.select("#map")
    .attr("width", width)
    .attr("height", height)
    .append("g")
}

function drawMap(geoData, kommunData, year, dataType, calculationType, produktgrupp) {
  var visningsVal = dataType + calculationType
  var map = d3.select('#map')
  var projection = d3.geoMercator()
    .scale(4800)
    .translate([-700, 6300])
    //If mobile
    // .scale(4200)
    // .translate([-1000, 5400])


  var path = d3.geoPath()
    .projection(projection);
  
  geoData.forEach(d => {
    var kommuner = kommunData.filter(row => row.KommunNummer === d.properties.KNKOD);
    var name = '';
    //Koppla ihop geoData med kommunData mha kommunkod
    if (kommuner.length > 0) name = kommuner[0].kommun;
    d.properties.data = kommuner.find(kommun => +kommun.Year === year) || { kommun: name };

  });

  var colors = ["#7caeff", "#ff0400"];

  var domain = [0, d3.max(kommunData, d => d[visningsVal])];

  var mapColorScale = d3.scaleLinear()
    .domain(domain)
    .range(colors);

  var update = map.selectAll(".kommun")
    .data(geoData);

    console.log(update)

    
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  // var svg = d3.select("#map").selectAll("g")

  // svg
  //   .call(zoom)
  //   .call(zoom.event);


  update
    .enter()
    .append("path")
    .classed("kommun", true)
    .attr("d", path)
    .on("click", function () {
      var kommun = d3.select(this);
      var isActive = kommun.classed("active");
      var kommunName = isActive ? "" : kommun.data()[0].properties['KNNAMN'];
      var kommunKod = isActive ? "" : kommun.data()[0].properties['KNKOD'];

      var visningsVal = dataType + calculationType
      drawBar(kommunData, kommunKod, visningsVal)
      highlightBars(+d3.select("#year").property("value"));
      d3.selectAll(".kommun").classed("active", false);
      kommun.classed("active", !isActive);
    })
    .merge(update)
      .transition()
      .duration(750)
      .attr("fill", d => {
        var val = d.properties.data[visningsVal];
        return val ? mapColorScale(val) : "#ccc";
      });
};

function zoomed() {
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
