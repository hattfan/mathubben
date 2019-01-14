function lineGraph(graphData, visningsVal, lineTyp) {
    
    d3.select("#line").selectAll("*").remove();
    kommunNummer = '1415'

    var margin = {
        top: 20,
        right: 70,
        bottom: 100,
        left: 50
    },
    
    width = document.querySelector('.line-container').offsetWidth - margin.left - margin.right
    height = document.querySelector('.line-container').offsetHeight - margin.top - margin.bottom;
    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#line")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var lineArrData = [lineDataOne, lineDataTwo]
    var years = ['2015', '2016', '2017']
    var className = ['red', 'blue','DarkOrange', 'purple', 'green']
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


    // if(lineTyp === 'laen'){

    // }
    //! Get the data - Format data to create lines
    var finaldata = [], extremeValuesData =[]
    uniqueLevarts.forEach(levart => {
        var levartData = []
        years.forEach(year => {
            var filtredRow = graphData.filter(row => row.LevArtNr === levart && row.KommunNummer === kommunNummer && row.Year === year)
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
    
    //Scale the range of the data
    x.domain(d3.extent(finaldata[0], function (d) {
        return +d.Year;
    }));
    y.domain([0, d3.max(extremeValuesData, function (d) {
        return Math.max(d[visningsVal]);
    })]);
    // debugger

    for (let i = 0; i < finaldata.length; i++) {
        svg.append("path")
        .data([finaldata[i]])
        .attr("class", `line ${className[i]}`)
        .attr("d", valueline);            

        svg.selectAll(className)
            .data(finaldata[i])
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", `dot${className[i]}`) // Assign a class for styling
        .attr("cx", function(d) { return x(d.Year) })
        .attr("cy", function(d) { return y(d[visningsVal]) })
        .attr("r", 5);
    }

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