var express = require('express');
var router = express.Router();
var products = require('../controller/products.controller');

//Home Pge
router.get('/',products.getProductsHome);
//Shop
router.get('/shop',products.getAllProducts);

router.get('/shop/search',products.searchProduct);


router.get('/categories/:CatName', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  req.session.current_url = req.originalUrl
  next()
},products.getAllProductsForBrands);


router.get('/shop/process/:Process',products.getAllProductForProcess);

router.post('/shop/search',products.searchProduct);

router.post('/shop/search/Name',products.searchNameProduct);

router.get('/detail/:proID', products.getSingleProduct);


module.exports = router;
//goi controller render