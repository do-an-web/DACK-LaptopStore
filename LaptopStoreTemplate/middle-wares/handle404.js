module.exports = (req, res, next) => {
    var vm = {
        title: 'Error',
    };
    res.statusCode = 404;
    res.render('error',vm);
};