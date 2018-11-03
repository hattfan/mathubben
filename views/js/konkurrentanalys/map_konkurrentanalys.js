function createMap(width, height) {
  var width = 500,
    height = 700;

  d3.select("#map")
    .attr("width", width)
    .attr("height", height)

}

function drawMap(geoData, laenMapData, kommunData, laenData, year, dataType, calculationType) {
  var width = 500,
    height = 700,
    centered;
  active = d3.select(null);

  const searchboxesWithValues = document.querySelectorAll('[data-id]');
  const searchboxValues = [];
  searchboxesWithValues.forEach(searchboxWithValues => {
    searchboxValues.push(searchboxWithValues.dataset.id);
  })
  var visningsVal = dataType + calculationType
  var map = d3.select('#map')

  
  map.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

  var laenGeoData = topojson.feature(laenMapData, laenMapData.objects.SWE_adm1).features;

  var projection = d3.geoMercator()
    .scale(1100)
    .translate([-100, 1900])
  //If mobile
  // .scale(4200)
  // .translate([-1000, 5400])

  var path = d3.geoPath()
    .projection(projection);

  //geoData för att matcha kommunData till varje kommun
  geoData.forEach(d => {
    var kommun = kommunData.filter(row => row.KommunNummer === d.properties.KNKOD);
    // Om kommun har värde
    if (kommun.length !== 0) {
      var compare = createTempObject()
      // Jämför värdena för att bestämma vilken som är störst
      kommun.forEach(kommunAlt => {
        if (+kommunAlt.Year === year) {
          if (kommunAlt[visningsVal] > compare[visningsVal]) {
            compare = { ...kommunAlt}
          }
          kommun = { ...compare
          }
        } else {
          kommun = []
        }
      })
    }
    // Lägg in properties i geoData datan
    d.properties.data = kommun;
    // console.log(d.properties.data)

  });

  laenGeoData.forEach(d => {
    var laen = laenData.filter(row => row.LaenKod === d.properties.laenskod);
      // row.LaenKod === d.properties.laenskod?console.log('ja'):console.log(row.LaenKod,d.properties.laenskod)});
    // Om laen har värde
    if (laen.length !== 0) {
      var compare = createTempObject()
      // Jämför värdena för att bestämma vilken som är störst
      laen.forEach(laenAlt => {
        console.log(laenAlt.KronorTotal)
        if (+laenAlt.Year === year) {
          if (laenAlt[visningsVal] > compare[visningsVal]) {
            compare = { ...laenAlt}
          }
          laen = { ...compare
          }
        } else {
          laen = []
        }
      })
    }
    // Lägg in properties i geoData datan
    d.properties.data = laen;
    console.log(laen)
  });

  var colorDomainAndRange = createColorScale()
  var mapColorScale = d3.scaleOrdinal()
    .domain(colorDomainAndRange.domain)
    .range(colorDomainAndRange.colors);

  var g = map.append("g")
    .style("stroke-width", "1.5px");

  var update = g.selectAll(".kommun")
    .data(geoData);

  //Update för kommunnivå
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

    //Update för laen - 
    // TODO ändra från state
    var update = g.selectAll(".state")
      .data(laenGeoData);
    update
      .enter()
      .append("path")
      .classed("states", true)
      .attr("d", path)
      .on("click", clicked)
      .merge(update)
      .transition()
      .duration(750)
      .attr("fill", d => {
        var val = d.properties.data[visningsVal];
        return val ? mapColorScale(val) : "#ccc";
      });

  // g.append("g")
  //   .attr("id", "states")
  //   .selectAll("path")
  //   .data(laenGeoData)
  //   .enter().append("path")
  //   .attr("d", path)
  //   .attr("class", "state")
  //   .on("click", clicked);

  g.append("path")
    .datum(topojson.mesh(laenMapData, laenMapData.objects.SWE_adm1, function (a, b) {
      return a !== b;
    }))
    .attr("id", "state-borders")
    .attr("d", path);


  function clicked(d) {
    var x, y, k;
    d3.selectAll(".states").style("display", "inline");
    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 3;
      centered = d;
      this.style.display = "none"
      d3.selectAll(".kommun").style("display", "inline");
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
      d3.selectAll(".states").style("display", "inline");
      d3.selectAll(".kommun").style("display", "none");
    }

    g.selectAll("path")
      .classed("vald", centered && function (d) {
        return d === centered;
      })

    g.transition()
      .duration(1000)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y +
        ")")
      .style("stroke-width", 1.5 / k + "px");
  }

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
        domainValues.colors = ["#0000FF", "#FF0000"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1]];
        break;
      case 3:
        domainValues.colors = ["#0000FF", "#FF0000", "#FF8C00"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2]];
        break;
      case 4:
        domainValues.colors = ["#0000FF", "#FF0000", "#FF8C00", "#800080"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2], searchboxValues[3]];
        break;
      case 5:
        domainValues.colors = ["#0000FF", "#FF0000", "#FF8C00", "#800080", "#008000"];
        domainValues.domain = [searchboxValues[0], searchboxValues[1], searchboxValues[2], searchboxValues[3], searchboxValues[4]];
        break;
      default:
        break;
    }
    return domainValues;
  }
};