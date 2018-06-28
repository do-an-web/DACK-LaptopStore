var mysql = require('mysql');
console.log('Get connection...');

exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'laptoponline'
        });
        cn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    cn.query(sql, function(error, rows, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(rows);
        }

        cn.end();
    });
});
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'laptoponline'
        });

        cn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });

        console.log('Save connected');

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}