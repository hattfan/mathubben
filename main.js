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

// MongoClient.connect('mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben', (err, client) => {
MongoClient.connect('mongodb://localhost:27017', (err, client) => {

// var db = client.db('statistik');
var db = client.db('mathubben');
// console.log('Databas-route till: ' + req.params.type)
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

		// console.log('Databas-route till: ' + req.params.type)
		if (err) throw err;
		// req.params.type
		db.collection("menigoRep4").find().toArray(function (err, res) {
			for (let i = 0; i < res.length; i++) {
				temp.push(res[i])
			}
			res.json(temp)
		})
	})
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! Till att rendera databaserna direkt, utan att behöva mecka med mongoexport////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/alldbs/:type', function (req, res) {
	var temp = []
	var options = { menigo, dabas, MSstatistik }
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');

		// console.log('Databas-route till: ' + req.params.type)
		if (err) throw err;
		// req.params.type
		db.listCollections().toArray(function (err, data) {
			for (let i = 0; i < data.length; i++) {
				temp.push(data[i].name)
			}
			// res.render('export.ejs', { dbs : temp });

			var uppfukkat = db.collection(req.params.type);
			uppfukkat.find().toArray(function (err, dbData) {
				// console.log(dbData[0])
				var tempDB = [];
				for (let i = 0; i < dbData.length; i++) {
					tempDB.push(dbData[i])
				}
				// console.log(tempDB)
				res.render('export.ejs', { dbs: temp, dbDataExp: dbData });
				// 
			})
		})
	})
})

})
// var portSettings = process.env.PORT
var port = process.env.PORT || 3030; 

app.listen(port, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + port;
	console.log(appConsoleMsg);
});


















// //????????????????????????????????????????????????????????????????????????????????????
// //??? REST get data ???????????????????????????????????????????????????????????????????????
// //????????????????????????????????????????????????????????????????????????????????????
// app.get('/dbyear2/:type', function (req, res) {
// 	var befolkning = require('./views/js/kommundata.js')
// 	kommunVikt = {};
	

// 		var years = ['2015','2016','2017']
// 		db.collection("combinedDBs").distinct("KommunNummer", function (err, kommunData) {

// 			if (err) throw err
// 			//Loopar över kommunnumerna
// 			for (let i = 0; i < kommunData.length; i++) {
// 				const kommun = kommunData[i];

// 				kommunVikt[kommun] = {
// 					2015: {
// 						'Mängd':0,
// 						'Kronor':0},
// 					2016: {
// 						'Mängd':0,
// 						'Kronor':0},
// 					2017: {
// 						'Mängd':0,
// 						'Kronor':0},
// 				}
// 			}

// 			//Letar upp valda grupper i databasen
// 			db.collection("combinedDBs").find({ 'VarugruppMathubben': req.params.type }).toArray(function (err, mathubbenStatistik) {
// 				if (err) throw err;

// 				for (let i = 0; i < mathubbenStatistik.length; i++) {
// 					//Loopear över kommunnummerna och letar om de finns i mathubbenstatistiken
// 					if (mathubbenStatistik[i]['KommunNummer'] in kommunVikt) {
// 						vikt = mathubbenStatistik[i]['Mängd'];
// 						kronor = mathubbenStatistik[i]['Kronor'];
// 						//vikt countar över mängden i varje statistik-rad
// 						if(mathubbenStatistik[i]['År'] === 2015){
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Mängd'] + Math.round((vikt * 100) / 100);
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Kronor'] + Math.round((kronor * 100) / 100);
// 						} 
// 						else if (mathubbenStatistik[i]['År'] === 2016){
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Mängd'] + Math.round((vikt * 100) / 100);
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Kronor'] + Math.round((kronor * 100) / 100);
// 						}
// 						else if (mathubbenStatistik[i]['År'] === 2017){
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Mängd'] + Math.round((vikt * 100) / 100);
// 							kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Kronor'] + Math.round((kronor * 100) / 100);
// 						}

// 						vikt = "";
// 					}
// 				}
// 				var final = []
// 				var temp = {}
// 				for (const key in kommunVikt) {
// 					years.forEach(year => {
// 						// console.log(kommunVikt[key][year])
// 						temp = { 
// 							'KommunNummer' : key,
// 							'Year' : year,
// 							'MängdTotal' : kommunVikt[key][year]['Mängd'],
// 							'KronorTotal' : kommunVikt[key][year]['Kronor'],
// 							'MängdPerCapita': kommunVikt[key][year]['Mängd']/befolkning[key],
// 							'KronorPerCapita' : kommunVikt[key][year]['Kronor']/befolkning[key]

// 						}
// 						final.push(temp)
// 						temp = {}
// 					})
// 				}
// 				res.json(final)
// 				// {continent: "Asia", country: "Afghanistan", countryCode: "004", emissions: 4217.05, emissionsPerCapita: 0.156001008723042}

// 			})
// 		})
// 	})
