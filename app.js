var express = require("express"),
	app     = express(),
    passport    = require("passport"),
    LocalStrategy = require("passport-local");

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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',function(req,res){

	res.render('login.ejs');

});

app.get('/dashboard',function(req,res){

	res.render('dashboard.ejs');

});

app.get('/table',function(req,res){

	res.render('table.ejs');

});

var portSettings = process.env.PORT
// var portSettings = 8080;

app.listen(portSettings, process.env.IP, function() {
	var appConsoleMsg = 'Hemsidan startad: ';
	appConsoleMsg += process.env.IP + ':' + portSettings;
	console.log(appConsoleMsg);
});