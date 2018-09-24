var express = require("express"),
	app = express(),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {console.log('localhost')}

MongoClient.connect('mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben', (err, client) => {
// MongoClient.connect('mongodb://localhost:27017', (err, client) => {


// var db = client.db('statistik');
var db = client.db('mathubben');

if (err) throw err;

app.get('/', function (req, res) {

	res.render('login.ejs');

});

app.get('/varugrupptest/:grupp',  function (req, res) {
	db.collection("varugrupper").find({'Varugrupp':req.params.grupp}).toArray(function (err, data) {
		if (err) throw err;
		res.json(data)
	})
});

app.get('/produkter/:id', function(req, res) {
	db.collection('produkter').find({'LevArtNr':req.params.id}).toArray(function(err, res){
			console.log(res)
	})
})

app.get('/konkurrentanalys', function (req, res) {
	res.render('konkurrentanalys.ejs');
});


app.get('/sortfil', function (req, res) {
	res.render('sortfil.ejs')
});

app.get('/marknadskraft', function (req, res) {
	db.collection("varugrupper").distinct("Varugrupp", function (err, data) {
		if (err) throw err;
		// console.log(data)
		sortedData = data.sort()
		res.render('marknad.ejs', { produktgruppUnique: sortedData });
		// res.render('marknad.ejs')
	})
})

app.get('/dashboard', function (req, res) {

	res.render('dashboard.ejs');

});

app.get('/table', function (req, res) {

	res.render('table.ejs');

});

app.get('/getmongodata/:type', function (req, res) {
	var temp = []
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');

		if (err) throw err;

		db.collection("menigoRep4").find().toArray(function (err, res) {
			for (let i = 0; i < res.length; i++) {
				temp.push(res[i])
			}
			res.json(temp)
		})
	})
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! För att rendera databaserna direkt, utan att behöva mecka med mongoexport.  !!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/alldbs/:type', function (req, res) {
	var temp = []
	var options = { menigo, dabas, MSstatistik }
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');

		if (err) throw err;
		db.listCollections().toArray(function (err, data) {
			for (let i = 0; i < data.length; i++) {
				temp.push(data[i].name)
			}

			var uppfukkat = db.collection(req.params.type);
			uppfukkat.find().toArray(function (err, dbData) {
				var tempDB = [];
				for (let i = 0; i < dbData.length; i++) {
					tempDB.push(dbData[i])
				}

				res.render('export.ejs', { dbs: temp, dbDataExp: dbData });
			})
		})
	})
})

})
var port = process.env.PORT || 3030; 

app.listen(port, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + port;
	console.log(appConsoleMsg);
});