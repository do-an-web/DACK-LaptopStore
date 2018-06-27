var express =  require('express');
var restrict = require('../middle-wares/restrict');
var restrict_payment = require('../middle-wares/restrict_payment');
var products = require('../model/products.model');
var paymentRepo = require('../repos/userRepos/paymentRepo');
var router = express.Router();

/* GET home page. */
router.get('/:totalAmount', restrict, restrict_payment, (req, res) => {
    var totalAmount = +req.params.totalAmount;
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = products.single(cartItem.ProId);
        
        arr_p.push(p);
    }
    
    var items = [];
    Promise.all(arr_p).then(result => {
        
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Price * req.session.cart[i].Quantity
            };
            items.push(item);
        }
        var vm = {
            items: items,
            totalAmount: totalAmount,
            title: "Payment"
        };
        res.render('_pageUser/Payment/index',vm);
    });    
});

router.post('/order', (req, res) => {
    var cart = req.session.cart;
    req.session.cart = [];
    var date = new Date().toLocaleString();
    var userID = res.locals.layoutVM.curUser.f_ID;
    var total = req.body.Total;
    var item = {
        OrderDate: date,
        UserID: userID,
        Total: total
    };

    var arr_p = [];
    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];
        var p = products.single(cartItem.ProId);
        
        arr_p.push(p);
    }
    var details = [];

    var p1 = paymentRepo.addOrder(item);
    var p2 = paymentRepo.single(item);
    Promise.all(arr_p).then(result => {
        Promise.all([p1]).then(([value]) => {
            p2.then(order =>{
                for (var i = result.length - 1; i >= 0; i--) {
                    var pro = result[i][0];
                    var temp = {
                        OrderID: order[0].OrderID,
                        Product: pro,
                        Quantity: cart[i].Quantity,
                        Amount: pro.Price * cart[i].Quantity
                    };
                    details.push(temp);                                     
                }
                for (var i = 0; i < details.length; i++) {
                    paymentRepo.addOrderDetail(details[i]);
                }
            });
            res.redirect("/user/history");
        });
    });
});

module.exports = router;