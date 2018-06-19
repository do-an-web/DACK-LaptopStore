var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var vm = {
        layout: 'user.layout.hbs',
        title: "Sign Up"
    };
    res.render('_pageUser/SignUp/index', vm);
});

module.exports = router;
//goi controller render