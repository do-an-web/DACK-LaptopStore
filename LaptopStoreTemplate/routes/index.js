var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
    // layout: false,
    title: 'Express'
  };
  res.render('Home/index', vm);
});
router.get('/demo', function(req, res, next) {
    var vm = {
        title: 'Hello demo',
        layout: 'layout'
    }
    res.render('Home/demo', vm);
});


module.exports = router;
//goi controller render