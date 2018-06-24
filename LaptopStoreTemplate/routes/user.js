var express = require('express');
var router = express.Router();
var products = require('../controller/products.controller');

//Home Pge
router.get('/',products.getProductsHome);
//Shop
router.get('/shop',products.getAllProducts);

router.get('/shop/search/:CatID',products.searchProductType);

router.get('/shop/search/:Core',products.searchProductType);

//router.get('/shop/search/type',products.searchProductProcess);
//router.get('/shop/search/:CatID/:ProcessType',products.searchProduct);


module.exports = router;
//goi controller render