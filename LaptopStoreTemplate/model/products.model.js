var db = require('../fn/db');
var config = require('../config/config');


exports.loadAll = () => {
    var sql = 'select * from products';
    return db.load(sql);
}
exports.loadAllBrands = () => {
    var sql = 'select * from categories';
    return db.load(sql);
}
exports.loadSameBrandsByCat = (catId) => {
    var sql = `select * from products where CatId = ${catId} limit 6 offset 0`;
    return db.load(sql);
}
exports.loadAllByPro = (offset) => {
    var sql = `select * from products limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}
exports.loadAllByCat = (catId,offset) => {
    var sql = `select * from products where CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}
exports.countByCat = () => {
    var sql = `select count(*) as total from products`;
    return db.load(sql);
}
exports.countByCatBrands = (catId) => {
    var sql = `select count(*) as total from products where CatID = ${catId}`;
    return db.load(sql);
}

exports.single = ProID => {
    var sql = `select * from products where ProID = ${ProID}`;
    return db.load(sql);
}