const express    = require("express"),
      router     = express.Router();

router.get('/', function (req, res) {
  res.render('konkurrentanalys.ejs');
});

module.exports = router;