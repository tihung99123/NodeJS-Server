var dbpool = require('../config/connectDB')

const Account = function(acc) {
    this.typegame = acc.typegame
    this.settingmacro = acc.settingmacro
    this.taikhoan = acc.taihkhoan
    this.matkhau = acc.matkhau
    this.tinhtrang = acc.tinhtrang
}

Account.getacc = function(id) {
    var data = {
        typegame: "gametest",
        taikhoan: id,
        matkhau: "123456",
        tinhtrang: "donknow"
    }
    return data
}

Account.getalltype = function() {
    dbpool.query("SELECT * FROM namegame", function(err, data) {
        return data;
    })
}

module.exports = Account