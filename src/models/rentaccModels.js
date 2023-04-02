var dbpool = require("../config/connectDB")


module.exports = {
    getAllNameGame: function(callback = () => {}) {
        var sql = "SELECT * FROM rentaccount_namegame";
        dbpool.query(sql, function(err, result) {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        });
    },
    getAllAccount: function(callback = () => {}) {
        var sql = "SELECT rentaccount_account.id,rentaccount_account.typegame,rentaccount_account.account,rentaccount_account.password,rentaccount_status.clientid,rentaccount_status.clientname FROM `rentaccount_account` LEFT JOIN `rentaccount_status` ON rentaccount_account.id = rentaccount_status.id;"
        dbpool.query(sql, function(err, result) {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        });
    },
    addTypeGame: function(typegame, settingmacro, callback = () => {}) {
        var sql = "select * from rentaccount_namegame where typegame = ?"
        dbpool.query(sql, [typegame], function(err, insert) {
            if (err) {
                callback(err);
            } else {
                if (insert == "") {
                    dbpool.execute('insert into rentaccount_namegame(typegame, settingmacro) values (?, ?)', [typegame, settingmacro]);
                    callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/rentacc"; </script>`);
                } else {
                    callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng loại game"); window.location.href = "/rentacc"; </script>`);
                }
            }
        })
    },
    editTypeGame: function(typegameold, settingmacroold, typegamenew, settingmacronew, callback = () => {}) {
        var sql = 'UPDATE rentaccount_namegame SET typegame = ?, settingmacro = ? WHERE typegame = ? AND settingmacro = ?'
        dbpool.query(sql, [typegamenew, settingmacroold, typegameold, settingmacronew], function(err, edit) {
            if (err) {
                callback(err);
            } else {
                callback(null, `<script>window.alert("Sửa Thành công"); window.location.href = "/rentacc"; </script>`)
            }
        })
    },
    delTypeGame: function(typegame) {
        dbpool.execute('DELETE FROM rentaccount_namegame WHERE typegame = ?', [typegame])
        dbpool.execute('DELETE FROM rentaccount_account WHERE typegame = ?', [typegame])
    },
    addAccount: function(typegame, taikhoan, matkhau, callback = () => {}) {
        dbpool.query(`select * from rentaccount_account where typegame = ? and account = '${taikhoan}'`, typegame, function(err, account) {
            if (err) {
                callback(err);
                callback(null, `<script>window.alert("Lỗi cơ sở dữ liệu!!!"); window.location.href = "/"; </script>`)
            } else {
                dbpool.query(`SELECT COUNT(id) FROM rentaccount_account`, function(err, count) {
                    if (err) {
                        callback(err);
                    } else {
                        if (count == 1) {
                            dbpool.execute(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['count(id))'] + 1, typegame, taikhoan, matkhau]);
                        } else {
                            dbpool.query(`SELECT * FROM rentaccount_account ORDER BY id DESC LIMIT 1`, function(err, countid) {
                                if (err) {
                                    callback('Lỗi không kết nối được cơ sở dữ liệu');
                                } else {
                                    if (countid.length == 0) {
                                        dbpool.execute(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid.length + 1, typegame, taikhoan, matkhau]);
                                        callback(null, `<script>window.alert("Đã thêm thành công"); window.location.href = "/rentacc"; </script>`)
                                    } else {
                                        if (account == "") {
                                            dbpool.execute(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['id'] + 1, typegame, taikhoan, matkhau]);
                                            callback(null, `<script>window.alert("Đã thêm thành công"); window.location.href = "/rentacc"; </script>`)
                                        } else {
                                            callback(null, `<script>window.alert("Thêm thất bại vì đã trùng tài khoản"); window.location.href = "/rentacc"; </script>`)
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    editAccount: function(idaccount, typegamenew, taikhoannew, matkhaunew, callback = () => {}) {
        dbpool.query('select * from rentaccount_account where id = ?', idaccount, function(err, result) {
            if (err) {
                callback(err);
            } else {
                dbpool.query(`select * from rentaccount_account where typegame = ? and account = ?`, [typegamenew, taikhoannew], function(err, edit) {
                    if (err) {
                        callback(err);
                    } else {
                        if (edit == "") {
                            dbpool.execute('UPDATE rentaccount_account SET typegame = ?, account = ?, password = ? WHERE id = ?', [typegamenew, taikhoannew, matkhaunew, idaccount]);
                            callback(null, `<script>window.alert("Sửa Thành công"); window.location.href = "/rentacc"; </script>`)
                        } else {
                            callback(`<script>window.alert("Sửa thất bại vì đã trùng tài khoản"); window.location.href = "/rentacc"; </script>`)
                        }
                    }
                })
            }
        })
    },
    delAccount: function(typegame, taikhoan) {
        dbpool.execute(`DELETE FROM rentaccount_account WHERE typegame = ? and account = ?`, [typegame, taikhoan])
    }
}