function createMap(width, height) {
  d3.select("#map")
    .attr("width", width)
    .attr("height", height)
    .append("text")
    .attr("x", width / 2)
    .attr("y", "1em")
    .attr("font-size", "1.5em")
    .style("text-anchor", "middle")
    .classed("map-title", true);
}

function drawMap(geoData, kommunData, year, dataType, calculationType, produktgrupp) {
  // console.log(kommunData)
  var visningsVal = dataType + calculationType
  // console.log(visningsVal)
  var map = d3.select('#map')
  var projection = d3.geoMercator()
    .scale(4800)
    .translate([-700, 6300])

  var path = d3.geoPath()
    .projection(projection);
  
  // geoData.forEach(d => 
  //   // kommunData.forEach(row => console.log(row.KommunNummer, d.properties.KNKOD))
  // )

  
  geoData.forEach(d => {
    var kommuner = kommunData.filter(row => row.KommunNummer === d.properties.KNKOD);
    var name = '';
    //Koppla ihop geoData med kommunData mha kommunkod
    if (kommuner.length > 0) name = kommuner[0].kommun;
    // d.properties.data = kommuner[0] != undefined ? d.properties.data = kommuner[0]['Mängd'] : d.properties.data = 0;
    d.properties.data = kommuner.find(kommun => +kommun.Year === year) || { kommun: name };
    // console.log(d.properties)
  });

  var colors = ["#7caeff", "#ff0400"];

  var domain = [0, d3.max(kommunData, d => d[visningsVal])];

  var mapColorScale = d3.scaleLinear()
    .domain(domain)
    .range(colors);

  var update = map.selectAll(".kommun")
    .data(geoData);

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

      // console.log(kommun.data()[0].properties['KNKOD'])
      drawBar(kommunData, kommunKod, year, visningsVal, produktgrupp)
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


  d3.select(".map-title")
    .text(produktgrupp);
};