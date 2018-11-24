function lineGraph(kommunData, visningsVal, kommunNummer) {


    console.log(linedata)    
    // 2. Use the margin convention practice 
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    //   , width = window.innerWidth - margin.left - margin.right // Use the window's width 
        , width = 600
        // , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
        , height = 400; // Use the window's height

    // The number of kommunDatapoints
    var n = 21;
    drawLine()

    function drawLine() {
        // console.log(kommunData)

        var uniqueLevart = findUniqueLevartnr(linedata);
        
        var xScale = d3.scaleLinear()
            .domain(d3.extent(kommunData, d => +d.Year)) //2015-2017
            .range([margin.left, width - margin.right]); //50 - 550

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(linedata, d=> d[visningsVal])]) // input 
            .range([height - margin.bottom, margin.top]);

        // var linefunc = createLines(xScale, yScale, linedata, uniqueLevart)
        var lineOne = createLines(xScale, lineEtt, uniqueLevart)
        var lineTwo = createLines(xScale, lineTva, uniqueLevart)

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
            .call(xAxis); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

            // console.log(lineData)
        // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
            .datum(linedata) // 10. Binds data to the line 
            .attr("class", "line-blue") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        svg.append("path")
            .datum(linedata) // 10. Binds data to the line 
            .attr("class", "line-red") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        // // 12. Appends a circle for each datapoint 
        // svg.selectAll(".dot")
        //     .data(linedata)
        // .enter().append("circle") // Uses the enter().append() method
        //     .attr("class", "dot") // Assign a class for styling
        //     .attr("cx", function(d) { return xScale(d.Year) })
        //     .attr("cy", function(d) { return yScale(d.KronorTotal) })
        //     .attr("r", 5);
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

function createLines(xScale, linedata, unique){
    // var lines = []
    // for (let i = 0; i < unique.length; i++) {
        var line = d3.line()
        .x(function(d) { return xScale(d.Year); })
        .y(function(d) { return yScale(d.KronorTotal); })
        // lines.push(line)
    // }
    // return lines
    return line
}

// function createLines(xScale, yScale, linedata, unique){
//     var lines = []
//     for (let i = 0; i < unique.length; i++) {
//         var line = d3.line()
//         .x(function(d) { return xScale(d.Year); })
//         .y(function(d) { return yScale(d.KronorTotal); })
//         lines.push(line)
//     }
//     return lines
// }