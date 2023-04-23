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
    var sql = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.parameter, menugames_itemgames.child_id_list FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list ORDER by number ASC;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return itemgames
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return itemgames
    }
}

// Lấy toàn bộ thông tin itemgame của menu
let getAllItemTools = async() => {
    var sql = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.parameter, menugames_itemgames.child_id_list FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list ORDER by number ASC;";
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
    getAllItemTools,
    getSortOrderItems,
    // thêm thể loại vào db
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
    // lấy dữ liệu từ controller và lưu sắp sếp thứ tự
    saveListTool: function(saved_listtool, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menutools_sortorder`')
            for (var key in saved_listtool) {
                dbpool.execute('insert into menutools_sortorder(number, id_list, id_name) values (?, ?, ?)', [saved_listtool[key].number, saved_listtool[key].api_id, saved_listtool[key].api_id])
            }
            callback("/menutools")
        } else if (Type == "sqlite") {
            dbpool.db.run('DELETE FROM `menutools_sortorder`')
            for (var key in saved_listtool) {
                dbpool.db.run('insert into menutools_sortorder(number, id_list, id_name) values (?, ?, ?)', [saved_listtool[key].number, saved_listtool[key].api_id, saved_listtool[key].api_id])
            }
            callback("/menutools")
        }
    },
    // thêm tool vào menu bao gồm tất cả các thông tin chỉ số và các tham số hậu tố khác vào db
    addTool: function(addaccount, icontool, callback = () => {}) {
        // console.log(addaccount);
        if (Type == "mysql") {
            dbpool.query("INSERT INTO `menutools_itemtools`(`id_list`, `id_name`, `category_id`, `name_tool`, `icon`, `folder`, `parameter`, `child_id_list`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [icontool.filename, icontool.filename, addaccount[0], addaccount[1], icontool.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3], addaccount[4]], function(err, addTool) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.query("SELECT number FROM `menutools_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.execute('insert into menutools_sortorder(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icontool.filename, icontool.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.run("INSERT INTO `menutools_itemtools`(`id_list`, `id_name`, `category_id`, `name_tool`, `icon`, `folder`, `parameter`, `child_id_list`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [icontool.filename, icontool.filename, addaccount[0], addaccount[1], icontool.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3], addaccount[4]], function(err, addTool) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.db.all("SELECT number FROM `menutools_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.db.run('insert into menutools_sortorder(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icontool.filename, icontool.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        }
    },
    // chỉnh sửa itemtool và thay đổi hình ảnh và xoá ảnh cũ
    editTool: function(addaccount, icontool, callback = () => {}) {
        if (Type == "mysql") {
            if (icontool == undefined) {
                dbpool.execute(`UPDATE menutools_itemtools SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_tool='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5].replace(/\\/g, "/")}',parameter='${addaccount[6]}',child_id_list='${addaccount[7]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.execute(`UPDATE menutools_itemtools SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_tool='${addaccount[2]}',icon='${icontool.filename}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}',child_id_list='${addaccount[6]}' WHERE id_list ='${addaccount[0]}';`)
                fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Xoá thành công.");
                });
                callback("2-Chinh sửa thành công")
            }
        } else if (Type == "sqlite") {
            if (icontool == undefined) {
                dbpool.db.run(`UPDATE menutools_itemtools SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_tool='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5].replace(/\\/g, "/")}',parameter='${addaccount[6]}',child_id_list='${addaccount[7]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.db.run(`UPDATE menutools_itemtools SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_tool='${addaccount[2]}',icon='${icontool.filename}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}',child_id_list='${addaccount[6]}' WHERE id_list ='${addaccount[0]}';`)
                fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Xoá thành công.");
                });
                callback("2-Chinh sửa thành công")
            }
        }
        7
    },
    // xoá item tool và xoá cả hình ảnh
    delTool: function(delTool, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute(`DELETE FROM menutools_itemtools WHERE id_list = ?`, [delTool.api_id])
            fs.unlink('./src/public/images/' + delTool.icon_old, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Xoá thành công.");
                callback("/menutools")
            });
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menutools_itemtools WHERE id_list = ?`, [delTool.api_id])
            fs.unlink('./src/public/images/' + delTool.icon_old, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Xoá thành công.");
                callback("/menutools")
            });
        }
    },
    // lấy dữ liệu từ controller và lưu sắp sếp thứ tự
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
    // thêm game vào menu bao gồm tất cả các thông tin chỉ số và các tham số hậu tố khác vào db
    addGame: function(addaccount, icongame, callback = () => {}) {
        // console.log(addaccount);
        if (Type == "mysql") {
            dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `parameter`, `child_id_list`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3], addaccount[4]], function(err, addGame) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.query("SELECT number FROM `menugames_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.execute('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icongame.filename, icongame.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.run("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `parameter`, `child_id_list`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3], addaccount[4]], function(err, addGame) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.db.all("SELECT number FROM `menugames_sortorder` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
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
                dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5].replace(/\\/g, "/")}',parameter='${addaccount[6]}',child_id_list='${addaccount[7]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}',child_id_list='${addaccount[6]}' WHERE id_list ='${addaccount[0]}';`)
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
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5].replace(/\\/g, "/")}',parameter='${addaccount[6]}',child_id_list='${addaccount[7]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}',child_id_list='${addaccount[6]}' WHERE id_list ='${addaccount[0]}';`)
                fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Xoá thành công.");
                });
                callback("2-Chinh sửa thành công")
            }
        }
        7
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