var dbpool = require('../config/connectDB')


let getHomepage = function(req, res) {
    dbpool.query("select * from `menugames_category`", function(err, list_category) {
        if (err) {
            console.log(err)
        } else {
            return res.render('index-menugames', { List_Category: JSON.stringify(list_category) })
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

module.exports = { getHomepage, SendAllDataListGames, addCategory }