var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('/admin/home/index');
});

router.get('/about', (req, res) => {
    res.render('admin/home/about');
});

module.exports = router;