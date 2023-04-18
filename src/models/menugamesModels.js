var dbpool = require("../config/connectDB")
var fs = require('fs')
require('dotenv').config()
const Type = process.env.TYPE_SQL || "sqlite"

// Lấy thông tin các Category của DB
let getAllCategory = async() => {
    var sql = "select * from `menugames_category`";
    if (Type == "mysql") {
        let category = await dbpool.promise().query(sql)
        return category
    } else if (Type == "sqlite") {
        let category = await dbpool.all(sql)
        return category
    }
}

// Lấy toàn bộ thông tin itemgame của menu
let getAllItemGames = async() => {
    var sql = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.exe, menugames_itemgames.parameter, menugames_itemgames.linkfolder_target, menugames_itemgames.linkfolder_link, menugames_itemgames.reg_id, menugames_batchcmd.encode_batchcmd FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list LEFT JOIN menugames_batchcmd on menugames_itemgames.id_list = menugames_batchcmd.id_list ORDER by number ASC;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return itemgames
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return itemgames
    }
}


// Lấy toàn bộ thông tin thứ tự sắp xếp của menu
let getSortOrderItems = async() => {
    var sql = "SELECT * from menugames_sortorder order by number asc;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return itemgames
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return itemgames
    }
}

module.exports = {
    getAllCategory,
    getAllItemGames,
    getSortOrderItems,
    // lấy dữ liệu từ client và lưu sắp sếp thứ tự item vào dB
    saveListGame: function(saved_listgame, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_sortorder`')
            for (var key in saved_listgame) {
                dbpool.execute('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [saved_listgame[key].number, saved_listgame[key].api_id, saved_listgame[key].api_id])
            }
            callback("/menugames")
        } else if (Type == "sqlite") {
            dbpool.db.run('DELETE FROM `menugames_sortorder`')
            for (var key in saved_listgame) {
                dbpool.db.run('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [saved_listgame[key].number, saved_listgame[key].api_id, saved_listgame[key].api_id])
            }
            callback("/menugames")
        }
    },
    // thêm thể loại game vào db
    addCategory: function(category_name, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.query(`SELECT * FROM menugames_category where name = '${category_name}'`, function(err, insert) {
                if (err) {
                    callback("Lỗi:", err);
                } else {
                    if (insert == "") {
                        dbpool.query("SELECT count(id) AS count FROM menugames_category;", function(err, count) {
                            if (err) {
                                callback("Lỗi:", err);
                            } else {
                                dbpool.execute('insert into menugames_category(id, name) values (?, ?)', [count[0]["count"] + 1, category_name]);
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                            }
                        })
                    } else {
                        return callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "/menugames"; </script>`)
                    }
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.all(`SELECT * FROM menugames_category where name = '${category_name}'`, function(err, insert) {
                if (err) {
                    callback("Lỗi:", err);
                } else {
                    if (insert == "") {
                        dbpool.db.all("SELECT count(id) AS count FROM menugames_category;", function(err, count) {
                            if (err) {
                                callback("Lỗi:", err);
                            } else {
                                dbpool.db.run('insert into menugames_category(id, name) values (?, ?)', [count[0]["count"] + 1, category_name]);
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                            }
                        })
                    } else {
                        return callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "/menugames"; </script>`)
                    }
                }
            })
        }
    },
    // chỉnh tên thể loại
    editCategory: function(id, category_new, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.query(`UPDATE menugames_category SET name = '${category_new}' WHERE id = ${id}`, function(err) {
                if (err) {
                    callback(null, `<script>window.alert("chỉnh sửa Thất Bại Vì đã trùng thể loại");</script>`)
                } else {
                    callback(null, `<script>window.alert("Chỉnh sửa thành công"); window.location.href = "/menugames"; </script>`)
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.get(`UPDATE menugames_category SET name = '${category_new}' WHERE id = ${id}`, function(err) {
                if (err) {
                    callback(null, `<script>window.alert("chỉnh sửa Thất Bại Vì đã trùng thể loại");</script>`)
                } else {
                    callback(null, `<script>window.alert("Chỉnh sửa thành công"); window.location.href = "/menugames"; </script>`)
                }
            })
        }
    },
    // xoá thể loại game
    delCategory: function(id, name, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_category` WHERE id = ?;', [id])
            dbpool.execute('UPDATE menugames_itemgames SET category_id = NULL WHERE category_id = ? ;', [name])
            callback("/menugames")
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menugames_category WHERE id = ?`, [id])
            dbpool.db.run('UPDATE menugames_itemgames SET category_id = NULL WHERE category_id = ?', [name])
            callback("/menugames")
        }
    },
    // thêm game vào menu bao gồm tất cả các thông tin chỉ số và các tham số hậu tố khác vào db
    addGame: function(addaccount, icongame, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2], addaccount[3], addaccount[4], addaccount[5], addaccount[6], addaccount[7]], function(err, addGame) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.query("SELECT number FROM `menugames_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.execute('insert into menugames_batchcmd(id_list, encode_batch) values (?, ?)', [icongame.filename, addaccount[8]])
                            dbpool.execute('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icongame.filename, icongame.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.run("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3].replace(/\\/g, "/"), addaccount[4], addaccount[5].replace(/\\/g, "/"), addaccount[6].replace(/\\/g, "/"), addaccount[7].replace(/\\/g, "/")], function(err, addGame) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.db.all("SELECT number FROM `menugames_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.db.run('insert into menugames_batchcmd(id_list, encode_batchcmd) values (?, ?)', [icongame.filename, addaccount[8]])
                            dbpool.db.run('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icongame.filename, icongame.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        }
    },
    // chỉnh sửa itemgame và thay đổi hình ảnh và xoá ảnh cũ
    editGame: function(addaccount, icongame, callback = () => {}) {
        if (Type == "mysql") {
            if (icongame == undefined) {
                dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5]}',exe='${addaccount[6]}',parameter='${addaccount[7]}',linkfolder_target='${addaccount[8]}',linkfolder_link='${addaccount[9]}',reg_id='${addaccount[10]}' WHERE id_list ='${addaccount[1]}';`)
                dbpool.execute(`UPDATE menugames_batchcmd set encode_batchcmd='${addaccount[11]}' where id_list ='${addaccount[1]}'`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4]}',exe='${addaccount[5]}',parameter='${addaccount[6]}',linkfolder_target='${addaccount[7]}',linkfolder_link='${addaccount[8]}',reg_id='${addaccount[9]}' WHERE id_list ='${addaccount[0]}';`)
                dbpool.execute(`UPDATE menugames_batchcmd set encode_batchcmd='${addaccount[11]}' where id_list ='${addaccount[1]}'`)
                fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Xoá thành công.");
                });
                callback("2-Chinh sửa thành công")
            }
        } else if (Type == "sqlite") {
            if (icongame == undefined) {
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5]}',exe='${addaccount[6]}',parameter='${addaccount[7]}',linkfolder_target='${addaccount[8]}',linkfolder_link='${addaccount[9]}',reg_id='${addaccount[10]}' WHERE id_list ='${addaccount[1]}';`)
                dbpool.db.run(`UPDATE menugames_batchcmd set encode_batchcmd='${addaccount[11]}' where id_list ='${addaccount[1]}'`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4]}',exe='${addaccount[5]}',parameter='${addaccount[6]}',linkfolder_target='${addaccount[7]}',linkfolder_link='${addaccount[8]}',reg_id='${addaccount[9]}' WHERE id_list ='${addaccount[0]}';`)
                dbpool.db.run(`UPDATE menugames_batchcmd set encode_batchcmd='${addaccount[11]}' where id_list ='${addaccount[1]}'`)
                fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Xoá thành công.");
                });
                callback("2-Chinh sửa thành công")
            }
        }
    },
    // xoá item game và xoá cả hình ảnh
    delGame: function(delGame, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
            fs.unlink('./src/public/images/' + delGame.icon_old, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Xoá thành công.");
                callback("/menugames")
            });
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
            fs.unlink('./src/public/images/' + delGame.icon_old, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Xoá thành công.");
                callback("/menugames")
            });
        }
    }
}