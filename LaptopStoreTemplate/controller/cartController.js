var express =  require('express');
var restrict = require('../middle-wares/restrict');
var products = require('../model/products.model');
var cartRepo = require('../repos/userRepos/cartRepo');
var router = express.Router();

/* GET home page. */
router.get('/', restrict, (req, res) => {
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
        var total = 0;
        for (let j = 0; j < items.length; j++) {
            total += items[j].Amount;
        }
        var vm = {
            items: items,
            totalAmount: total,
            title: "Cart"
        };
        res.render('_pageUser/Cart/index',vm);
    });    
});

router.post('/add', (req, res) => {

    var item = {
        ProId: req.body.proId,
        Quantity: +req.body.quantity
    };
    cartRepo.add(req.session.cart, item);
    
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartRepo.remove(req.session.cart, req.body.ProId);
    
    res.redirect(req.headers.referer);
});

module.exports = router;