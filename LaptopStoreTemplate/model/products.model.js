var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from products';
    return db.load(sql);
}