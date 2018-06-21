var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var userRepo = require('../repos/userRepo');

var router = express.Router();

/*router.get('/login', (req, res) => {
    res.render('user/login');
});
*/

/* GET home page. */
router.get('/signin', (req, res) => {
    /*var vm = {
       // layout: 'user.layout.hbs',
        title: "Sign In"
    };*/
    res.render('user/signin');
});

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.get('/profile', (req, res) => {
    res.render('user/profile');
});

router.post('/signin', (req, res) => {
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString()
    };

    userRepo.login(user).then(rows => {
        if (rows.length > 0) {
            // user = rows[0];

            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];

            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);

        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('user/signin', vm);
        }
    });
});
/*Dk tai khoang*/
router.post('/signup', (req, res) => {

    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');

    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };

    userRepo.add(user).then(value => {
        res.render('user/signin');
    });
});


module.exports = router;