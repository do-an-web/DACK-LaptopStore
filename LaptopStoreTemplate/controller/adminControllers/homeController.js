var express = require('express');
var categoryRepo = require('../../repos/adminRepos/categoryRepo')

var router = express.Router();

router.get('/', (req, res) => {
    console.log("Page admin");
    var vm = {
        layout: 'admin_main',
    }
    res.render('admin/home/index',vm);
});

router.get('/about', (req, res) => {
    var vm = {
        layout: 'admin_main',
    }
    res.render('admin/home/about',vm);
});

module.exports = router;