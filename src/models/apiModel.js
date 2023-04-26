var dbpool = require('../config/connectDB')
require('dotenv').config()
const Type = process.env.TYPE_SQL || "sqlite"

// -------------------------RENTACCOUNT-------------------------------------
// Lấy toàn bộ thông tin trong Rentacc đồng thời tạo file json
let getAllRentAccount = async() => {
    var sql_1 = "SELECT * FROM `rentaccount_namegame`";
    var sql_2 = "SELECT rentaccount_account.id,rentaccount_account.typegame,rentaccount_account.account,rentaccount_account.password,rentaccount_status.clientid,rentaccount_status.clientname FROM `rentaccount_account` LEFT JOIN `rentaccount_status` ON rentaccount_account.id = rentaccount_status.id;"
    if (Type == "mysql") {
        let namegame = await dbpool.promise().query(sql_1)
        let account = await dbpool.promise().query(sql_2)
        return { NameGame: namegame[0], ListAccount: account[0] }
    } else if (Type == "sqlite") {
        let namegame = await dbpool.all(sql_1)
        let account = await dbpool.all(sql_2)
        return { NameGame: namegame, ListAccount: account }
    }
}

// Lấy toàn bộ thông tin tài khoản
let getAllAccount = async() => {
    var sql = "SELECT * FROM `rentaccount_account`";
    if (Type == "mysql") {
        let account = await dbpool.promise().query(sql)
        return { Account: account[0] }
    } else if (Type == "sqlite") {
        let account = await dbpool.all(sql)
        return { Account: account }
    }

}

// Lấy thông tin 1 tài khoản qua Id
let getAccountById = async(id) => {
    var sql = "SELECT * FROM `rentaccount_account` where id = ?";
    if (Type == "mysql") {
        let account = await dbpool.promise().query(sql, [id])
        return { Account: account[0] }
    } else if (Type == "sqlite") {
        let account = await dbpool.get(sql, [id])
        return { Account: account }
    }
}

// -------------------------MENUGAMES-----------------------------------------
// Lấy toàn bộ thông tin menugames
let getAllMenuGames = async() => {
    var sql_1 = "select * from `menugames_category`";
    var sql_2 = "SELECT menugames_sortorder_game.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.parameter FROM menugames_itemgames LEFT JOIN menugames_sortorder_game ON menugames_itemgames.id_list = menugames_sortorder_game.id_list;";
    if (Type == "mysql") {
        let category = await dbpool.promise().query(sql_1)
        let itemgames = await dbpool.promise().query(sql_2)
        return { Catogory: category[0], ItemGames: itemgames[0] }
    } else if (Type == "sqlite") {
        let category = await dbpool.all(sql_1)
        let itemgames = await dbpool.all(sql_2)
        return { Catogory: category, ItemGames: itemgames }
    }
}

// Lấy toàn bộ thể loại
let getAllCategory = async() => {
    var sql = "select menugames_sortorder_category.number, menugames_category.* from `menugames_category` LEFT JOIN menugames_sortorder_category on menugames_category.name = menugames_sortorder_category.category_name ORDER by number ASC";
    if (Type == "mysql") {
        let category = await dbpool.promise().query(sql)
        return { Category: category[0] }
    } else if (Type == "sqlite") {
        let category = await dbpool.all(sql)
        return { Category: category }
    }

}

// Lấy toàn bộ ItemTools
let getAllItemTools = async() => {
    var sql = "SELECT menugames_sortorder_tool.number, menugames_itemtools.id_list, menugames_itemtools.name_tool, menugames_itemtools.icon, menugames_itemtools.folder, menugames_itemtools.parameter FROM menugames_itemtools LEFT JOIN menugames_sortorder_tool ON menugames_itemtools.id_list = menugames_sortorder_tool.id_list ORDER BY number ASC;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return { ItemGames: itemgames[0] }
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return { ItemGames: itemgames }
    }
}

// Lấy toàn bộ ItemGames
let getAllItemGames = async() => {
    var sql = "SELECT menugames_sortorder_game.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.parameter FROM menugames_itemgames LEFT JOIN menugames_sortorder_game ON menugames_itemgames.id_list = menugames_sortorder_game.id_list ORDER BY number ASC;";
    if (Type == "mysql") {
        let itemgames = await dbpool.promise().query(sql)
        return { ItemGames: itemgames[0] }
    } else if (Type == "sqlite") {
        let itemgames = await dbpool.all(sql)
        return { ItemGames: itemgames }
    }
}

// Lấy ItemGames bằng Id
let getItemGameById = async(id) => {
    var sql = "SELECT * FROM `menugames_itemgames` WHERE id_list = ?;"
    if (Type == "mysql") {
        let itemgame = await dbpool.promise().query(sql, [id])
        return { ItemGame: itemgame[0] }
    } else if (Type == "sqlite") {
        let itemgame = await dbpool.get(sql, [id])
        return { ItemGame: itemgame }
    }
}

// Lấy ItemGames theo danh sách thể loại
let getItemGameByCategory = async(id) => {
    var sql = "SELECT * FROM `menugames_itemgames` WHERE menugames_itemgames.category_id = ?;"
    if (Type == "mysql") {
        let itemgame = await dbpool.promise().query(sql, [id])
        return { ItemGame: itemgame[0] }
    } else if (Type == "sqlite") {
        let itemgame = await dbpool.get(sql, [id])
        return { ItemGame: itemgame }
    }
}

module.exports = {
    getAllRentAccount,
    getAllAccount,
    getAccountById,
    getAllMenuGames,
    getAllCategory,
    getAllItemTools,
    getAllItemGames,
    getItemGameById,
    getItemGameByCategory
}