var express 			= require("express"),
		app						= express(),
	// passport = require("passport"),
		bodyParser 		= require("body-parser"),
		MongoClient 	= require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

// Routes
const konkurrentanalysRoute 	= require("./routes/konkurrentanalys");
const indexRoute 							= require("./routes/index");

// Add headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});



// MongoClient.connect('mongodb://localhost:27017', { poolSize: 100 }, (err, client) => {
MongoClient.connect('mongodb://normal_user:normal1@ds235732.mlab.com:35732/mathubben', (err, client) => {
	var db = client.db('mathubben');

	var todayHour = new Date().getHours();
	var todayDay = new Date().getDay();
	if ((todayHour >= 7 && todayHour <= 20) && (todayDay < 5)) {
			var http = require("http");
			setInterval(function() {
				db.collection('dataSverige').find({'LevArtNr': 1532}).toArray(function (err, result) {
					console.log("Ah ah ah ah staying alive")
				})
			}, 1800000); // every 30 minutes
	} 
	if (err) throw err;

	app.use("/konkurrentanalys", konkurrentanalysRoute);
	app.use("/", indexRoute);

	app.get('/artikellistning/:id', function (req, res) {
		// db.collection('artiklar').find({'Benamning':{$regex: ".*" + req.params.id + ".*"}}).limit(10).toArray(function(err, result){
		db.collection('artiklar').find({ 'Benamning': { $regex: req.params.id, $options: "im" } }).limit(10).sort({ 'KronorTotal': -1 }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	})

	app.get('/artikelperfabrikat/:fabrikat', function (req, res) {
		// db.collection('artiklar').find({'Benamning':{$regex: ".*" + req.params.fabrikat + ".*"}}).limit(10).toArray(function(err, result){
		// db.collection('artiklar').find({'Fabrikat':{$regex: req.params.fabrikat, $options: "im"}}).limit(10).toArray(function(err, result){
		db.collection('artiklar').find({ 'Fabrikat': req.params.fabrikat }).sort({ 'Benamning': 1 }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	})

	app.get('/fabrikatlistning/:id', function (req, res) {
		db.collection('fabrikat').find({ 'Fabrikat': { $regex: req.params.id, $options: "im" } }).limit(10).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	})

	//! En artikel !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.get('/konkurrentanalysartiklarPerKommun/:id1/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
			}
		};
		db.collection('dataPerKommun').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
			}
		};
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarSverige/:id1/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
			}
		};
		db.collection('dataSverige').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	//! Två artiklar !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2
			}
		};

		db.collection('dataPerKommun').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }] }).toArray(function (err, result) {
			if (err) throw err
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
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarSverige/:id1/:id2/', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2
			}
		};
		db.collection('dataSverige').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	//! Tre artiklar !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/:id3', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3
			}
		};
		db.collection('dataPerKommun').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }] }).toArray(function (err, result) {
			if (err) throw err
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
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarSverige/:id1/:id2/:id3', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3
			}
		};
		db.collection('dataSverige').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});


	//! Fyra artiklar !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/:id3/:id4', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4
			}
		};
		db.collection('dataPerKommun').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/:id2/:id3/:id4', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4

			}
		};
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarSverige/:id1/:id2/:id3/:id4', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4

			}
		};
		db.collection('dataSverige').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	//! Fem artiklar !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	app.get('/konkurrentanalysartiklarPerKommun/:id1/:id2/:id3/:id4/:id5', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4,
				"artikelFive": req.params.id5
			}
		};
		db.collection('dataPerKommun').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }, { 'LevArtNr': data.artiklar.artikelFive }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/:id2/:id3/:id4/:id5', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4,
				"artikelFive": req.params.id5
			}
		};
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }, { 'LevArtNr': data.artiklar.artikelFive }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});

	app.get('/konkurrentanalysartiklarPerLaen/:id1/:id2/:id3/:id4/:id5', function (req, res) {
		var data = {
			"artiklar": {
				"artikelOne": req.params.id1,
				"artikelTwo": req.params.id2,
				"artikelThree": req.params.id3,
				"artikelFour": req.params.id4,
				"artikelFive": req.params.id5
			}
		};
		db.collection('dataPerLaen').find({ $or: [{ 'LevArtNr': data.artiklar.artikelOne }, { 'LevArtNr': data.artiklar.artikelTwo }, { 'LevArtNr': data.artiklar.artikelThree }, { 'LevArtNr': data.artiklar.artikelFour }, { 'LevArtNr': data.artiklar.artikelFive }] }).toArray(function (err, result) {
			if (err) throw err
			res.json(result);
		})
	});
	//! END FEM ARTIKLAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	app.get('/produktanalys', function (req, res) {
		res.render('produktanalys.ejs');
	});

	app.get('/produktanalysdata/:id', function (req, res) {
		db.collection('dataPerKommun').find({
			'LevArtNr': req.params.id
		}).toArray(function (err, result) {
			if (err) throw err;
			res.json(result)
		});
	});

	app.get('/dashboard', function (req, res) {
		res.render('home.ejs');
	});
});

var port = process.env.PORT || 3032;

app.listen(port, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + port;
	console.log(appConsoleMsg);
});