var borders = false,
    background = false,
    mapPosition = 'sverige',
    lookupKod = '',
    kommunMapExists = false,
    seedValues = false;

var counter = 0;

// function updateMapSize(){
//   var width = document.querySelector('.map-container').offsetWidth-60;
//   var height = 600;

//   var map =d3.select("#map");
//   map
//     .attr("width", width)
//     .attr("height", height)
// }

function createMap() {
    var map = d3.select('#map')
    var width = document.querySelector('.map-container').offsetWidth;
    // var height = document.querySelector('.map-container').offsetHeight;
    var height = 555;

    map
        .attr("width", width)
        .attr("height", height)
    map.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)

    var g = map.append("g")
        .style("stroke-width", "1.5px");

    var map = d3.select('#kommun-map')
    var width = document.querySelector('.kommun-container').offsetWidth;
    // var height = document.querySelector('.map-container').offsetHeight;
    var height = 255;

    map
        .attr("width", width)
        .attr("height", height)
}

function drawMap(geoData, laenMapData, kommunData, laenData, sverigeData, year, dataType, calculationType, colors, visningsVal, clickChoice) {
    console.log(sverigeData, laenData, kommunData);

    width = document.querySelector('.map-container').offsetWidth - 60;
    height = 600;

    const searchboxValues = [];
    var triggerButtons = document.querySelectorAll('.trigger-button');
    triggerButtons.forEach(triggerButton => {
        if (triggerButton.value) {
            searchboxValues.push(triggerButton.value)
        }
    })

    var map = d3.select('#map')
    // debugger;
    var laenGeoData = topojson.feature(laenMapData, laenMapData.objects.SWE_adm1).features;

    var projection = d3.geoMercator()
        .scale(1000)
        .translate([-100, 1700])
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
        var kommun = kommunData.filter(row => row.KommunNummer.toString() === d.properties.KNKOD);
        // Om kommun har värde
        if (kommun.length !== 0) {
            var compare = createTempObject()
            // Jämför värdena för att bestämma vilken som är störst
            kommun.forEach(kommunAlt => {
                if (+kommunAlt.Year === year) {
                    if (kommunAlt[visningsVal] > compare[visningsVal]) {
                        compare = { ...kommunAlt }
                    }
                    kommun = {
                        ...compare
                    }
                }
            })
        }
        // Lägg in properties i geoData datan - här skall läggas in den som är störst
        d.properties.data = kommun;
    });

    // console.log(geoData);

    clickChoice === 'yearSlider' || clickChoice === 'dataType' || clickChoice === 'calculationType' ? kommunUpdate() : null


    // !Laendata !!!!!!!!!!!!!!!!!!!!!!
    laenGeoData.forEach(d => {
        var laen = laenData.filter(row => row.LaenKod.toString() === d.properties.laenskod);
        // Om laen har värde
        if (laen.length !== 0) {
            var compare = createTempObject()
            // Jämför värdena för att bestämma vilken som är störst
            laen.forEach(laenAlt => {
                if (+laenAlt.Year === year) {
                    if (laenAlt[visningsVal] > compare[visningsVal]) {
                        compare = { ...laenAlt }
                    }
                    laen = {
                        ...compare
                    }
                }
            })
        }
        // Lägg in properties i geoData datan
        d.properties.data = laen;
    });

    var colorDomainAndRange = createColorScale(seedValues)
    var mapColorScale = d3.scaleOrdinal()
        .domain(colorDomainAndRange.domain)
        .range(colorDomainAndRange.colors);

    lineFunc(mapPosition)

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    // !Updates för grafiken !!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

    var g = map.selectAll('g')

    // var update = g.selectAll(".kommun")
    //     .data(geoData);

    // // console.log(update.exit());
    // update.exit().remove()

    // //Update för kommunnivå
    // update
    //     .enter()
    //     .append("path")
    //     .classed("kommun", true)
    //     .attr("d", path)
    //     .on("click", kommunClick)
    //     .merge(update)
    //     // .transition()
    //     // .duration(750)
    //     .attr("fill", d => {
    //         var val = d.properties.data.LevArtNr;
    //         return val ? mapColorScale(val) : "#ccc";
    //     });

    //Update för laen - 
    // TODO ändra från state
    var update = g.selectAll(".states")
        .data(laenGeoData);
    debugger;

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


    if (!borders) {
        d3.select('#map').selectAll('g').append("path")
            .datum(topojson.mesh(laenMapData, laenMapData.objects.SWE_adm1, function (a, b) {
                return a !== b;
            }))
            .attr("id", "state-borders")
            .attr("d", path);
        borders = true;
    }

    if (!background) {
        d3.selectAll(".background")
            .on("click", clicked);
        background = true;
    }

    function kommunUpdate() {

        // if(d === undefined) return
        if (lookupKod.length > 2) {
            var laensKod = lookupKod.substring(0, 2);
        } else {
            var laensKod = lookupKod;
        }

        d3.select("#kommun-map").selectAll("*").remove();
        var map = d3.select('#kommun-map')
        var width = document.querySelector('.kommun-container').offsetWidth;
        var height = 600;

        map
            .attr("width", width)
            .attr("height", height)

        var g = map.append("g")
        var activeLaen = geoData.filter(row => {
            return row.properties.KNKOD.substring(0, 2) === laensKod;
        })
        var projection = projectionCalculation(laensKod)

        var kommunPath = d3.geoPath()
            .projection(projection);

        var colorDomainAndRange = createColorScale(seedValues)
        var mapColorScale = d3.scaleOrdinal()
            .domain(colorDomainAndRange.domain)
            .range(colorDomainAndRange.colors);

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        // !Updates för kommun-map !!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

        var map = d3.select('#kommun-map');

        var g = map.selectAll('g')

        var update = g.selectAll(".kommun-map")
            .data(activeLaen);

        update.remove()

        //Update för kommunnivå
        update
            .enter()
            .append("path")
            .classed("kommun-map", true)
            .attr("d", kommunPath)
            .on("click", kommunClick)
            .merge(update)
            // .transition()
            // .duration(750)
            .attr("fill", d => {
                var val = d.properties.data.LevArtNr;
                return val ? mapColorScale(val) : "#ccc";
            });

        // kommunMapExists = true;
    }


    function lineFunc(graphType) {
        debugger
        if (graphType === 'sverige') {
            lineGraph(sverigeData, visningsVal, mapPosition, lookupKod, colors, year, mapColorScale)
        } else if (graphType === 'laen') {
            lineGraph(laenData, visningsVal, mapPosition, lookupKod, colors, year, mapColorScale)
        } else if (graphType === 'kommun') {
            lineGraph(kommunData, visningsVal, mapPosition, lookupKod, colors, year, mapColorScale)
        }
    }


    function kommunClick(d) {
        debugger
        document.querySelector("#line-chart-name").innerText = document.querySelector("#kommun-chart-name").innerText = document.querySelector("#pie-chart-name").innerText = d.properties.KNNAMN;
        mapPosition = 'kommun';
        lookupKod = d.properties.KNKOD;
        lineFunc(mapPosition)
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

    function clicked(d) {
        if (d === undefined) {
            // var mapPosition = 'sverige';
            // var lookupKod = '';
            // drawMap(geoData, laenMapData, kommunData, laenData, sverigeData, year, dataType, calculationType, colors)
            return
        }

        d3.select("#kommun-map").selectAll("*").remove();
        document.querySelector("#line-chart-name").innerText = document.querySelector("#kommun-chart-name").innerText = document.querySelector("#pie-chart-name").innerText = d.properties.NAME_1;
        lookupKod = d.properties.laenskod;
        mapPosition = 'laen';
        lineFunc(mapPosition);

        var map = d3.select('#kommun-map')
        var width = document.querySelector('.kommun-container').offsetWidth;
        // var height = document.querySelector('.map-container').offsetHeight;
        var height = 600;

        map
            .attr("width", width)
            .attr("height", height)

        var g = map.append("g")

        var activeLaen = geoData.filter(row => {
            return row.properties.KNKOD.substring(0, 2) === d.properties.laenskod;
        })

        var projection = projectionCalculation(d.properties.laenskod)

        var kommunPath = d3.geoPath()
            .projection(projection);

        var colorDomainAndRange = createColorScale(seedValues)
        var mapColorScale = d3.scaleOrdinal()
            .domain(colorDomainAndRange.domain)
            .range(colorDomainAndRange.colors);

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        // !Updates för kommun-map !!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

        var map = d3.select('#kommun-map');

        var g = map.selectAll('g')

        var update = g.selectAll(".kommun-map")
            .data(activeLaen);

        update.remove()

        update
            .enter()
            .append("path")
            .classed("kommun-map", true)
            .attr("d", kommunPath)
            .on("click", kommunClick)
            .merge(update)
            // .transition()
            // .duration(750)
            .attr("fill", d => {
                var val = d.properties.data.LevArtNr;
                return val ? mapColorScale(val) : "#ccc";
            });

        kommunMapExists = true;
    }

    function createColorScale(seed) {
        if (seed) {
            switch (searchboxValues.length) {
                case 2:
                    domainValues.colors = ["#0000FF", "#FF0000"];
                    domainValues.domain = ['MENIGO FOG - MENY545', 'Felix FriFrån - 8859'];
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
