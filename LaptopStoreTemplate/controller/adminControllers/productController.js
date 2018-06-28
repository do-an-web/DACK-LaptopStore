var express = require('express');
var productRepo = require('../repos/productRepo');
var config = require('../config/config');

var router = express.Router();

router.get('/', (req, res) => {
    productRepo.loadAll().then(rows => {
        var vm = {
            products: rows
        };
        res.render('product/index', vm);
    });
});

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllByCat(catId, offset);
    var p2 = productRepo.countByCat(catId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        
        // console.log(countRows);

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }
        var vm = {
            CatID: catId,
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
        res.render('product/byCat', vm);
    });
});

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    productRepo.single(proId).then(rows => {
        if (rows.length > 0) {
            var vm = {
                product: rows[0]
            }
            res.render('product/detail', vm);
        } else {
            res.redirect('/');
        }
    });
});

router.get('/add', (req, res) => {
    var cat = false;
    if(req.query.catPath == 'true'){
        cat = true;
    }
    var vm = {
        CatID: req.query.id,
        showAlert: false,
        IsCat: cat
    };
    res.render('product/add', vm);
});

router.post('/add', (req, res) => {
    productRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.render('product/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        CatId: req.query.id
    }
    res.render('product/delete', vm);
});

router.post('/delete', (req, res) => {
    productRepo.delete(req.body.ProID).then(value => {
        res.redirect('/category');
    });
});

router.get('/edit', (req, res) => {
    var cat = false;
    if(req.query.catPath == 'true'){
        cat = true;
    }
    productRepo.single(req.query.id).then(p => {
        var vm = {
            Product: p[0],
            CatID: p[0].CatID,
            IsCat: cat
        };
        res.render('product/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    productRepo.update(req.body).then(value => {
        console.log(req.body.CatID);
        res.redirect(`/product/byCat/${req.body.CatID}`);
    });
});

module.exports = router;