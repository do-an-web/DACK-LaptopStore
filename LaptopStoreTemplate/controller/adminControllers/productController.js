var express = require('express');
var productRepo = require('../../repos/adminRepos/productRepo');
var config = require('../../config/config');
var restrict = require("../../middle-wares/restrict");
var restrict_admin = require("../../middle-wares/restrict_admin");
var router = express.Router();

router.get('/', restrict, restrict_admin,(req, res) => {
    productRepo.loadAll().then(rows => {
        var vm = {
            products: rows,
            layout: 'admin_main',
        };
        res.render('admin/product/index', vm);
    });
});

router.get('/byCat/:catId', restrict, restrict_admin,(req, res) => {
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
            page_numbers: numbers,
            layout: 'admin_main',
        };
        res.render('admin/product/byCat', vm);
    });
});

router.get('/detail/:proId', restrict, restrict_admin,(req, res) => {
    var proId = req.params.proId;
    productRepo.single(proId).then(rows => {
        if (rows.length > 0) {
            var vm = {
                product: rows[0],
                layout: 'admin_main',
            }
            res.render('product/detail', vm);
        } else {
            res.redirect('/admin/product');
        }
    });
});

router.get('/add', restrict, restrict_admin,(req, res) => {
    var cat = false;
    if(req.query.catPath == 'true'){
        cat = true;
    }
    var vm = {
        CatID: req.query.id,
        showAlert: false,
        IsCat: cat,
        layout: 'admin_main',
    };
    res.render('admin/product/add', vm);
});

router.post('/add', restrict, restrict_admin,(req, res) => {
    if (!req.files)
        return res.end('fail');

    var product = [];
    
     
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let File = req.files.Image;
     
      // Use the mv() method to place the file somewhere on your server
      var newPath = '/HK8/admin/image/filename.jpg';
      File.mv(newPath, function(err) {
        if (err){

          return res.end('fail');
        }
        product.push({
            ProName: req.body.ProName,
            Factory: req.body.Factory,
            Overview: req.body.Overview,
            Detail: req.body.Detail,
            CatID: req.body.CatID,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
            Views: 0,
            Image: newPath
        });
        productRepo.add(product[0]).then(value => {
            var vm = {
                CatID: req.body.CatID,
                showAlert: true,
                IsCat: true
            };
            res.render('admin/product/add', vm);
        }).catch(err => {
            console.log(err);
            res.end('fail');
        });
     
      });

      // console.log(req.body);
      //   productRepo.add(req.body).then(value => {
      //       var vm = {
      //           CatID: req.body.CatID,
      //           showAlert: true,
      //           IsCat: true,
      //           layout: 'admin_main',
      //       };
      //       res.render('admin/product/add', vm);
      //   }).catch(err => {
      //       console.log(err);
      //       res.end('fail');
      //   });
});

router.get('/delete', restrict, restrict_admin,(req, res) => {
    var vm = {
        CatId: req.query.id,
        layout: 'admin_main',
    }
    res.render('admin/product/delete', vm);
});

router.post('/delete', restrict, restrict_admin,(req, res) => {
    productRepo.delete(req.body.ProID).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        if(req.body.CatID === ''){
            res.redirect('/admin/product/');
        } else{
            res.redirect(`/admin/product/byCat/${req.body.CatID}`);
        }
    });
});

router.get('/edit', restrict, restrict_admin,(req, res) => {
    var cat = false;
    if(req.query.catPath === 'true'){
        cat = true;
    }
    productRepo.single(req.query.id).then(p => {
        var vm = {
            Product: p[0],
            CatID: p[0].CatID,
            IsCat: cat,
            layout: 'admin_main',
        };
        res.render('admin/product/edit', vm);
    });
});

router.post('/edit', restrict, restrict_admin,(req, res) => {
    productRepo.update(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        if(req.body.IsCat === 'true'){
            res.redirect(`/admin/product/byCat/${req.body.CatID}`);
        } else{
            res.redirect('/admin/product/');
        }
        
    });
});

module.exports = router;