module.exports = (req, res, next) => {
    if (res.locals.layoutVM.cartProducts !== 0) {
        next();
    } else {
        res.redirect(`/cart/?retUrl=${req.originalUrl}`);
    }
}