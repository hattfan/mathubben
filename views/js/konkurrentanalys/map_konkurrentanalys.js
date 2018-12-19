var borders = false, background = false;


// function updateMapSize(){
//   var width = document.querySelector('.map-container').offsetWidth-60;
//   // var height = document.querySelector('.map-container').offsetHeight;
//   var height = 600;

//   var map =d3.select("#map");
//   map
//     .attr("width", width)
//     .attr("height", height)
// }

function createMap() {
  var map = d3.select('#map')
  var width = document.querySelector('.map-container').offsetWidth-60;
  // var height = document.querySelector('.map-container').offsetHeight;
  var height = 600;

  map
    .attr("width", width)
    .attr("height", height)
  console.log(width, height)
  map.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
  
  var g = map.append("g")
    .style("stroke-width", "1.5px");
}

function drawMap(geoData, laenMapData, kommunData, laenData, sverigeData, year, dataType, calculationType) {
  // d3.select("#map").selectAll("*").remove();
  // createMap();
  console.log(sverigeData);
  width = document.querySelector('.map-container').offsetWidth-60;
  height = 600;
  // var width = 500,
  //   height = 700,
    var centered,
    laenClicked = false;
  active = d3.select(null);

  // const searchboxesWithValues = document.querySelectorAll('[data-id]');
  // const searchboxValues = [];
  // searchboxesWithValues.forEach(searchboxWithValues => {
  //   searchboxValues.push(searchboxWithValues.dataset.id);
  // })
  const searchboxValues = [];
  var triggerButtons = document.querySelectorAll('.trigger-button');
  triggerButtons.forEach(triggerButton => {
    if(triggerButton.value){
      searchboxValues.push(triggerButton.value)
    }
  })

  
  var visningsVal = dataType + calculationType
  var map = d3.select('#map')

  var laenGeoData = topojson.feature(laenMapData, laenMapData.objects.SWE_adm1).features;

  var projection = d3.geoMercator()
    .scale(1050)
    .translate([0, 1800])
  //If mobile
  // .scale(4200)
  // .translate([-1000, 5400])

  var path = d3.geoPath()
    .projection(projection);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
  // !Data- meck !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

  // !Kommundata !!!!!!!!!!!!!!!!!!!!!!

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
        }
      })
    }
    // Lägg in properties i geoData datan - här skall läggas in den som är störst
    d.properties.data = kommun;
  });

  // !Laendata !!!!!!!!!!!!!!!!!!!!!!
  laenGeoData.forEach(d => {
    var laen = laenData.filter(row => row.LaenKod === d.properties.laenskod);
    
    // Om laen har värde
    if (laen.length !== 0) {
      var compare = createTempObject()
      // Jämför värdena för att bestämma vilken som är störst
      laen.forEach(laenAlt => {
        if (+laenAlt.Year === year) {
          if (laenAlt[visningsVal] > compare[visningsVal]) {
            compare = { ...laenAlt}
          }
          laen = { ...compare
          }
        }
      })
    }
    // Lägg in properties i geoData datan
    d.properties.data = laen;
  });

  var colorDomainAndRange = createColorScale()
  var mapColorScale = d3.scaleOrdinal()
    .domain(colorDomainAndRange.domain)
    .range(colorDomainAndRange.colors);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
  // !Updates för grafiken !!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

  var g = map.selectAll('g')
  
  var update = g.selectAll(".kommun")
    .data(geoData);

    // console.log(update.exit());
    update.exit().remove()

  //Update för kommunnivå
  update
    .enter()
    .append("path")
    .classed("kommun", true)
    .attr("d", path)
    .on("click", kommunClick)
    //   // debugger
    //   // var isActive = kommun.classed("active");
    //   // var kommunName = isActive ? "" : kommun.data()[0].properties['KNNAMN'];
    //   // var kommunKod = isActive ? "" : kommun.data()[0].properties['KNKOD'];

    //   // var visningsVal = dataType + calculationType
    //   // drawBar(kommunData, kommunKod, visningsVal)
    //   // highlightBars(+d3.select("#year").property("value"));
    //   // d3.selectAll(".kommun").classed("active", false);
    //   // kommun.classed("active", !isActive);
    // })
    .merge(update)
    // .transition()
    // .duration(750)
    .attr("fill", d => {
      var val = d.properties.data.LevArtNr;
      return val ? mapColorScale(val) : "#ccc";
    });

    //Update för laen - 
    // TODO ändra från state
    var update = g.selectAll(".states")
      .data(laenGeoData);
    
    update.exit().remove()

    update
      .enter()
      .append("path")
      .classed("states", true)
      .attr("d", path)
      .on("click", clicked)
      .merge(update)
      // .transition()
      // .duration(750)
      .attr("fill", d => {
        var val = d.properties.data.LevArtNr;
        return val ? mapColorScale(val) : "#ccc";
      });
  
  // !Färdigt grafiken !!!!!!!!!!!!!!!!!!!!!!
  // var update = g;
  // update.
  // enter()
  // .append("path")
  //   .datum(topojson.mesh(laenMapData, laenMapData.objects.SWE_adm1, function (a, b) {
  //     return a !== b;
  //   }))
  //   .attr("id", "state-borders")
  //   .attr("d", path)
  //   .merge(update);

    
  if(!borders){
    d3.select('#map').selectAll('g').append("path")
      .datum(topojson.mesh(laenMapData, laenMapData.objects.SWE_adm1, function (a, b) {
        return a !== b;
      }))
      .attr("id", "state-borders")
      .attr("d", path);
      // borders = true;
  } 
  
  if(!background){
    d3.selectAll(".background")
      .on("click", clicked);
    background = true;
  }

  function clicked(d) {
    var x, y, k;
    d3.selectAll(".states").style("display", "inline");
    if (d && centered !== d) {
      // Ändrar namn till Länets namn för line-charten
      document.querySelector("#line-chart-name").innerText = d.properties.NAME_1
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 3;
      centered = d;
      this.style.display = "none"
      d3.selectAll(".kommun").style("display", "inline");
      // d.properties.laenskod
      lineGraph(laenData, visningsVal, 'laen', d.properties.laenskod)

    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
      d3.selectAll(".states").style("display", "inline");
      d3.selectAll(".kommun").style("display", "none");
      d3.select("#line").selectAll("*").remove();
      document.querySelector("#line-chart-name").innerText = 'Sverige'
    }

    g.selectAll("path")
      .classed("vald", centered && function (d) {
        return d === centered;
      })

    // g.transition()
      // .duration(1000)
      g
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y +
        ")")
      .style("stroke-width", 1.5 / k + "px");
  }

  function kommunClick(d) {
    document.querySelector("#line-chart-name").innerText = d.properties.KNNAMN
    lineGraph(kommunData, visningsVal, 'kommun', d.properties.KNKOD)  
  }

  function createTempObject() {
    var temp = {
      'KronorPerCapita': 0,
      'KronorTotal': 0,
      'MangdPerCapita': 0,
      'MangdTotal': 0,
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
    // console.log(domainValues)
    return domainValues;
  }
};