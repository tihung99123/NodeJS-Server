var services = require('../services/menugames')
var dbpool = require("../config/connectDB")
require('dotenv').config()
const Type = process.env.TYPE_SQL || "sqlite"
const homePage = "/menugames"

// Lấy thông tin các Category của DB
let getAllCategory = async() => {
    var sql = "select menugames_sortorder_category.number, menugames_category.* from `menugames_category` LEFT JOIN menugames_sortorder_category on menugames_category.name = menugames_sortorder_category.category_name ORDER by number ASC";
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
    var sql = "SELECT menugames_sortorder_game.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.parameter, menugames_itemgames.child_id_list FROM menugames_itemgames LEFT JOIN menugames_sortorder_game ON menugames_itemgames.id_list = menugames_sortorder_game.id_list ORDER by number ASC;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return itemgames
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return itemgames
    }
}

// Lấy toàn bộ thông tin itemtool của menu
let getAllItemTools = async() => {
    var sql = "SELECT menugames_sortorder_tool.number, menugames_itemtools.id_list, menugames_itemtools.name_tool, menugames_itemtools.icon, menugames_itemtools.folder, menugames_itemtools.parameter FROM menugames_itemtools LEFT JOIN menugames_sortorder_tool ON menugames_itemtools.id_list = menugames_sortorder_tool.id_list ORDER by number ASC;;";
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
    var sql = "SELECT * from menugames_sortorder_game_game order by number asc;";
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
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "${homePage}"; </script>`)
                            }
                        })
                    } else {
                        return callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "${homePage}"; </script>`)
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
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "${homePage}"; </script>`)
                            }
                        })
                    } else {
                        return callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "${homePage}"; </script>`)
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
                    callback(null, `<script>window.alert("Chỉnh sửa thành công"); window.location.href = "${homePage}"; </script>`)
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.get(`UPDATE menugames_category SET name = '${category_new}' WHERE id = ${id}`, function(err) {
                if (err) {
                    callback(null, `<script>window.alert("chỉnh sửa Thất Bại Vì đã trùng thể loại");</script>`)
                } else {
                    callback(null, `<script>window.alert("Chỉnh sửa thành công"); window.location.href = "${homePage}"; </script>`)
                }
            })
        }
    },
    // xoá thể loại game
    delCategory: function(id, name, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_category` WHERE id = ?;', [id])
            dbpool.execute('UPDATE menugames_itemgames SET category_id = NULL WHERE category_id = ? ;', [name])
            callback(homePage)
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menugames_category WHERE id = ?`, [id])
            dbpool.db.run('UPDATE menugames_itemgames SET category_id = NULL WHERE category_id = ?', [name])
            callback(homePage)
        }
    },
    // lấy dữ liệu từ controller và lưu sắp sếp thứ tự category
    saveListCategory: function(saved_listcategory, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_sortorder_category`')
            for (var key in saved_listcategory) {
                dbpool.execute('insert into menugames_sortorder_category(number, category_name) values (?, ?)', [saved_listcategory[key].number, saved_listcategory[key].category_name])
            }
            callback(homePage)
        } else if (Type == "sqlite") {
            dbpool.db.run('DELETE FROM `menugames_sortorder_category`')
            for (var key in saved_listcategory) {
                dbpool.db.run('insert into menugames_sortorder_category(number, category_name) values (?, ?)', [saved_listcategory[key].number, saved_listcategory[key].category_name])
            }
            callback(homePage)
        }
    },
    // lấy dữ liệu từ controller và lưu sắp sếp thứ tự
    saveListTool: function(saved_listtool, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_sortorder_tool`')
            for (var key in saved_listtool) {
                dbpool.execute('insert into menugames_sortorder_tool(number, id_list, id_name) values (?, ?, ?)', [saved_listtool[key].number, saved_listtool[key].api_id, saved_listtool[key].api_id])
            }
            callback(homePage)
        } else if (Type == "sqlite") {
            dbpool.db.run('DELETE FROM `menugames_sortorder_tool`')
            for (var key in saved_listtool) {
                dbpool.db.run('insert into menugames_sortorder_tool(number, id_list, id_name) values (?, ?, ?)', [saved_listtool[key].number, saved_listtool[key].api_id, saved_listtool[key].api_id])
            }
            callback(homePage)
        }
    },
    // thêm tool vào menu bao gồm tất cả các thông tin chỉ số và các tham số hậu tố khác vào db
    addTool: function(addaccount, icontool, callback = () => {}) {
        services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icontool.filename, icontool.filename)
        if (Type == "mysql") {
            dbpool.query("INSERT INTO `menugames_itemtools`(`id_list`, `id_name`, `name_tool`, `icon`, `folder`, `parameter`) VALUES ( ?, ?, ?, ?, ?, ?)", [icontool.filename, icontool.filename, addaccount[0], icontool.filename, addaccount[1].replace(/\\/g, "/"), addaccount[2]], function(err, addTool) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.query("SELECT number FROM `menugames_sortorder_tool` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.execute('insert into menugames_sortorder_tool(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icontool.filename, icontool.filename]);
                            callback(null, "Thêm Thành công")
                        }
                    })
                }
            })
        } else if (Type == "sqlite") {
            dbpool.db.run("INSERT INTO `menugames_itemtools`(`id_list`, `id_name`, `name_tool`, `icon`, `folder`, `parameter`) VALUES ( ?, ?, ?, ?, ?, ?)", [icontool.filename, icontool.filename, addaccount[0], icontool.filename, addaccount[1].replace(/\\/g, "/"), addaccount[2]], function(err, addTool) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.db.all("SELECT count(number) as number FROM menugames_sortorder_tool;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.db.run('insert into menugames_sortorder_tool(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icontool.filename, icontool.filename]);
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
                dbpool.execute(`UPDATE menugames_itemtools SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',name_tool='${addaccount[2]}',icon='${addaccount[3]}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.execute(`UPDATE menugames_itemtools SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',name_tool='${addaccount[1]}',icon='${icontool.filename}',folder='${addaccount[2].replace(/\\/g, "/")}',parameter='${addaccount[3]}' WHERE id_list ='${addaccount[0]}';`)
                services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icontool.filename, icontool.filename)

                services.deleteFile(addaccount[3])
                callback("2-Chinh sửa thành công")
            }
        } else if (Type == "sqlite") {
            if (icontool == undefined) {
                dbpool.db.run(`UPDATE menugames_itemtools SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',name_tool='${addaccount[2]}',icon='${addaccount[3]}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.db.run(`UPDATE menugames_itemtools SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',name_tool='${addaccount[1]}',icon='${icontool.filename}',folder='${addaccount[2].replace(/\\/g, "/")}',parameter='${addaccount[3]}' WHERE id_list ='${addaccount[0]}';`)
                services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icontool.filename, icontool.filename)
                services.deleteFile(addaccount[3])
                callback("2-Chinh sửa thành công")
            }
        }
        7
    },
    // xoá item tool và xoá cả hình ảnh
    delTool: function(delTool, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute(`DELETE FROM menugames_itemtools WHERE id_list = ?`, [delTool.api_id])
            services.deleteFile(delTool.icon_old)
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menugames_itemtools WHERE id_list = ?`, [delTool.api_id])
            services.deleteFile(delTool.icon_old)
        }
        callback(homePage)
    },
    // lấy dữ liệu từ controller và lưu sắp sếp thứ tự
    saveListGame: function(saved_listgame, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute('DELETE FROM `menugames_sortorder_game`')
            for (var key in saved_listgame) {
                dbpool.execute('insert into menugames_sortorder_game(number, id_list, id_name) values (?, ?, ?)', [saved_listgame[key].number, saved_listgame[key].api_id, saved_listgame[key].api_id])
            }
            callback(homePage)
        } else if (Type == "sqlite") {
            dbpool.db.run('DELETE FROM `menugames_sortorder_game`')
            for (var key in saved_listgame) {
                dbpool.db.run('insert into menugames_sortorder_game(number, id_list, id_name) values (?, ?, ?)', [saved_listgame[key].number, saved_listgame[key].api_id, saved_listgame[key].api_id])
            }
            callback(homePage)
        }
    },
    // thêm game vào menu bao gồm tất cả các thông tin chỉ số và các tham số hậu tố khác vào db
    addGame: function(addaccount, icongame, callback = () => {}) {
        services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icongame.filename, icongame.filename)
            // console.log(addaccount);
        if (Type == "mysql") {
            dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `parameter`, `child_id_list`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2].replace(/\\/g, "/"), addaccount[3], addaccount[4]], function(err, addGame) {
                if (err) {
                    callback(err);
                } else {
                    dbpool.query("SELECT number FROM `menugames_sortorder_game` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            dbpool.execute('insert into menugames_sortorder_game(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icongame.filename, icongame.filename]);
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
                    dbpool.db.all("SELECT number FROM `menugames_sortorder_game` ORDER BY number DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            if (count == "") {
                                dbpool.db.run('insert into menugames_sortorder_game(number, id_list, id_name) values (?, ?, ?)', [0 + 1, icongame.filename, icongame.filename]);
                            } else {
                                dbpool.db.run('insert into menugames_sortorder_game(number, id_list, id_name) values (?, ?, ?)', [count[0]['number'] + 1, icongame.filename, icongame.filename]);
                            }
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
                services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icongame.filename, icongame.filename)
                services.deleteFile(addaccount[3])
                callback("2-Chinh sửa thành công")
            }
        } else if (Type == "sqlite") {
            if (icongame == undefined) {
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5].replace(/\\/g, "/")}',parameter='${addaccount[6]}',child_id_list='${addaccount[7]}' WHERE id_list ='${addaccount[1]}';`)
                callback("1-Chinh sửa thành công")
            } else {
                dbpool.db.run(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4].replace(/\\/g, "/")}',parameter='${addaccount[5]}',child_id_list='${addaccount[6]}' WHERE id_list ='${addaccount[0]}';`)
                services.processPicture('127.0.0.1', 3000, 'py_services', 'imageprocess.py', icongame.filename, icongame.filename)
                services.deleteFile(addaccount[3])
                callback("2-Chinh sửa thành công")
            }
        }
    },
    // xoá item game và xoá cả hình ảnh
    delGame: function(delGame, callback = () => {}) {
        if (Type == "mysql") {
            dbpool.execute(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
            services.deleteFile(delGame.icon_old)
        } else if (Type == "sqlite") {
            dbpool.db.run(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
            services.deleteFile(delGame.icon_old)
        }
    }
}