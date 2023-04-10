var dbpool = require("../config/connectDB")
var fs = require('fs')

let getAllCategory = async() => {
    var sql = "select * from `menugames_category`";
    let category = await dbpool.promise().query(sql)
    return category
}

let getAllItemGames = async() => {
    var sql = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.exe, menugames_itemgames.parameter, menugames_itemgames.linkfolder_target, menugames_itemgames.linkfolder_link, menugames_itemgames.reg_id FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list;";
    let itemgames = await dbpool.promise().query(sql)
    return itemgames
}


module.exports = {
    getAllCategory,
    getAllItemGames,
    saveListGame: function(saved_listgame, callback = () => {}) {
        dbpool.execute('DELETE FROM `menugames_sortorder`')
        for (var key in saved_listgame) {
            dbpool.execute('insert into menugames_sortorder(number, id_list, id_name) values (?, ?, ?)', [saved_listgame[key].number, saved_listgame[key].api_id, saved_listgame[key].api_id])
        }
        callback("/menugames")
    },
    addCategory: function(category_name, callback = () => {}) {
        dbpool.query("SELECT * FROM `menugames_category` where name = ?", category_name, function(err, insert) {
            if (err) {
                callback("Lỗi:", err);
            } else {
                if (insert == "") {
                    dbpool.query("SELECT id FROM `menugames_category` ORDER BY id DESC LIMIT 1;", function(err, count) {
                        if (err) {
                            callback("Lỗi:", err);
                        } else {
                            if (count[0]['count'] == 0) {
                                dbpool.execute('insert into menugames_category(id, name) values (?, ?)', ["1", category_name]);
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                            } else {
                                dbpool.execute('insert into menugames_category(id, name) values (?, ?)', [count[0]['id'] + 1, category_name]);
                                callback(null, `<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                            }
                        }
                    })
                } else {
                    return callback(null, `<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "/menugames"; </script>`)
                }
            }
        })
    },
    delCategory: function(delCategory, callback = () => {}) {
        dbpool.execute('DELETE FROM `menugames_category` WHERE id = ?;', [delCategory])
        callback("/menugames")
    },
    addGame: function(addaccount, icongame, callback = () => {}) {
        dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2], addaccount[3], addaccount[4], addaccount[5], addaccount[6], addaccount[7]], function(err, addGame) {
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
    },
    editGame: function(addaccount, icongame, callback = () => {}) {
        if (icongame == undefined) {
            dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5]}',exe='${addaccount[6]}',parameter='${addaccount[7]}',linkfolder_target='${addaccount[8]}',linkfolder_link='${addaccount[9]}',reg_id='${addaccount[10]}' WHERE id_list ='${addaccount[1]}';`)
            callback("1-Chinh sửa thành công")
        } else {
            dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4]}',exe='${addaccount[5]}',parameter='${addaccount[6]}',linkfolder_target='${addaccount[7]}',linkfolder_link='${addaccount[8]}',reg_id='${addaccount[9]}' WHERE id_list ='${addaccount[0]}';`)
            fs.unlink('./src/public/images/' + addaccount[3], (err) => {
                if (err) {
                    throw err;
                }
                console.log("Xoá thành công.");
            });
            callback("2-Chinh sửa thành công")
        }
    },
    delGame: function(delGame, callback = () => {}) {
        dbpool.execute(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
        fs.unlink('./src/public/images/' + delGame.icon_old, (err) => {
            if (err) {
                throw err;
            }
            console.log("Xoá thành công.");
            callback("/menugames")
        });
    }
}