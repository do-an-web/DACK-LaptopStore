var express = require('express');
var categoryRepo =require('../../repos/adminRepos/categoryRepo');
var restrict = require("../../middle-wares/restrict");
var restrict_admin = require("../../middle-wares/restrict_admin");
var router = express.Router();

router.get('/', restrict, restrict_admin,(req, res) => {
    categoryRepo.loadAll().then(rows => {
        var vm = {
            layout: 'admin_main',
            categories: rows
        };
        res.render('admin/category/index', vm);
    });
});

router.get('/add', restrict, restrict_admin,(req, res) => {
    var vm = {
        layout: 'admin_main',
        showAlert: false
    };
    res.render('admin/category/add', vm);
});

router.post('/add', restrict, restrict_admin,(req, res) => {
    categoryRepo.add(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
            showAlert: true
        };
        res.render('admin/category/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/delete', restrict, restrict_admin,(req, res) => {
    var vm = {
        layout: 'admin_main',
        CatId: req.query.id
    }
    res.render('admin/category/delete', vm);
});

router.post('/delete', restrict, restrict_admin,(req, res) => {
    categoryRepo.delete(req.body.CatId).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        res.redirect('/admin/category');
    });
});

router.get('/edit', restrict, restrict_admin,(req, res) => {
    console.log(req.query.id);
    categoryRepo.single(req.query.id).then(c => {
    	 console.log(c);
        var vm = {
            layout: 'admin_main',
            Category: c
        };
        res.render('admin/category/edit', vm);
    });
});

router.post('/edit', restrict, restrict_admin,(req, res) => {
    console.log("get data");
    categoryRepo.update(req.body).then(value => {
        console.log("get data");
        var vm = {
            layout: 'admin_main',
        };
        res.redirect('/admin/category');
    });
});


module.exports = router;