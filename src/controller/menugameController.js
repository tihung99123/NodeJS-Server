var dbpool = require('../config/connectDB')
var fs = require("fs")


let getHomepage = function(req, res) {
    dbpool.query("select * from `menugames_category`", function(err, list_category) {
        if (err) {
            console.log(err)
        } else {
            dbpool.query("select * from `menugames_itemgames`", function(err, list_itemgames) {
                if (err) {
                    console.log(err)
                } else {
                    return res.render('index-menugames', { List_Category: JSON.stringify(list_category), List_ItemGames: JSON.stringify(list_itemgames) })
                }
            })

        }
    })
}

let SendAllDataListGames = function(req, res) {
    // console.log(req.body.item.length);
    for (let key in req.body.item) {
        console.log(req.body.item[key].IDList);
        console.log(req.body.item[key].IDName);
    }
}

let addCategory = async(req, res) => {
    let { category_name } = req.body;
    dbpool.query("SELECT * FROM `menugames_category` where name = ?", category_name, function(err, insert) {
        if (err) {
            console.log("Lỗi:", err);
        } else {
            if (insert == "") {
                dbpool.query("SELECT COUNT(id) as `count` FROM `menugames_category`;", function(err, count) {
                    if (err) {
                        console.log("Lỗi:", err);
                    } else {
                        if (count[0]['count'] == 0) {
                            dbpool.execute('insert into menugames_category(id, name) values (?, ?)', ["1", category_name]);
                            return res.send(`<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                        } else {
                            dbpool.execute('insert into menugames_category(id, name) values (?, ?)', [count[0]['count'] + 1, category_name]);
                            return res.send(`<script>window.alert("Thêm Thành công"); window.location.href = "/menugames"; </script>`)
                        }
                    }
                })
            } else {
                console.log("Có", insert);
                return res.send(`<script>window.alert("Thêm Thất Bại Vì đã trùng thể loại"); window.location.href = "/menugames"; </script>`)
            }
        }
    })
}

let delCategory = async(req, res) => {

    let delGame = req.body.api_id
    await dbpool.execute(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame])
}

let addGame = async(req, res) => {
    let addaccount = req.body.AddGame
    let icongame = req.file
    dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2], addaccount[3], addaccount[4], addaccount[5], addaccount[6], addaccount[7]], function(err, addGame) {
        if (err) {
            console.log("Lỗi 210", err);
        } else {
            return res.send("Thêm Thành công")
        }
    })
}

let editGame = async(req, res) => {
    let addaccount = req.body.EditGame
    let icongame = req.file
    if (icongame == undefined) {
        await dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[1]}',id_name='${addaccount[1]}',category_id='${addaccount[2]}',name_game='${addaccount[3]}',icon='${addaccount[4]}',folder='${addaccount[5]}',exe='${addaccount[6]}',parameter='${addaccount[7]}',linkfolder_target='${addaccount[8]}',linkfolder_link='${addaccount[9]}',reg_id='${addaccount[10]}' WHERE id_list ='${addaccount[1]}';`)
        return res.send("1-Chinh sửa thành công")
    } else {
        await dbpool.execute(`UPDATE menugames_itemgames SET id_list='${addaccount[0]}',id_name='${addaccount[0]}',category_id='${addaccount[1]}',name_game='${addaccount[2]}',icon='${icongame.filename}',folder='${addaccount[4]}',exe='${addaccount[5]}',parameter='${addaccount[6]}',linkfolder_target='${addaccount[7]}',linkfolder_link='${addaccount[8]}',reg_id='${addaccount[9]}' WHERE id_list ='${addaccount[0]}';`)
        fs.unlink('./src/public/images/' + addaccount[3], (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
        return res.send("2-Chinh sửa thành công")
    }
}

let delGame = async(req, res) => {
    let delGame = req.body
    await dbpool.execute(`DELETE FROM menugames_itemgames WHERE id_list = ?`, [delGame.api_id])
    fs.unlink('./src/public/images/' + delGame.icon_old, (err) => {
        if (err) {
            throw err;
        }
        console.log("Delete File successfully.");
    });
}
module.exports = { getHomepage, SendAllDataListGames, addCategory, delCategory, addGame, editGame, delGame }