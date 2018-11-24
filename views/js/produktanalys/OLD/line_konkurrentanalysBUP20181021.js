function lineGraph(kommunData, visningsVal, kommunNummer) {
    kommunNummer = '1415'
    // 2. Use the margin convention practice 
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    drawLine()

    function drawLine() {
        // var lineArrData = [lineDataOne, lineDataTwo]
        var years = ['2015', '2016', '2017']
        var className = ['red', 'blue','DarkOrange', 'purple', 'green']
        var uniqueLevarts = findUniqueLevartnr(kommunData);
        var finaldata = [], extremeValuesData =[]
        
        //Format data to create lines
        uniqueLevarts.forEach(levart => {
            var levartData = []
            years.forEach(year => {
                var filtredRow = kommunData.filter(row => row.LevArtNr === levart && row.KommunNummer === kommunNummer && row.Year === year)
                if(filtredRow === undefined || filtredRow.length == 0){
                    var emptyLine = createLineObject(year,levart, kommunNummer)
                    levartData.push(emptyLine)
                }else{
                    levartData.push(filtredRow[0])
                    extremeValuesData.push(filtredRow[0])
                }
            })
            finaldata.push(levartData)
        })

        var xScale = d3.scaleLinear()
            .domain(d3.extent(kommunData, d => +d.Year)) //2015-2017
            .range([0, width]); //50 - 550

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(extremeValuesData, d=> d[visningsVal])]) // input 
            .range([height, margin.top]);

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select("#line")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 3. Call the x axis in a group tag
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format(".0f"))
            .tickValues([2015,2016,2017])

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
        // console.log(linedata, finaldata)
        console.log(extremeValuesData)
        for (let i = 0; i < finaldata.length; i++) {
            // console.log(finaldata[i])
            createLines(xScale, extremeValuesData, finaldata[i], height, margin, visningsVal, className[i])
        }
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

function createLines(xScale, extremeValuesData, linedata, height, margin, visningsVal, className){
    var y = d3.scaleLinear()
    .domain([0, d3.max(linedata, d=> d[visningsVal])]) // input 
    .range([height - margin.bottom, margin.top]);

    var line = d3.line()
        .x(function(d) { return xScale(d.Year); })
        .y(function(d) { return y(d.KronorTotal); })
    debugger
    var svg = d3.select('#line')
    
    svg.append("path")
        .data([linedata]) // 10. Binds data to the line 
        .attr("class", `line ${className}`) // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator
        
    svg.selectAll(className)
        .data(linedata)
    .enter().append("circle") // Uses the enter().append() method
        .attr("class", `dot${className}`) // Assign a class for styling
        .attr("cx", function(d) { return xScale(d.Year) })
        .attr("cy", function(d) { return y(d.KronorTotal) })
        .attr("r", 5);
}

function createLineObject(year, levart, kommunNummer){
    var emptyObject = {
        Year: year,
        KommunNummer: kommunNummer,
        LevArtNr: levart,
        KronorPerCapita: 0,
        KronorTotal: 0,
        MängdPerCapita: 0,
        MängdTotal: 0,
        }
    return emptyObject
}