var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var userRepo = require('../repos/userRepo');

var restrict = require('../middle-wares/restrict');
var router = express.Router();

/*router.get('/login', (req, res) => {
    res.render('user/login');
});
*/

/* GET home page. */
router.get('/signin', (req, res) => {
    var vm = {
       // layout: 'user.layout.hbs',

        title: "Sign In"
    };
    res.render('user/signin',vm);
});

router.get('/register', (req, res) => {
     var vm = {
       // layout: 'user.layout.hbs',
        title: "Register"
    };
    res.render('user/register',vm);
});

router.get('/profile', restrict,(req, res) => {
    
    var date = new Date(res.locals.layoutVM.curUser.f_DOB);
    date = date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();
    var vm = {
       // layout: 'user.layout.hbs',
        title: "Profile",
        birth: date
    };
    res.render('user/profile', vm);
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

            var url = '/user/profile';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);

        } else {
            var vm = {
                title: "Sign In",
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('user/signin', vm);
        }
    });
});
/*Dk tai khoang*/
router.post('/register', (req, res) => {

    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');

        /*var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('D/M/YYYY');*/

    
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };

    userRepo.add(user).then(value => {
        res.render('/user/register');
    });
});
router.post('/update', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    
    res.redirect(req.headers.referer);
});

router.post('/edit', (req, res) => {

    var mdob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');

    var user = {
        ID: res.locals.layoutVM.curUser.f_ID,
        dob: mdob,
        fullname: req.body.name,
        email: req.body.email
    };

    
        res.locals.layoutVM.curUser.f_Name = user.fullname;
        res.locals.layoutVM.curUser.f_Email = user.email;

   /*var mdob1 = moment(mdob, 'D/M/YYY')
        .format('YYYY-MM-DD');*/


        res.locals.layoutVM.curUser.f_DOB = mdob;

    userRepo.update(user).then(rows => {
       

        res.redirect('/user/profile');
    });
});

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    
    res.redirect(req.headers.referer);
});

module.exports = router;