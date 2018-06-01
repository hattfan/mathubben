var express = require("express"),
	app = express(),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	bodyParser = require("body-parser"),
	MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.get('/', function (req, res) {

	res.render('login.ejs');

});


app.get('/db/:type', function (req, res) {
	var tot = 0, ulle, counter, kommunObj = {}, kommun = {}, data = [], tempData = [], kommuner = {};
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');
		// console.log('Databas-route till: ' + req.params.type)
		if (err) throw err;
		db.collection("menigoRep4").distinct("KommunNummer", function (err, kommunData) {
			// db.collection("menigoRep4").aggregate({"$match": {"KommunNummer":{},, function (err, kommunData) {
			if (err) throw err
			for (let i = 0; i < kommunData.length; i++) {
				const kommun = kommunData[i];

				kommuner[kommun] = 0;
				data[i] = { 'Kommunkod': kommun, 'Value': 0 }
			}
			kommunObj = data;
			db.collection("menigoRep4").find({ 'Varugruppnamn': req.params.type }).toArray(function (err, menigoStatistik) {
				if (err) throw err;
				for (let i = 0; i < menigoStatistik.length; i++) {
					if (menigoStatistik[i]['KommunNummer'] in kommuner) {
						vikt = menigoStatistik[i]['Nettovikt(kg)'].replace(",", ".");
						vikt = vikt.replace(" ", "");
						kommuner[menigoStatistik[i]['KommunNummer']] = kommuner[menigoStatistik[i]['KommunNummer']] + Math.round((Number(vikt) * 100) / 100);
						vikt = "";
					}
				}
				for (let i = 0; i < kommunObj.length; i++) {
					if (kommunObj[i]['Kommunkod'] in kommuner) {
						console.log(kommuner)
						kommunObj[i]['Value'] = kommuner[kommunObj[i]['Kommunkod']]
					}
				}
				res.json(kommunObj)
			})
		})
	})
})

app.get('/db', function (req, res) {
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');
		// console.log(req.body.artikel)
		if (err) throw err;
		db.collection("dashtest2").find({}).toArray(function (err, data) {
			if (err) throw err;
			res.json(data)
		})
	})
});

app.get('/marknadskraft', function (req, res) {
	MongoClient.connect('mongodb://localhost:27017', (err, client) => {
		var db = client.db('dabas');
		// console.log('Databas-route till: ' + req.params.type)
		if (err) throw err;
		// db.collection("dashtest2").distinct("Typ", function (err, data) {
		db.collection("menigoRep3").distinct("Varugruppnamn", function (err, data) {
			if (err) throw err;
			// console.log(data)
			res.render('marknad.ejs', { produktgruppUnique: data });
		})
	})
});


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
	var options = {menigo, dabas, MSstatistik}
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

// var portSettings = process.env.PORT
var portSettings = 3030;

app.listen(portSettings, process.env.IP, function () {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + portSettings;
	console.log(appConsoleMsg);
});