require('dotenv').config()

const Type = process.env.TYPE_SQL || "sqlite"


if (Type == "mysql") {
    //khởi tạo truy xuất cơ sở dữ liệu mysql
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
        if (err) {
            console.log('Kết nối đến database không thành công!')
        } else {
            console.log('Kết nối đến MYSQL thành công.');
        }
    })
    module.exports = conn
} else if (Type == "sqlite") {
    //khởi tạo truy xuất cơ sở dữ liệu sqlite
    console.log("Connect SQLITE");
    var sqlite3 = require('sqlite3').verbose()
    var all = function(sql) {
        //khởi tạo hàm promise sqlite (all)
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE);
            const queries = [];
            db.each(`${sql}`, (err, row) => {
                if (err) {
                    reject(err); // tùy chọn: bạn có thể chọn nuốt lỗi.
                } else {
                    queries.push(row); // tích lũy dữ liệu
                }
            }, (err, n) => {
                if (err) {
                    reject(err); // tùy chọn: một lần nữa, bạn có thể chọn chấp nhận lỗi này.
                } else {
                    resolve(queries); // giải quyết lời hứa
                }
            });
            db.close()
        });
    }
    var get = function(sql, [order]) {
        //khởi tạo hàm promise sqlite (get)
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE);
            const queries = [];
            db.each(`${sql}`, [order], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    queries.push(row);
                }
            }, (err, n) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(queries);
                }
            });
            db.close()
        });
    }
    let db = new sqlite3.Database('./data/' + process.env.SQLITE_NAMEFILE, (err) => {
        //khởi tạo sqlite
        if (err) {
            return console.error(err.message);
        }
        console.log('Kết nối đến DBSQLITE thành công.');
    });
    module.exports = { all, get, db }
} else {
    //nếu lỗi khai báo trong env
    console.log("Setting ENV Chưa cài đặt đúng");
}