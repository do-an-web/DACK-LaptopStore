var express = require('express');
var orderRepo = require('../../repos/adminRepos/orderRepo');

var router = express.Router();

router.get('/', (req, res) => {
    console.log("page order admin");
    var results = [];
    var p1 = orderRepo.loadAll();
    var p2 = orderRepo.loadUserByRole(1);
    Promise.all([p1, p2]).then(([pRows, pUsers]) => {
        for(i=0;i<pRows.length;i++){
            for(j=0;j<pUsers.length;j++){
                if(pRows[i].UserID === pUsers[j].f_ID){

                    results.push({
                        OrderID: pRows[i].OrderID,
                        OrderDate: pRows[i].OrderDate,
                        User: pUsers[j].f_Username,
                        Total: pRows[i].Total,
                        Status: pRows[i].Status,
                        Processing: pRows[i].Status === 'Processing',
                        Delivering: pRows[i].Status === 'Delivering',
                        Done: pRows[i].Status === 'Done'
                    });
                    // console.log(pRows[i].OrderID);
                    // console.log(pRows[i].OrderDate);
                    // console.log(pUsers[j].f_Username);
                    // console.log(pRows[i].Total);
                    // console.log(pRows[i].Status);
                }
            }
            
        }
        var vm = {
            Results: results,
            layout: 'admin_main',
        };
        console.log(results);
        res.render('admin/orders/index', vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        showAlert: false,
        layout: 'admin_main',
    };
    res.render('admin/category/add', vm);
});
// **********************
router.post('/processing', (req, res) => {
    orderRepo.update(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        res.redirect('/admin/orders');
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        CatId: req.query.id,
        layout: 'admin_main',
    }
    res.render('admin/category/delete', vm);
});

router.post('/delivering', (req, res) => {
    orderRepo.update(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        res.redirect('/admin/orders');
    });
});

router.get('/edit', (req, res) => {
    console.log(req.query.id);
    orderRepo.single(req.query.id).then(c => {
    	 console.log(c);
        var vm = {
            Category: c,
            layout: 'admin_main',
        };
        res.render('admin/category/edit', vm);
    });
});

router.post('/done', (req, res) => {
    orderRepo.update(req.body).then(value => {
        var vm = {
            layout: 'admin_main',
        };
        res.redirect('/admin/orders');
    });
});

router.get('/details/:orderId', (req, res) => {
    var orderId = req.params.orderId;

    var results = [];
    var p1 = orderRepo.loadAllByOrderID(orderId);
    var p2 = orderRepo.loadAllProductNames();
    Promise.all([p1, p2]).then(([pRows, pPros]) => {
        for(i=0;i<pRows.length;i++){
            for(j=0;j<pPros.length;j++){
                if(pRows[i].ProID === pPros[j].ProID){

                    results.push({
                        ID: pRows[i].ID,
                        OrderID: pRows[i].OrderID,
                        Product: pPros[j].ProName,
                        Quantity: pRows[i].Quantity,
                        Price: pRows[i].Price,
                        Amount: pRows[i].Amount,
                    });
                    console.log(results[i]);
                }
            }
            
        }
        var vm = {
            Results: results,
            layout: 'admin_main',
        };
        res.render('admin/orders/orderDetails', vm);
    });
});

module.exports = router;