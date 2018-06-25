var express =  require('express');
var products = require('../model/products.model');
var config = require('../config/config');
var location = require('location-href');

var ConditonSearch = {
    money: [],
    brands: [],
    process: [],
};
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

<<<<<<< HEAD
=======
exports.getSingleProduct = function (req, res, next) {
    var proID = req.params.proID;

    products.single(proID).then(pRow => {
        products.loadSameBrandsByCat(pRow[0].CatID).then(psRow =>{
            var vm = {
                sameBrand: psRow,
                product: pRow[0],
                layout: 'main.layout.hbs',
                title: "Single Product"
            };
            res.render('_pageUser/Detail/index', vm);
        })
    });
}

exports.searchProductType= function (req,res,next) {



>>>>>>> fe20c1c6037ce9aaab1e8f069c4347099b7f8687

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

exports.searchProduct = function (req,res,next) {

    var isMethodGet = false;
    if (req.method === 'POST')
    {
        isMethodGet = true;

        ConditonSearch = {
            money: [],
            brands: [],
            process: [],
        };
        ConditonSearch.money = req.body.money;
        if (req.body.brands !== undefined ) {
            if (isArray(req.body.brands))
            {
                ConditonSearch.brands = req.body.brands;
            }
            else{
                ConditonSearch.brands.push(req.body.brands);
            }
        }
        if (req.body.process !== undefined ) {
            if (isArray(req.body.process))
            {
                ConditonSearch.process= req.body.process;
            }
            else{
                ConditonSearch.process.push(req.body.process);
            }
        }

    }
    var page = req.query.list;

    if (!page) {
        page = 1;
    }
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p0 = products.loadAll();
    var p1 = products.loadAllBrands();

    Promise.all([p0,p1]).then(([pTotal,Brands]) => {


        var products = [];
        var Temp = [];
        var TempProcess = [];
        var isMoney = false;
        var isBrands = false;
        var isProcess = false;
        var total;

        //Search
        pTotal.forEach(function (item,index) {

            if (ConditonSearch.money !== null) {
                if (Number(item.Price) > Number(ConditonSearch.money[0]) && Number(item.Price) <= Number(ConditonSearch.money[1])) {

                    products.push(item);
                    isMoney = true;
                }
            }
        });
        pTotal.forEach(function (item,index) {

            if (ConditonSearch.brands.length !== 0) {
                for (i = 0; i < ConditonSearch.brands.length; i++) {
                    if (ConditonSearch.brands[i] === item.Factory) {
                        isBrands = true;
                        if (isMoney === true) {
                            for (i = 0; i < products.length; i++) {
                                if (products[i].ProID === item.ProID) {
                                    Temp.push(item);
                                }
                            }
                        }
                        else {
                            console.log(item.ProID);
                            products.push(item);
                        }
                    }
                }

            }
        });
        pTotal.forEach(function (item,index) {

            if (ConditonSearch.process.length !== 0 ) {
                for(i = 0; i < ConditonSearch.process.length; i++)
                {
                    if (item.Detail.search(ConditonSearch.process[i]) > 0) {
                        isProcess = true;
                        if (isMoney === true && isBrands === true)
                        {
                            for(i = 0; i < Temp.length; i++)
                            {
                                if (Temp[i].ProID === item.ProID)
                                {
                                    TempProcess.push(item);
                                }
                            }
                        }
                        else {
                            if ((isMoney === true && isBrands === false) || (isMoney === false && isBrands === true)){
                                for(i = 0; i < products.length; i++)
                                {
                                    if (products[i].ProID === item.ProID)
                                    {
                                        TempProcess.push(item);
                                    }
                                }
                            }
                            else {
                                products.push(item);
                            }
                        }

                    }
                }

            }
        });
        if (isBrands && isProcess){
            products = TempProcess;
        }
        else{
            if (isProcess){
                products = Temp;
            }
        }
        total = products.length;
        products = products.slice((Number(page)-1)* config.PRODUCTS_PER_PAGE,Number(page)* config.PRODUCTS_PER_PAGE);

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
            isMethodGet : isMethodGet,
            body: req.body,
            title: 'Shop',
        };
        res.render('_pageUser/Shop/index',vm);
    });
}
function isArray(arr) {
    return arr.constructor.toString().indexOf("Array") > -1;
}