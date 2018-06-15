var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var vm = {
      title: 'Home Page',
      layout: 'layouts/main.layout.hbs',
  };
  res.render('Home/index',vm);
});
module.exports = router;
//Prroduct
//Detail
//Sign in. sign out
