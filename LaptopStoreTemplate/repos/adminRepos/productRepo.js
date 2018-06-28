var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from products';
    return db.load(sql);
}

exports.loadAllByCat = (catId) => {
    var sql = `select * from products where CatID = ${catId}`;
    return db.load(sql);
}

// exports.loadAllByCat = (catId, offset) => {
//     var sql = `select * from products where CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
//     return db.load(sql);
// }

exports.countByCat = catId => {
	var sql = `select count(*) as total from products where CatID = ${catId}`;
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from products where ProID = ${proId}`;
    return db.load(sql);
}

exports.add = (p) => {
    var sql = `insert into products(ProName, Factory, Overview, Detail, Price, CatID, Quantity, Views, Image) values('${p.ProName}', '${p.Factory}', '${p.Overview}', '${p.Detail}', '${p.Price}', '${p.CatID}', '${p.Quantity}', '${p.Views}', '${p.Image}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from products where ProID = '${id}'`;
    return db.save(sql);
}

exports.update = (p) => {
    var sql = `update products set ProName = '${p.ProName}', Factory = '${p.Factory}', Overview = '${p.Overview}', Detail = '${p.Detail}', Price = '${p.Price}', CatID = '${p.CatID}', Quantity = '${p.Quantity}', Views = '${p.Views}', Image = '${p.Image}'where ProID = '${p.ProID}'`;
    return db.save(sql);
}