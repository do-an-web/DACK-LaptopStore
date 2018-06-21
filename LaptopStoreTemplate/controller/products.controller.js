var express =  require('express');
var products = require('../model/products.model');

exports.getProductsHome = function (req,res,next) {
    products.loadAll().then(rows => {
        // var rowsClone = rows.slice();

        var dataFavorite = rows.slice().sort(function (a,b) {
            return (Number(b.Views) - Number(a.Views));
        });
        var dataQuantityMac = rows.filter(function (obj) {
            if(obj.CatID === 5) return obj;
        });
        var dataQuantityDell = rows.filter(function (obj) {
            if(obj.CatID === 3) return obj;
        });
        var dataQuantityHp = rows.filter(function (obj) {
            if(obj.CatID === 2) return obj;
        })

        var vm = {
            categories: rows,
            dataFavorite: dataFavorite.slice(3,13),
            dataFavoriteSpecial: dataFavorite.slice(0,3),

            dataNews: rows.slice(rows.length - 11, rows.length - 1),
            dataNewsSpecial: rows.slice(rows.length - 1, rows.length),

            dataQuantityMac : dataQuantityMac.slice(0,6).sort(function (a,b) {
                return (Number(b.Quantity) - Number(a.Quantity));
            }),
            dataQuantityDell : dataQuantityDell.slice(0,6).sort(function (a,b) {
                return (Number(b.Quantity) - Number(a.Quantity));
            }),
            dataQuantityHp : dataQuantityHp.slice(0,6).sort(function (a,b) {
                return (Number(b.Quantity) - Number(a.Quantity));
            }),

            title: 'One Tech',
            //layout: '',
        };

        res.render('_pageUser/Home/index',vm);
    });

}

exports.getAllProducts = function (req,res,next) {

    var page = req.params.page;
   // console.log(req);

    products.loadAll().then(rows => {
        var vm = {
            products: rows,
            CountProduct: rows.length,
            title: 'Shop',
            layout: 'main.layout.hbs',
        };

        res.render('_pageUser/Shop/index',vm);
    });

}
