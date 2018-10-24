const express    = require("express"),
      router     = express.Router();

router.get('/', function (req, res) {
	res.render('login');
});

router.get('/konkurrentanalys', function (req, res) {
	res.render('konkurrentanalys');
});

router.get('/produktanalys', function (req, res) {
	res.render('produktanalys');
});

router.get('/sortfil', function (req, res) {
	res.render('sortfil')
});



router.get('/dashboard', function (req, res) {

	res.render('dashboard.ejs');

});

module.exports = router;