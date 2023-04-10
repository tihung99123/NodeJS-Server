require('dotenv').config()

const Type = process.env.TYPE_SQL || "sqlite"

if (Type == "mysql") {
    console.log("Connect MYSQL");
    var mysql = require('mysql2')

    var conn = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE
    })
    conn.connect(function(err) {
        if (err) console.log('Kết nối đến database không thành công!')
    })
    module.exports = conn


} else if (Type == "sqlite") {
    console.log("Connect SQLITE");
    var sqlite3 = require('sqlite3').verbose()
    var all = function(sql) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE);
            const queries = [];
            db.each(`${sql}`, (err, row) => {
                if (err) {
                    reject(err); // optional: you might choose to swallow errors.
                } else {
                    queries.push(row); // accumulate the data
                }
            }, (err, n) => {
                if (err) {
                    reject(err); // optional: again, you might choose to swallow this error.
                } else {
                    resolve(queries); // resolve the promise
                }
            });
            db.close()
        });
    }
    var get = function(sql, [order]) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE);
            const queries = [];
            db.each(`${sql}`, [order], (err, row) => {
                if (err) {
                    reject(err); // optional: you might choose to swallow errors.
                } else {
                    queries.push(row); // accumulate the data
                }
            }, (err, n) => {
                if (err) {
                    reject(err); // optional: again, you might choose to swallow this error.
                } else {
                    resolve(queries); // resolve the promise
                }
            });
            db.close()
        });
    }
    let db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Kết nối đến DBSQLITE thành công.');
    });
    module.exports = { all, get, db }

} else {
    console.log("Setting ENV Chưa cài đặt đúng");
}