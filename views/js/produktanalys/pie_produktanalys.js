function createPie() {
    var height = 255;
    var width = document.querySelector('.pie-container').offsetWidth;
    
    var pie = d3.select("#pie")
        .attr("width", width)
        .attr("height", height);

    pie.append("g")
        .attr("transform", "translate(" + width / 2 + ", " + (height / 2) + ")")
        .classed("chart", true);

}

function drawPie(graphData, visningsVal, lineTyp, lookupKod, colors, currentYear, mapColorScale) {
    var pie = d3.select("#pie");
    var arcs = d3.pie()
        .value(d => d[visningsVal]);

    var path = d3.arc()
        .outerRadius(+pie.attr("height") / 2 - 50)
        .innerRadius(0);

    var yearData = graphData.formattedGraphData.flat().filter(row => {
            return row.Year === currentYear.toString()
    })

    var update = pie
        .select(".chart")
        .selectAll(".arc")
        .data(arcs(yearData));
    
    update
        .exit()
        .remove();

    update
        .enter()
        .append("path")
        .classed("arc", true)
        .attr("stroke", "#dff1ff")
        .attr("stroke-width", "0.25px")
    .merge(update)
        .attr("fill", d => {
            var val = d.data.LevArtNr;
            return val ? mapColorScale(val) : "#ccc";
        })
        .attr("d", path);
}  