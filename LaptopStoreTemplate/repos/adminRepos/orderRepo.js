var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from orders';
    return db.load(sql);
}

exports.loadUserByRole = (role) => {
    var sql = `select * from users where f_Permission = ${role}`;
    return db.load(sql);
}

exports.loadAllByOrderID = (orderId) => {
    var sql = `select * from orderdetails where OrderID = ${orderId}`;
    return db.load(sql);
}

exports.loadAllProductNames = () => {
    var sql = 'select ProID, ProName from products';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from categories where CatID = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into categories(catname) values('${c.CatName}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from categories where CatID = ${id}`;
    return db.save(sql);
}

exports.update = (o) => {
    var sql = `update orders set Status = '${o.Status}' where OrderID = ${o.OrderID}`;
    return db.save(sql);
}
