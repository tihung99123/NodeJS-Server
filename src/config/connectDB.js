var mysql = require('mysql2')


var conn = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12612005",
    password: "KsEBcaue6I",
    port: "3306",
    database: "sql12612005"
})

conn.connect(function(err) {
    if (err) console.log('Kết nối đến database không thành công!')
})

module.exports = conn