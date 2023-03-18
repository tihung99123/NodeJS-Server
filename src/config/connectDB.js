var mysql = require('mysql2')

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "serverthueacc"
})

conn.connect(function (err) {
    if (err) console.log('Kết nối đến database không thành công!')
})

module.exports = conn