var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    console.log("Page admin");
    var vm = {
        layout: 'admin_main.handlebars',
    }
    res.render('/admin/home/index');
});

router.get('/about', (req, res) => {
    res.render('admin/home/about');
});

module.exports = router;