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
router.get('/home', function(req, res, next) {
    res.render('Home/index', { title: 'Express' });
});
router.get('/demo', function(req, res, next) {
    res.render('Home/demo', { title: 'Express' });
});


module.exports = router;
//goi controller render