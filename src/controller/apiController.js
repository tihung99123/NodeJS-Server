var dbpool = require('../config/connectDB')

let GetAllType = function(req, res) {
    dbpool.query("SELECT * FROM namegame", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
}
let GetAllAccount = function(req, res) {
    dbpool.query("SELECT * FROM account", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
}

let GetAccount = function(req, res) {
    dbpool.query("SELECT * FROM account WHERE taikhoan = ?", req.params.id, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
}

module.exports = { GetAllType, GetAllAccount, GetAccount }