var express =  require('express');
var products = require('../model/products.model');
var config = require('../config/config');
var location = require('location-href')

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

    var page = req.query.list;
    if (!page) {
        page = 1;
    }

    console.log("req : " + req.url);

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = products.loadAllByPro(offset);
    var p2 = products.countByCat();
    var p3 = products.loadAllBrands();

    Promise.all([p1, p2,p3]).then(([pRows, countRows,Brands]) => {

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                pagination: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            CountProduct: total,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            next : Number(req.query.list) + 1 > Number(nPages) ? false : Number(req.query.list) + 1,
            previous: Number(req.query.list) - 1 < 1 ? false : Number(req.query.list) - 1,
            brands : Brands,
            title: 'Shop',
        };
        res.render('_pageUser/Shop/index',vm);
    });

}

exports.searchProductType= function (req,res,next) {





    var page = req.query.list;
    if (!page) {
        page = 1;
    }
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var CatID = req.params.CatID;
    var p1 = products.loadAllByCat(CatID,offset);
    var p2 = products.countByCatBrands(CatID);
    var p3 = products.loadAllBrands();

    Promise.all([p1, p2,p3]).then(([pRows, countRows,Brands]) => {

        var products = [];
        var total = 0;
        total = countRows[0].total;
        products = pRows;
        total = countRows[0].total;
        products = pRows;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                pagination: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: products,
            CountProduct: total,
            noProducts: products.length === 0,
            page_numbers: numbers,
            next : Number(req.query.list) + 1 > Number(nPages) ? false : Number(req.query.list) + 1,
            previous: Number(req.query.list) - 1 < 1 ? false : Number(req.query.list) - 1,
            brands : Brands,
            title: 'Shop',
        };
        res.render('_pageUser/Shop/index',vm);
    });

}


// exports.searchProductProcess= function (req,res,next) {
//
//     var ProcessType = req.params.ProcessType;
//
//     console.log( "Process Type : " + ProcessType);
//
//     var page = req.query.list;
//     if (!page) {
//         page = 1;
//     }
//     var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
//
//     console.log("offset : " + offset);
//
//     var p1 = products.loadAllByCat(offset);
//     var p2 = products.countByCat();
//     var p3 = products.loadAllBrands();
//
//     var arr = [];
//
//     Promise.all([p1, p2,p3]).then(([pRows, countRows,Brands]) => {
//         console.log("1");
//         pRows.forEach(function (element) {
//             if(element.Detail.search(ProcessType))
//             {
//                 arr.push(element);
//             }
//         });
//         console.log("2");
//         var total = arr.length;
//         var nPages = total / config.PRODUCTS_PER_PAGE;
//         if (total % config.PRODUCTS_PER_PAGE > 0) {
//             nPages++;
//         }
//         console.log("3");
//         var numbers = [];
//         for (i = 1; i <= nPages; i++) {
//             numbers.push({
//                 pagination: i,
//                 isCurPage: i === +page
//             });
//         }
//
//         var vm = {
//             products: arr,
//             CountProduct: total,
//             noProducts: arr.length === 0,
//             page_numbers: numbers,
//             next : Number(req.query.list) + 1 > Number(nPages) ? false : Number(req.query.list) + 1,
//             previous: Number(req.query.list) - 1 < 1 ? false : Number(req.query.list) - 1,
//             brands : Brands,
//             title: 'Shop',
//         };
//         res.render('_pageUser/Shop/index',vm);
//     });
//
// }
//
// exports.searchProduct = function (req,res,next) {
//
//     var CatID = req.params.CatID;
//     var ProcessType = req.params.ProcessType;
//
//     console.log("Cat ID " + CatID + "Process Type : " + ProcessType);
//
//     var page = req.query.list;
//     if (!page) {
//         page = 1;
//     }
//     var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
//
//     var p1 = products.loadAllByCat(CatID,offset);
//     var p2 = products.countByCat();
//     var p3 = products.loadAllBrands();
//
//     Promise.all([p1, p2,p3]).then(([pRows, countRows,Brands]) => {
//         // console.log(pRows);
//         //console.log(countRows);
//         //console.log(Brands);
//
//         var total = countRows[0].total;
//         var nPages = total / config.PRODUCTS_PER_PAGE;
//         if (total % config.PRODUCTS_PER_PAGE > 0) {
//             nPages++;
//         }
//         var numbers = [];
//         for (i = 1; i <= nPages; i++) {
//             numbers.push({
//                 pagination: i,
//                 isCurPage: i === +page
//             });
//         }
//
//         var vm = {
//             products: pRows,
//             CountProduct: total,
//             noProducts: pRows.length === 0,
//             page_numbers: numbers,
//             next : Number(req.query.list) + 1 > Number(nPages) ? false : Number(req.query.list) + 1,
//             previous: Number(req.query.list) - 1 < 1 ? false : Number(req.query.list) - 1,
//             brands : Brands,
//             title: 'Shop',
//         };
//         res.render('_pageUser/Shop/index',vm);
//     });
//
// }







