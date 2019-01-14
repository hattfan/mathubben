function createMap(width, height) {
  console.log(width,height)
  d3.select("#map")
    .attr("width", width)
    .attr("height", height * 2 + 50)
}

function drawMap(geoData, kommunData, year, dataType, calculationType) {
  const searchboxesWithValues = document.querySelectorAll('[data-id]');
    const searchboxValues = [];
    searchboxesWithValues.forEach(searchboxWithValues => {
        searchboxValues.push(searchboxWithValues.dataset.id);
    })
  var visningsVal = dataType + calculationType
  var map = d3.select('#map')

  var projection = d3.geoMercator()
    .scale(1100)
    .translate([-100, 1900])
  // .scale(4300)    // .translate([-700, 6300])
  //If mobile
  // .scale(4200)
  // .translate([-1000, 5400])

  var path = d3.geoPath()
    .projection(projection);

  geoData.forEach(d => {
    var kommun = kommunData.filter(row => row.KommunNummer === d.properties.KNKOD);

    if (kommun.length !== 0) {
      var compare = createTempObject()
      kommun.forEach(kommunAlt => {
        //
        if (+kommunAlt.Year === year) {
          if (kommunAlt[visningsVal] > compare[visningsVal]) {
            compare = { ...kommunAlt}
          }
          kommun = { ...compare}
        } else {
          kommun = []
        }
      })
    }
    d.properties.data = kommun;
  });

  var colorDomainAndRange = createColorScale()
  var mapColorScale = d3.scaleOrdinal()
    .domain(colorDomainAndRange.domain)
    .range(colorDomainAndRange.colors);
  
  var addG = map.append("g")

  var update = addG.selectAll(".kommun")
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

      var visningsVal = dataType + calculationType
      drawBar(kommunData, kommunKod, visningsVal)
      // highlightBars(+d3.select("#year").property("value"));
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
    
  function createTempObject() {
    var temp = {
      'KronorPerCapita': 0,
      'KronorTotal': 0,
      'MängdPerCapita': 0,
      'MängdTotal': 0,
    };
    return temp
  }

  function createColorScale() {
    //blue red darkorange purple green
    var domainValues = {};
    switch (searchboxValues.length) {
      case 2:
        domainValues.colors = ["#0000FF","#FF0000"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1]];
        break;
      case 3:
        domainValues.colors = ["#0000FF","#FF0000", "#FF8C00"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2]];
        break;
      case 4:
        domainValues.colors = ["#0000FF","#FF0000", "#FF8C00", "#800080"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2], searchboxValues[3]];
        break;
      case 5:
        domainValues.colors = ["#0000FF","#FF0000", "#FF8C00", "#800080", "#008000"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2], searchboxValues[3],searchboxValues[4]];
        break;
      default:
        break;
    }
    return domainValues;
  }
};