function createBar(width, height) {
  var bar = d3.select("#bar")
    .attr("width", width)
    .attr("height", height);
  
  bar.append("g")
    .classed("x-axis", true);

  bar.append("g")
    .classed("y-axis", true);

  //!Label y-axis
  bar.append("text")
    .style("font-size", "1em").attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .classed("y-axis-label", true);
  //!Label x-axis
  bar.append("text")
    .attr("x", width / 2)
    .attr("y", "1em")
    .attr("font-size", "1.5em")
    .style("text-anchor", "middle")
    .classed("bar-title", true);
}

function highlightBars(year) {
  d3.select("#bar")
    .selectAll("rect")
      .attr("fill", d => {
        return +d.Year === year ? "#16a085" : "#1abc9c"});
}

function drawBar(data, kommunKod, visningsVal) {
  console.log(data ,kommunKod, visningsVal)
  barchartExists = true
  barText.innerHTML = ``
  var bar = d3.select("#bar");

  var width = +bar.attr("width");
  var height = +bar.attr("height");

  var padding = {
    top: 30,
    right: width/5,
    bottom: 30,
    left: width/3.5
  };
  var barPadding = 1;

  //!Framfiltrering och sortering av "bars"
  var kommunData = data.filter(d => d.KommunNummer === kommunKod)
    .sort((a, b) => a.Year - b.Year);

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => +d.Year))
    .range([padding.left, width - padding.right]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(kommunData, d => d[visningsVal])])
    .range([height - padding.bottom, padding.top]);

  var barWidth = (xScale(xScale.domain()[0] + 1) - xScale.range()[0]); 
  var xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format(".0f"))
    .tickValues([2015,2016,2017])

  d3.select(".x-axis")
    .attr("transform", "translate(0, " + (height - padding.bottom) + ")")
    .call(xAxis);

  var yAxis = d3.axisLeft(yScale);

  d3.select(".y-axis")
    .attr("transform", "translate(" + (padding.left - barWidth / 2) + ",0)")
    .transition()
    .duration(1000)
    .call(yAxis);

  // var axisLabel = visningsVal;
  // d3.select(".y-axis-label")
  //   .text(axisLabel);

  var t = d3.transition()
    .duration(1000)
    .ease(d3.easeBounceOut);

  var update = bar
    .selectAll(".bar")
    .data(kommunData);

  update
    .exit()
    .transition(t)
    .delay((d, i, nodes) => (nodes.length - i - 1) * 100)
    .attr("y", height - padding.bottom)
    .attr("height", 0)
    .remove();

  update
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("y", height - padding.bottom)
    .attr("height", 0)
    .merge(update)

    .attr("x", d => {
      return (xScale(d.Year) + xScale(d.Year - 1)) / 2
    })
    .attr("width", (barWidth - barPadding))
    .transition(t)
    .delay((d, i) => i * 100)
    .attr("y", d => yScale(d[visningsVal]))
    .attr("height", d => height - padding.bottom - yScale(d[visningsVal]));
}