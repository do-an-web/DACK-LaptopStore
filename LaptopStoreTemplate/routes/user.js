var express = require('express');
var router = express.Router();
var products = require('../controller/products.controller');

//Home Pge
router.get('/',products.getProductsHome);
//Shop
router.get('/shop',products.getAllProducts);

router.get('/shop/search',products.searchProduct);

router.get('/shop/:CatName',products.getAllProductsForBrands);

router.get('/shop/process/:Process',products.getAllProductForProcess);

router.post('/shop/search',products.searchProduct);

router.get('/detail/:proID', products.getSingleProduct);


module.exports = router;
//goi controller render