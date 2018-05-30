var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
    // layout: false,
    title: 'Express'
};
  res.render('index', vm);
});

module.exports = router;
//goi controller render