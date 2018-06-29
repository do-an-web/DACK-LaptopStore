module.exports = (req, res, next) => {
    if (req.session.user.f_Permission === 1) {
        next();
    } else {
        res.redirect(`/`);
    }
}