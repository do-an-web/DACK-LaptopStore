var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var vm = {
        // layout: '_layouts/main.layout.hbs',
        title: "Cart"
    };
    res.render('_pageUser/Cart/index', vm);
});

module.exports = router;
//goi controller render