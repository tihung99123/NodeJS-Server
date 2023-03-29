var dbpool = require('../config/connectDB')


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

let addGame = async(req, res) => {
    let addaccount = req.body.AddGame
    let icongame = req.file
    dbpool.query("INSERT INTO `menugames_itemgames`(`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [icongame.filename, icongame.filename, addaccount[0], addaccount[1], icongame.filename, addaccount[2], addaccount[3], addaccount[4], addaccount[5], addaccount[6], addaccount[7]], function(err, addGame) {
        if (err) {
            console.log("Lỗi 210", err);
        } else {
            console.log("Addgame- Done");
        }
    })
}

module.exports = { getHomepage, SendAllDataListGames, addCategory, addGame }