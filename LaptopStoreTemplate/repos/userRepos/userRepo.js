var db = require('../../fn/db');

exports.add = user => {
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permission})`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from users where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}

exports.update = (user) => {
    var sql = `update users set f_Name = '${user.fullname}', f_Email = '${user.email}' , f_DOB = '${user.dob}' where f_ID = ${user.ID}`;
    return db.save(sql);
}

exports.loadAllOrdersByUserID = userID =>{
    var sql = `select o.OrderID, p.ProName , o.OrderDate, o.Total from products as p , orders o where p.ProID = o.UserID`;
    return db.save(sql);
}
exports.singleOrderByOrderID = OrderID =>{
    var sql = `select p.ProID, p.ProName, od.Quantity, od.Price, od.OrderID, o.OrderDate, o.Total from products as p, orderdetails as od, orders as o where od.OrderID = ${OrderID} and od.ProID = p.proID and od.OrderID = o.OrderID`;
    return db.save(sql);
}
