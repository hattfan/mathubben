const express = require("express"),
	router = express.Router();

router.get('/login', function (req, res) {
	res.render('login.ejs');
});

router.get('/', function (req, res) {
	res.render('landing/index.ejs');
});


module.exports = router;