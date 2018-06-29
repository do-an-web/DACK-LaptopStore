var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var userRepo = require('../repos/userRepos/userRepo');
var paymentRepo = require('../repos/userRepos/paymentRepo');

var config = require('../config/config');
// var productRepo = require('../model/products.model');

var restrict = require('../middle-wares/restrict');
var router = express.Router();

// var Recaptcha = require('express-recaptcha').Recaptcha;
 
// var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY');


/*app.get('/', recaptcha.middleware.render, function(req, res){
  res.render('login', { captcha:res.recaptcha });
});*/
let request = require('request');


router.get('/signin', /*recaptcha.middleware.render,*/(req, res) => {

    var vm = {
        //layout: 'user.layout.hbs',
        title: "Sign In"
    };
    res.render('_pageUser/SignIn/index',vm);
});

router.post('/signin', (req, res) => {

    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString()
    };

    userRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];

            var url = '/';
            if (rows[0].f_Permission === 1)
            {
                url ='/admin'
            }
            else
            {
                if (req.session.current_url) {
                    url = req.session.current_url;
                }
            }

            res.redirect(url);
        } else {
            var vm = {
                title: "Sign In",
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('_pageUser/SignIn/index', vm);
        }
    });
});

router.get('/register', (req, res) => {
    var vm = {
        title: "Register"
    };
    
    res.render('_pageUser/SignUp/index',vm);
});

router.post('/register', (req, res) => {

    //chưa ấn captcha
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        var vm = {
            title: "Register",
            showError: true,
            errorMsg: 'Please select captcha'
        };
        res.render('_pageUser/SignUp/index', vm);
        return;
    }
    var secretKey = "6LdZglQUAAAAAFwlkKxgD7hiYJmwEea6dTZzGmZE";
    
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // captcha sai
        if(body.success !== undefined && !body.success) {
            var vm = {
                title: "Register",
                showError: true,
                errorMsg: 'Failed captcha verification'
            };
            res.render('_pageUser/SignUp/index', vm);
            return;
        }
        //captcha đúng
        var dob = moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DD');
        var user = {
            username: req.body.username,
            password: SHA256(req.body.rawPWD).toString(),
            name: req.body.name,
            email: req.body.email,
            dob: dob,
            permission: 0
        };

        userRepo.add(user).then(value => {
            var vm = {
                title: "Register"
            };            
            res.render("_pageUser/SignUp/index",vm);
        });
    });
});

router.post('/logout', restrict, (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    
    res.redirect(req.headers.referer);
});

router.get('/profile', restrict,(req, res) => {

    var userID = res.locals.layoutVM.curUser.f_ID;
    var p0 = userRepo.loadAllOrdersByUserID(userID);
    var bill = [];

    var page = req.query.list;

    if (!page) {
        page = 1;
    }
    var offset = (page - 1) * config.BILL_PER_PAGE;

    Promise.all([p0]).then(([rows]) => {
        for (let i = 0; i < rows.length; i++) {
            rows[i].OrderDate = rows[i].OrderDate.toLocaleString();
        }
        var date = new Date(res.locals.layoutVM.curUser.f_DOB);
        date = date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();

        var nPages = rows.length / config.BILL_PER_PAGE;
        if (rows.length % config.BILL_PER_PAGE > 0) {
            nPages++;
        }
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                pagination: i,
                isCurPage: i === +page
            });
        }
        bill = rows.slice((Number(page)-1)* config.BILL_PER_PAGE,Number(page)* config.BILL_PER_PAGE);


        var vm = {
            title: "Profile",
            orders: bill,
            page_numbers: numbers,
            isProfile: true,
            birth: date
        };
        res.render('_pageUser/InfoAccount/index', vm);
    });
});

router.get('/history', restrict,(req, res) => {
    var userID = res.locals.layoutVM.curUser.f_ID;
    var p0 = userRepo.loadAllOrdersByUserID(userID);
    var bill = [];

    var page = req.query.list;

    if (!page) {
        page = 1;
    }
    var offset = (page - 1) * config.BILL_PER_PAGE;

    Promise.all([p0]).then(([rows]) => {
        for (let i = 0; i < rows.length; i++) {
            rows[i].OrderDate = rows[i].OrderDate.toLocaleString();
        }
        var date = new Date(res.locals.layoutVM.curUser.f_DOB);
        date = date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();

        var nPages = rows.length / config.BILL_PER_PAGE;
        if (rows.length % config.BILL_PER_PAGE > 0) {
            nPages++;
        }
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                pagination: i,
                isCurPage: i === +page
            });
        }
        bill = rows.slice((Number(page)-1)* config.BILL_PER_PAGE,Number(page)* config.BILL_PER_PAGE);


        var vm = {
            title: "Profile",
            orders: bill,
            page_numbers: numbers,

            birth: date
        };
        res.render('_pageUser/UserHistory/index', vm);
    });

});

router.get('/history_detail/:OrderID', restrict,(req, res) => {
    var OrderID = req.params.OrderID;
    var amountAll = 0;
    
    userRepo.singleOrderByOrderID(OrderID).then(row =>{
        for (let i = 0; i < row.length; i++) {
            row[i].OrderDate = row[i].OrderDate.toLocaleString();
            amountAll += row[i].Quantity;
        }
        
        var vm = {
            title: "User History Detail",
            order: row,
            amount: amountAll,
            Total: row[0].Total
        };
        res.render('_pageUser/UserHistoryDetail/index', vm);
    })
   
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
    res.locals.layoutVM.curUser.f_DOB = mdob;

    userRepo.update(user).then(rows => {

        var userID = res.locals.layoutVM.curUser.f_ID;
        var p0 = userRepo.loadAllOrdersByUserID(user.ID);
        var notify = `<div class="alert alert-danger notify2"><button type="button" class="close">×</button>Success</div>`;
        Promise.all([p0]).then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                rows[i].OrderDate = rows[i].OrderDate.toLocaleString();
            }
            var date = new Date(res.locals.layoutVM.curUser.f_DOB);
            date = date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();

            var vm = {
                title: "Profile",
                notify : notify,
                birth: date
            };
            res.render('_pageUser/InfoAccount/index', vm);
        });
        // res.redirect('/user/profile');
    }), function (reason) {
        var p0 = userRepo.loadAllOrdersByUserID(user.ID);
        var notify = `<div class="alert alert-danger notify2"><button type="button" class="close">×</button>Failure</div>`;
        Promise.all([p0]).then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                rows[i].OrderDate = rows[i].OrderDate.toLocaleString();
            }
            var date = new Date(res.locals.layoutVM.curUser.f_DOB);
            date = date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();

            var vm = {
                title: "Profile",
                notify : notify,
                birth: date
            };
            res.render('_pageUser/InfoAccount/index', vm);
        });
    };


});



module.exports = router;