function createLine(){
    var margin = {
        top: 20,
        right: 70,
        bottom: 100,
        left: 80
    },
    
    width = document.querySelector('.line-container').offsetWidth - margin.left - margin.right
    height = document.querySelector('.line-container').offsetHeight - margin.top - margin.bottom;
    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#line")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

}

function lineGraph(graphData, visningsVal, lineTyp, lookupKod, colors, currentYear, mapColorScale) {

    d3.select("#line").selectAll("*").remove();
    var margin = {
        top: 20,
        right: 30,
        bottom: 100,
        left: 60
    },
    
    width = document.querySelector('.line-container').offsetWidth - margin.left - margin.right
    height = document.querySelector('.line-container').offsetHeight - margin.top - margin.bottom;

    var svg = d3.select("#line")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    var years = ['2015', '2016', '2017']
    var className = ['blue','red','DarkOrange', 'purple', 'green']
    var uniqueLevarts = findUniqueLevartnr(graphData);

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function (d) {
            return x(d.Year);
        })
        .y(function (d) {
            return y(d[visningsVal]);
        });

    var t = d3.transition()
        .duration(1000)
        .ease(d3.easeBounceIn);

    var lineData = formatLineData(graphData, lineTyp, lookupKod, years, uniqueLevarts)
    
    drawPie(lineData, visningsVal, lineTyp, lookupKod, colors, currentYear, mapColorScale)

    if(lineData.extremeValuesData.length === 0){
        d3.select("#line").selectAll("*").remove();
        return
    } 

    //Scale the range of the data
    x.domain(d3.extent(lineData.formattedGraphData[0], function (d) {
        return +d.Year;
    }));
    y.domain([0, d3.max(lineData.extremeValuesData, function (d) {
        return Math.max(d[visningsVal]);
    })]);

    var xAxis = d3.axisBottom(x)
    .tickFormat(d3.format(".0f"))
    .tickValues([2015,2016,2017])

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(y)
            .ticks(5)
    }

    // add the X gridlines
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )

    debugger;   
    //Add data for each of the lines
    for (let i = 0; i < lineData.formattedGraphData.length; i++) {
        svg.append("path")
        .data([lineData.formattedGraphData[i]])
        .attr("class", `line ${colors[lineData.formattedGraphData[i][0]['LevArtNr']]}`)
        .attr("d", valueline);
        svg.selectAll(className)
            .data(lineData.formattedGraphData[i])
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", `dot dot${colors[lineData.formattedGraphData[i][0]['LevArtNr']]}`) // Assign a class for styling
        .attr("cx", function(d) { return x(d.Year) })
        .attr("cy", function(d) { return y(d[visningsVal]) })
        .attr("r", 5);
    }
}    

function findUniqueLevartnr(linedata){
    var flags = [], output = [], l = linedata.length, i;
    for( i=0; i<l; i++) {
        if( flags[linedata[i].LevArtNr]) continue;
        flags[linedata[i].LevArtNr] = true;
        output.push(linedata[i].LevArtNr);
    }
    return output;
}

function createKommunLineObject(year, levart, kommunNummer){
    var emptyObject = {
        Year: year,
        KommunNummer: kommunNummer,
        LevArtNr: levart,
        KronorPerCapita: 0,
        KronorTotal: 0,
        MangdPerCapita: 0,
        MangdTotal: 0,
        }
    return emptyObject
}

function createLaenLineObject(year, levart, laenKod){
    var emptyObject = {
        Year: year,
        LaenKod: laenKod,
        LevArtNr: levart,
        KronorPerCapita: 0,
        KronorTotal: 0,
        MangdPerCapita: 0,
        MangdTotal: 0,
        }
    return emptyObject
}

function createSwedenLineObject(year, levart){
    var emptyObject = {
        Year: year,
        LevArtNr: levart,
        KronorPerCapita: 0,
        KronorTotal: 0,
        MangdPerCapita: 0,
        MangdTotal: 0,
        }
    return emptyObject
}

function formatLineData(graphData, lineTyp, lookupKod, years, uniqueLevarts){

    if(lineTyp === 'sverige'){
        var formattedGraphData = [], extremeValuesData =[]
            uniqueLevarts.forEach(levart => {
                var levartData = []
                years.forEach(year => {
                    var filtredRow = graphData.filter(row => row.LevArtNr === levart  && row.Year.toString() === year)
                    if(filtredRow === undefined || filtredRow.length == 0){
                        var emptyLine = createSwedenLineObject(year,levart)
                        levartData.push(emptyLine)
                    }else{
                        levartData.push(filtredRow[0])
                        extremeValuesData.push(filtredRow[0])
                    }
                })
                formattedGraphData.push(levartData)
            }) 
            var returnableObject = {
                formattedGraphData: formattedGraphData,
                extremeValuesData: extremeValuesData
            }
        return returnableObject; 
    }
    if(lineTyp === 'laen'){
        var formattedGraphData = [], extremeValuesData =[]
            uniqueLevarts.forEach(levart => {
                var levartData = []
                years.forEach(year => {
                    var filtredRow = graphData.filter(row => row.LevArtNr === levart && row.LaenKod.toString() === lookupKod && row.Year.toString() === year)
                    if(filtredRow === undefined || filtredRow.length == 0){
                        var emptyLine = createLaenLineObject(year,levart, lookupKod)
                        levartData.push(emptyLine)
                    }else{
                        levartData.push(filtredRow[0])
                        extremeValuesData.push(filtredRow[0])
                    }
                })
                formattedGraphData.push(levartData)
            }) 
            var returnableObject = {
                formattedGraphData: formattedGraphData,
                extremeValuesData: extremeValuesData
            }
        return returnableObject; 
    }
    if (lineTyp === 'kommun') {
        var formattedGraphData = [], extremeValuesData =[]
        uniqueLevarts.forEach(levart => {
            var levartData = []
            years.forEach(year => {
                var filtredRow = graphData.filter(row => row.LevArtNr === levart && row.KommunNummer.toString() === lookupKod && row.Year.toString() === year)
                if(filtredRow === undefined || filtredRow.length == 0){
                    var emptyLine = createKommunLineObject(year,levart, lookupKod)
                    levartData.push(emptyLine)
                }else{
                    levartData.push(filtredRow[0])
                    extremeValuesData.push(filtredRow[0])
                }
            })
            formattedGraphData.push(levartData)
        })
        var returnableObject = {
            formattedGraphData: formattedGraphData,
            extremeValuesData: extremeValuesData
        }
        return returnableObject;
    }
}