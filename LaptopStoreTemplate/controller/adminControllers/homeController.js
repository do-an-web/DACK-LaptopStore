var express = require('express');
var categoryRepo = require('../repos/categoryRepo');

var router = express.Router();

router.get('/', (req, res) => {
<<<<<<< HEAD
    console.log("Page admin");
    var vm = {
        layout: 'admin_main.handlebars',
    }
    res.render('/admin/home/index');
=======
    res.render('home/index');
>>>>>>> d66dc15b93a4a3fa5beec94704dad4e48a68a332
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

module.exports = router;