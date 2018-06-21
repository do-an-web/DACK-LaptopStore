var express = require('express');
var router = express.Router();
var products = require('../controller/products.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
      //layout: '_layouts/main.layout.hbs',
      title: "One Tech",
  };
  res.render('_pageUser/Home/index', vm);
});


router.get('/demo',products.getProductsHome);


module.exports = router;
//goi controller render