var express = require('express');
var router = express.Router();

/* GET home page client. */
router.get('/', function(req, res) {
  res.render('client/index');
});

module.exports = router;
