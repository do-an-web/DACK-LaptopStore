var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("OK");
  var vm = {
    title : 'Express'
  }
  res.render('index', vm);
});

module.exports = router;
