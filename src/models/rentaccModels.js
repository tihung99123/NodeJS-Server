var dbpool = require("../config/connectDB")
require('dotenv').config()
const Type = process.env.TYPE_SQL || "sqlite"

let getAllNameGame = async () => {
    var sql = "SELECT * FROM `rentaccount_namegame`";
    if (Type == "mysql") {
        let namegame = await dbpool.promise().query(sql)
        return namegame
    } else if (Type == "sqlite") {
        let namegame = await dbpool.all(sql)
        return namegame
    }
}

let getAllAccount = async () => {
    var sql = "SELECT rentaccount_account.id,rentaccount_account.typegame,rentaccount_account.account,rentaccount_account.password,rentaccount_status.clientid,rentaccount_status.clientname FROM `rentaccount_account` LEFT JOIN `rentaccount_status` ON rentaccount_account.id = rentaccount_status.id;"
    if (Type == "mysql") {
        let account = await dbpool.promise().query(sql)
        return account
    } else if (Type == "sqlite") {
        let account = await dbpool.all(sql)
        return account
    }
}

module.exports = {
    getAllNameGame,
    getAllAccount,
    addTypeGame: function(typegame, settingmacro, callback = () => {}) {
        var sql = "select * from rentaccount_namegame where typegame = ?"
        if (Type == "mysql") {
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
        } else if (Type == "sqlite") {
            dbpool.db.all(sql, [typegame], function(err, insert) {
                if (err) {
                    callback(err);
                } else {
                    if (insert == "") {
                        dbpool.db.run('insert into rentaccount_namegame(typegame, settingmacro) values (?, ?)', [typegame, settingmacro]);
                        callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/rentacc"; </script>`);
                    } else {
                        callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng loại game"); window.location.href = "/rentacc"; </script>`);
                    }
                }
            });
        }
    },
    editTypeGame: function(typegameold, settingmacroold, typegamenew, settingmacronew, callback = () => {}) {
        var sql = `UPDATE rentaccount_namegame SET typegame = ?, settingmacro = ? WHERE typegame = ? AND settingmacro = ?`
        if (Type == "mysql") {
            dbpool.query(sql, [typegamenew, settingmacronew, typegameold, settingmacroold], function(err, edit) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, `<script>window.alert("Sửa Thành công"); window.location.href = "/rentacc"; </script>`)
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.run(sql, [typegamenew, settingmacronew, typegameold, settingmacroold], function(err, edit) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, `<script>window.alert("Sửa Thành công"); window.location.href = "/rentacc"; </script>`)
                }
            })
        }

    },
    delTypeGame: function(typegame) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM rentaccount_namegame WHERE typegame = ?', [typegame])
            dbpool.execute('DELETE FROM rentaccount_account WHERE typegame = ?', [typegame])
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM rentaccount_namegame WHERE typegame = '${typegame}'`)
            dbpool.db.run(`DELETE FROM rentaccount_account WHERE typegame = '${typegame}'`)
        }

    },
    addAccount: function(typegame, taikhoan, matkhau, callback = () => {}) {
        if (Type == "mysql") {
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
        } else if (Type == "sqlite") {
            dbpool.all(`select * from rentaccount_account where typegame = '${typegame}'and account = '${taikhoan}'`, function(err, account) {
                if (err) {
                    callback(err);
                    callback(null, `<script>window.alert("Lỗi cơ sở dữ liệu!!!"); window.location.href = "/"; </script>`)
                } else {
                    dbpool.all(`SELECT COUNT(id) FROM rentaccount_account`, function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            if (count == 1) {
                                dbpool.db.run(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['count(id))'] + 1, typegame, taikhoan, matkhau]);
                            } else {
                                dbpool.all(`SELECT * FROM rentaccount_account ORDER BY id DESC LIMIT 1`, function(err, countid) {
                                    if (err) {
                                        callback('Lỗi không kết nối được cơ sở dữ liệu');
                                    } else {
                                        if (countid.length == 0) {
                                            dbpool.db.run(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid.length + 1, typegame, taikhoan, matkhau]);
                                            callback(null, `<script>window.alert("Đã thêm thành công"); window.location.href = "/rentacc"; </script>`)
                                        } else {
                                            if (account == "") {
                                                dbpool.db.run(`insert into rentaccount_account(id, typegame, account, password) values (?, ?, ?, ?)`, [countid[0]['id'] + 1, typegame, taikhoan, matkhau]);
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
        }

    },
    editAccount: function(idaccount, typegamenew, taikhoannew, matkhaunew, callback = () => {}) {
        if (Type == "mysql") {
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
        } else if (Type == "sqlite") {
            dbpool.db.all('select * from rentaccount_account where id = ?', idaccount, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.db.run(`select * from rentaccount_account where typegame = ? and account = ?`, [typegamenew, taikhoannew], function(err, edit) {
                        if (err) {
                            callback(err);
                        } else {
                            if (edit == "") {
                                dbpool.db.run('UPDATE rentaccount_account SET typegame = ?, account = ?, password = ? WHERE id = ?', [typegamenew, taikhoannew, matkhaunew, idaccount]);
                                callback(null, `<script>window.alert("Sửa Thành công"); window.location.href = "/rentacc"; </script>`)
                            } else {
                                callback(`<script>window.alert("Sửa thất bại vì đã trùng tài khoản"); window.location.href = "/rentacc"; </script>`)
                            }
                        }
                    })
                }
            })
        }

    },
    delAccount: function(typegame, taikhoan) {
        if (Type == "mysql") {
            dbpool.execute(`DELETE FROM rentaccount_account WHERE typegame = ? and account = ?`, [typegame, taikhoan])
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM rentaccount_account WHERE typegame = ? and account = ?`, [typegame, taikhoan])
        }
    }
}