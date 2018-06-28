var express = require('express');
var router = express.Router();
var products = require('../controller/products.controller');

//Home Pge
router.get('/', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.getProductsHome);
//Shop
router.get('/shop', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.getAllProducts);

router.get('/shop/search', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.searchProduct);


router.get('/categories/:CatName', function (req, res, next) {
  req.session.current_url = req.originalUrl
  next()
},products.getAllProductsForBrands);


router.get('/shop/process/:Process', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.getAllProductForProcess);

router.post('/shop/search', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.searchProduct);

router.post('/shop/search/Name', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
},products.searchNameProduct);

router.get('/detail/:proID', function (req, res, next) {
    req.session.current_url = req.originalUrl
    next()
}, products.getSingleProduct);


module.exports = router;
//goi controller render