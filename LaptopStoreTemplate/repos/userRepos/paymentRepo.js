var db = require('../../fn/db');

exports.addOrder = item => {
    var sql = `insert into orders(OrderDate, UserID, Total, Status) values('${item.OrderDate}', '${item.UserID}', '${item.Total}', 'Processing')`;
    return db.save(sql);
}
exports.addOrderDetail = details => {
    var sql = `insert into orderdetails(OrderID, ProID, Quantity, Price, Amount) values('${details.OrderID}', '${details.Product.ProID}', '${details.Quantity}', '${details.Product.Price}', '${details.Amount}')`;
    return db.save(sql);
}
exports.single = item => {
    var sql = `select * from orders where UserID = '${item.UserID}' and OrderDate = '${item.OrderDate}'`;
    return db.load(sql);
}
exports.loadAll = () => {
    var sql = `select * from orders`;
    return db.load(sql);
}
