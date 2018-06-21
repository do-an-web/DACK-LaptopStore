//var categoryRepo = require('../repos/categoryRepo');

module.exports = (req, res, next) => {

    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }

        res.locals.layoutVM = {
            isLogged: req.session.isLogged,
            curUser: req.session.user
        };
        next();
   /* categoryRepo.loadAll().then(rows => {
        res.locals.layoutVM = {
            categories: rows,
            suppliers: rows,
            isLogged: req.session.isLogged,
            curUser: req.session.user
        };

        // console.log(res.locals.layoutVM.curUser);

        next();
    });*/
};