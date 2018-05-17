var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/script'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){

	res.render('login.ejs');

});

app.get('/dashboard',function(req,res){
	// res.sendFile('index.html');
	res.render('dashboard.ejs');
  //It will find and locate index.html from View or Scripts
});

var portSettings = process.env.PORT
// var portSettings = 8080;

app.listen(portSettings, process.env.IP, function() {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + portSettings;
	console.log(appConsoleMsg);
});