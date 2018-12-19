var express = require("express"),
	app = express();

app.use(express.static(__dirname + '/views'));

// Add headers
app.use(function (req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});


app.get('/', function (req, res) {

    res.render('index.ejs');

});

var port = process.env.PORT || 8080;

app.listen(port, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + port;
	console.log(appConsoleMsg);
});