function createMap(width, height) {
	d3.select("#map")
		.attr("width", width)
		.attr("height", height)
		.append("text")
		.attr("x", width / 2)
		.attr("y", "1em")
		.attr("font-size", "1.5em")
		.style("text-anchor", "middle")
		.classed("map-title", true);
}

function drawMap(geoData, kommunData, dataType) {
	//Gör om Kommunkod till string för att matcha i geoData
	console.log(kommunData)
	// for (let i = 0; i < kommunData.length; i++) {
	// 	kommunData[i].Kommunkod = kommunData[i].Kommunkod.toString()
	// }

	geoData.forEach(d => {
		var kommuner = kommunData.filter(row => row.Kommunkod === d.properties.KNKOD);
		var name = '';
		//Koppla ihop geoData med kommunData mha kommunkod
		if (kommuner.length > 0) name = kommuner[0].kommun;
		d.properties.data = kommuner[0] != undefined ? d.properties.data = kommuner[0].Value : d.properties.data = 0;

	});

	// var colors = ["#f1c40f", "#e67e22", "#e74c3c", "#c0392b"];
	// var colors = ["#f1c40f", "#e67e22", "#e74c3c", "#c0392b"];
	// var domain = [0, 500, 1000, 1500];
	
	//domänen, måste ändras till ett icke-statiskt värde
	var domain = [0, d3.max(kommunData, d => d.Value)];
	var colors = ["#7caeff", "#ff0400"];


	var mapColorScale = d3.scaleLinear()
		.domain(domain)
		.range(colors);

	var map = d3.select('#map')

	var width = 960;
	var height = 800;

	var projection = d3.geoMercator()
		.scale(1300)
		.translate([width / 100, 600 / 0.27])

	var path = d3.geoPath()
		.projection(projection);

	// d3.select("svg")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.selectAll(".kommun")
	// 	.data(geoData)
	// 	.enter()
	// 	.append("path")
	// 	.classed("kommun", true)
	// 	.attr("d", path);

	var update = map.selectAll(".kommun")
		.data(geoData);

	update
		.enter()
		.append("path")
		.classed("kommun", true)
		.attr("d", path)
		.on("click", function() {
			var kommun = d3.select(this);
			var isActive = kommun.classed("active");
			var kommunName = isActive ? "" : kommun.data()[0].properties['KNNAMN'];
			console.log(kommun.data()[0].properties['KNKOD'])
			drawBar(kommunData, kommunName)
			d3.selectAll(".kommun").classed("active", false);
			kommun.classed("active", !isActive);
		})
		.merge(update)
			.transition()
			.duration(750)
			.attr("fill", d => {
				var val = d.properties.data;
				return val ? mapColorScale(val) : "#ccc";
		});


	d3.select(".map-title")
		.text(dataType);
};
