const e = require('express');
var dbpool = require('../config/connectDB')

let getHomepage = function(req, res) {
    // GetListAccount     GetListTypeGame
    dbpool.query("SELECT * FROM namegame", function(err, namegame) {
        if (err) {
            console.log(err);
        } else {
            dbpool.query("SELECT account.id,account.typegame,account.account,account.password,status.clientid,status.clientname FROM `account` LEFT JOIN `status` ON account.id = status.id;",
                function(err, account) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.render('index-rentacc', { DataType: JSON.stringify(namegame), DataAccount: JSON.stringify(account) })
                    }
                })

        }
    })
}

let addTypeGame = async(req, res) => {
    let { typegame, settingmacro } = req.body;
    dbpool.query("select * from namegame where typegame = ?  ", typegame, function(err, insert) {
        if (err) {
            console.log("Lỗi:", err);
        } else {
            if (insert == "") {
                dbpool.execute('insert into namegame(typegame, settingmacro) values (?, ?)', [typegame, settingmacro]);
                return res.send(`<script>window.alert("Thêm Thành công"); window.location.href = "/rentacc"; </script>`)
            } else {
                console.log("Có", insert);
                return res.send(`<script>window.alert("Thêm Thất Bại Vì đã trùng loại game"); window.location.href = "/rentacc"; </script>`)
            }
        }
    })
}

let editTypeGame = async(req, res) => {
    let { typegameold, settingmacroold, typegamenew, settingmacronew } = req.body;
    await dbpool.execute('UPDATE namegame SET typegame = ?, settingmacro = ? WHERE typegame = ? AND settingmacro = ?', [typegamenew, settingmacroold, typegameold, settingmacronew]);
    return res.redirect('/rentacc');
}

let delTypeGame = async(req, res) => {
    let typegame = req.body.typegame;
    await dbpool.execute('DELETE FROM namegame WHERE typegame = ?', [typegame])
    await dbpool.execute(`DROP TABLE account_${typegame}`)
    await dbpool.execute('DELETE FROM account WHERE typegame = ?', [typegame])
    return res.redirect('/rentacc');
}

let addAccount = async(req, res) => {
    let { typegame, taikhoan, matkhau } = req.body;
    if (typegame == "Chọn loại game") return res.redirect('/rentacc');
    dbpool.query(`select * from account where typegame = ? and account = '${taikhoan}'`, typegame, function(err, account) {
        if (err) {
            console.log(err);
            return res.send(`<script>window.alert("Lỗi cơ sở dữ liệu!!!"); window.location.href = "/"; </script>`)
        } else {
            dbpool.query(`SELECT COUNT(id) FROM account`, function(err, count) {
                if (err) {
                    console.log(err);
                } else {
                    if (count == 1) {
                        dbpool.execute(`insert into account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['count(id))'] + 1, typegame, taikhoan, matkhau]);
                    } else {
                        dbpool.query(`SELECT * FROM account ORDER BY id DESC LIMIT 1`, function(err, countid) {
                            if (err) {
                                console.log('Lỗi không kết nối được cơ sở dữ liệu');
                            } else {
                                if (account == "") {
                                    dbpool.execute(`insert into account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['id'] + 1, typegame, taikhoan, matkhau]);
                                    return res.send(`<script>window.alert("Đã thêm thành công"); window.location.href = "/rentacc"; </script>`)
                                } else {
                                    return res.send(`<script>window.alert("Thêm thất bại vì đã trùng tài khoản"); window.location.href = "/rentacc"; </script>`)
                                }
                            }
                        })
                    }
                }
            })
        }
    })
}

let editAccount = async(req, res) => {
    let { idaccount, typegamenew, taikhoannew, matkhaunew } = req.body;
    var bodyrequest = [{ id: parseInt(idaccount), typegame: typegamenew, account: taikhoannew, password: matkhaunew }]
    if (typegamenew == "Chọn loại game") return res.redirect('/rentacc');
    dbpool.query('select * from account where id = ?', idaccount, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            dbpool.query(`select * from account where typegame = ? and account = ?`, [typegamenew, taikhoannew], function(err, edit) {
                if (err) {
                    console.log(err);
                } else {
                    if (edit == "") {
                        dbpool.execute('UPDATE account SET typegame = ?, account = ?, password = ? WHERE id = ?', [typegamenew, taikhoannew, matkhaunew, idaccount]);
                        return res.redirect('/rentacc');
                    } else {
                        return res.send(`<script>window.alert("Sửa thất bại vì đã trùng tài khoản"); window.location.href = "/rentacc"; </script>`)
                    }
                }
            })
        }
    })
}

let delAccount = async(req, res) => {
    let { typegame, taikhoan } = req.body;
    await dbpool.execute(`DELETE FROM account WHERE typegame = ? and account = ?`, [typegame, taikhoan])
    return res.redirect('/rentacc');
}


module.exports = { getHomepage, addTypeGame, editTypeGame, delTypeGame, addAccount, editAccount, delAccount }