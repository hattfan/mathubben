var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	MongoClient = require('mongodb').MongoClient;

const indexRoute 	= require("./routes/index"),
			dataRoute		= require("./routes/dataRoute");

//Use EJS as templating engine
app.set("view engine", "ejs");

//BodyParser enable
app.use(bodyParser.urlencoded({ extended: false }));
//Route for static files
app.use(express.static(__dirname + '/views'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {console.log('localhost')}
// MongoClient.connect('mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben', (err, client) => {
MongoClient.connect('mongodb://localhost:27017', (err, client) => {

var db = client.db('mathubben');

if (err) throw err;

app.use("/", indexRoute);
app.use("/data", dataRoute);

app.get('/varugrupptest/:grupp',  function (req, res) {
	db.collection("varugrupper").find({'Varugrupp':req.params.grupp}).toArray(function (err, data) {
		if (err) throw err;
		res.json(data)
	})
});


app.get('/konkurrentanalysdata/:id', function (req, res) {
	db.collection('artikeldata').find({'LevArtNr':req.params.id}).toArray(function(err, result){
		if (err) throw err;
		res.json(result)
	})
});

router.get('/marknadskraft', function (req, res) {
	db.collection("varugrupper").distinct("Varugrupp", function (err, data) {
		if (err) throw err;
		// console.log(data)
		sortedData = data.sort()
		res.render('marknad', { produktgruppUnique: sortedData });
		// res.render('marknad.ejs')
	})
})

app.get('/produktanalysdata/:id', function (req, res) {
	db.collection('artikeldata').find({'LevArtNr':req.params.id}).toArray(function(err, result){
		if (err) throw err;
		res.json(result)
	})
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! För att rendera databaserna direkt, utan att behöva mecka med mongoexport.  !!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// app.get('/alldbs/:type', function (req, res) {
// 	var temp = []
// 	var options = { menigo, dabas, MSstatistik }
// 	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
// 		var db = client.db('dabas');

// 		if (err) throw err;
// 		db.listCollections().toArray(function (err, data) {
// 			for (let i = 0; i < data.length; i++) {
// 				temp.push(data[i].name)
// 			}

// 			var uppfukkat = db.collection(req.params.type);
// 			uppfukkat.find().toArray(function (err, dbData) {
// 				var tempDB = [];
// 				for (let i = 0; i < dbData.length; i++) {
// 					tempDB.push(dbData[i])
// 				}

// 				res.render('export.ejs', { dbs: temp, dbDataExp: dbData });
// 			})
// 		})
// 	})
// })

})
// var port = process.env.PORT || 3030; 

// app.listen(port, process.env.IP, function () {
// 	var appConsoleMsg = 'Hemsidan startad: ';
// 	appConsoleMsg += process.env.IP + ':' + port;
// 	console.log(appConsoleMsg);
// });

db.connect(() => {
	app.listen(process.env.PORT || 3030, function (){
			console.log(`Listening`);
	});
});