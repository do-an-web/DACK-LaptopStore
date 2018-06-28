//var categoryRepo = require('../repos/categoryRepo');

module.exports = (req, res, next) => {

    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
    var cartProduct = 0;
    if(req.session.cart !== undefined)
        cartProduct = Object.keys(req.session.cart).length;

    res.locals.layoutVM = {
        isLogged: req.session.isLogged,
        curUser: req.session.user,
        cartProducts: cartProduct
    };
    next();
};