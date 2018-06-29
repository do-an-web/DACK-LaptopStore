var express = require('express');
var categoryRepo = require('../../repos/adminRepos/categoryRepo')
var restrict = require("../../middle-wares/restrict");
var restrict_admin = require("../../middle-wares/restrict_admin");
var router = express.Router();

router.get('/',restrict, restrict_admin, (req, res) => {
    console.log("Page admin");
    var vm = {
        layout: 'admin_main',
    }
    res.render('admin/home/index',vm);
});

router.get('/about',restrict, restrict_admin, (req, res) => {
    var vm = {
        layout: 'admin_main',
    }
    res.render('admin/home/about',vm);
});

module.exports = router;