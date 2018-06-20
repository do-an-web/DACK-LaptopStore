var express =  require('express');
var products = require('../model/products.model');

exports.getAllProducts = function (req,res,next) {
    products.loadAll().then(rows => {
        var vm = {
            categories: rows,
            layout: '',
        };
        console.log('view model');
        console.log(vm);
        res.render('demo',vm);
    });

}
exports.getProductsHome = function (req,res,next) {
    products.loadAll().then(rows => {
        var vm = {
            categories: rows,
            layout: '',
        };
        console.log('view model');
        console.log(vm);
        res.render('demo',vm);
    });

}