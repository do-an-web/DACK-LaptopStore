var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var vm = {
      title: 'Home Page',
      layout: 'main.layout.hbs',
  };
  res.render('Home/index',vm);
});
router.get('/product', function(req, res, next) {
  var vm = {
      title: 'Single Product',
      layout: 'main.layout.hbs',
  };
  res.render('Product/Detail',vm);
});
router.get('/login', function(req, res, next) {
  var vm = {
      // title: 'Sign in',
      // layout: 'main.layout.hbs'
  };
  res.render('Account/Login',vm);
});
router.get('/register', function(req, res, next) {
  var vm = {
      // title: 'Sign in',
      // layout: 'main.layout.hbs'
  };
  res.render('Account/Register.hbs',vm);
});

module.exports = router;
//Prroduct
//Detail
//Sign in. sign out
