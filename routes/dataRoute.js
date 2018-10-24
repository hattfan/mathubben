const express    = require("express"),
      router     = express.Router();

router.get('/fruit/:id1/:id2/:id3/:id4', function(req, res) {
	var data = {
			"artiklar": {
					"artikelOne": req.params.id1,
					"artikelTwo": req.params.id2,
					"artikelThree": req.params.id3,
					"artikelFour": req.params.id4
			}
	}; 
	res.json(data);
});

router.get('/fruit/:id1/:id2/:id3/:id4/:id5', function(req, res) {
	var data = {
			"artiklar": {
					"artikelOne": req.params.id1,
					"artikelTwo": req.params.id2,
					"artikelThree": req.params.id3,
					"artikelFour": req.params.id4,
					"artikelFive": req.params.id5,
			}
	}; 
	res.json(data);
});

module.exports = router;