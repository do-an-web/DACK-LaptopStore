var express = require('express');
var categoryRepo =require('../../repos/adminRepos/categoryRepo');

var router = express.Router();

router.get('/', (req, res) => {
    categoryRepo.loadAll().then(rows => {
        var vm = {
            layout: 'admin_main',
            categories: rows
        };
        res.render('admin/category/index', vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        layout: 'admin_main',
        showAlert: false
    };
    res.render('admin/category/add', vm);
});

router.post('/add', (req, res) => {
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

router.get('/delete', (req, res) => {
    var vm = {
        layout: 'admin_main',
        CatId: req.query.id
    }
    res.render('admin/category/delete', vm);
});

router.post('/delete', (req, res) => {
    categoryRepo.delete(req.body.CatId).then(value => {
        var vm = {
            layout: 'admin_main',
        }
        res.redirect('/category',vm);
    });
});

router.get('/edit', (req, res) => {
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

router.post('/edit', (req, res) => {
    categoryRepo.update(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
        }
        res.redirect('/category',vm);
    });
});


module.exports = router;