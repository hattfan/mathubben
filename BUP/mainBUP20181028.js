var express = require("express"),
	app = express(),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({
	extended: false
}));

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

// MongoClient.connect('mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben', (err, client) => {
MongoClient.connect('mongodb://localhost:27017', (err, client) => {


	// var db = client.db('statistik');
	var db = client.db('mathubben');

	if (err) throw err;

	app.get('/', function (req, res) {

		res.render('login.ejs');

	});
	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2
			}
		};
		db.collection('artikeldata').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/:id2/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2
			}
		};
		db.collection('artikeldataperlaen').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/:id3', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3
			}
		};
		db.collection('artikeldata').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo},{'LevArtNr':data.artiklar.artikelThree}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/:id2/:id3', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3
			}
		};
		db.collection('artikeldataperlaen').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo},{'LevArtNr':data.artiklar.artikelThree}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklar/:id1/:id2/:id3/:id4', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4
			}
		};
		db.collection('artikeldata').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo},{'LevArtNr':data.artiklar.artikelThree},{'LevArtNr':data.artiklar.artikelFour}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklar/:id1/:id2/:id3/:id4/:id5', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4,
				"artikelFive": req.params.id5
			}
		};
		db.collection('artikeldata').find({$or: [{'LevArtNr':data.artiklar.artikelOne},{'LevArtNr':data.artiklar.artikelTwo},{'LevArtNr':data.artiklar.artikelThree},{'LevArtNr':data.artiklar.artikelFour},{'LevArtNr':data.artiklar.artikelFive}]}).toArray(function(err, result){
			if(err) throw err
			res.json(result);
		})
	});

	app.get('/varugrupptest/:grupp', function (req, res) {
		db.collection("varugrupper").find({
			'Varugrupp': req.params.grupp
		}).toArray(function (err, data) {
			if (err) throw err;
			res.json(data)
		})
	});

	app.get('/produkter/:id/:id2', function (req, res) {
		db.collection('produkter').find({
			'LevArtNr': req.params.id
		}).toArray(function (err, res) {
			console.log(res)
			console.log(req.params.id, req.params.id2)
		})
	})

	app.get('/konkurrentanalys', function (req, res) {
		res.render('konkurrentanalys.ejs');
	});

	app.get('/konkurrentanalysdata/:id', function (req, res) {
		db.collection('artikeldata').find({
			'LevArtNr': req.params.id
		}).toArray(function (err, result) {
			if (err) throw err;
			res.json(result)
		})
	});

	app.get('/produktanalys', function (req, res) {
		res.render('produktanalys.ejs');
	});

	app.get('/lineexample', function (req, res) {
		res.render('lineexample/lineexample.ejs');
	});

	app.get('/produktanalysdata/:id', function (req, res) {
		db.collection('artikeldata').find({
			'LevArtNr': req.params.id
		}).toArray(function (err, result) {
			if (err) throw err;
			res.json(result)
		})
	});

	app.get('/sortfil', function (req, res) {
		res.render('sortfil.ejs')
	});

	app.get('/marknadskraft', function (req, res) {
		db.collection("varugrupper").distinct("Varugrupp", function (err, data) {
			if (err) throw err;
			// console.log(data)
			sortedData = data.sort()
			res.render('marknad.ejs', {
				produktgruppUnique: sortedData
			});
			// res.render('marknad.ejs')
		})
	})

	app.get('/dashboard', function (req, res) {

		res.render('dashboard.ejs');

	});

	app.get('/table', function (req, res) {

		res.render('table.ejs');

	});

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//! Skall tagas bort !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// app.get('/getmongodata/:type', function (req, res) {
	// 	var temp = []
	// 	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	// 		var db = client.db('dabas');

	// 		if (err) throw err;

	// 		db.collection("menigoRep4").find().toArray(function (err, res) {
	// 			for (let i = 0; i < res.length; i++) {
	// 				temp.push(res[i])
	// 			}
	// 			res.json(temp)
	// 		})
	// 	})
	// })


	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//! För att rendera databaserna direkt, utan att behöva mecka med mongoexport.  !!!!!!!
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	app.get('/alldbs/:type', function (req, res) {
		var temp = []
		var options = {
			menigo,
			dabas,
			MSstatistik
		}
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

					res.render('export.ejs', {
						dbs: temp,
						dbDataExp: dbData
					});
				})
			})
		})
	})
})

//TEST för att rendera stater i USA
app.get('/maptest', function (req, res) {

	res.render('maptest.ejs');

});


//TEST för att rendera stater i USA
app.get('/maptest2', function (req, res) {

	res.render('maptest4.ejs');

});


//TEST för att rendera stater i USA
app.get('/maptest3', function (req, res) {

	res.render('maptest3.ejs');

});

var port = process.env.PORT || 3030;

app.listen(port, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + port;
	console.log(appConsoleMsg);
});