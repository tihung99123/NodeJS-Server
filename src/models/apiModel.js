var dbpool = require('../config/connectDB')

// -------------------------RENTACCOUNT-------------------------------------
// Lấy toàn bộ thông tin trong Rentacc đồng thời tạo file json
let getAllRentAccount = async() => {
    var sql_1 = "SELECT * FROM `rentaccount_namegame`";
    let namegame = await dbpool.promise().query(sql_1)
    var sql_2 = "SELECT rentaccount_account.id,rentaccount_account.typegame,rentaccount_account.account,rentaccount_account.password,rentaccount_status.clientid,rentaccount_status.clientname FROM `rentaccount_account` LEFT JOIN `rentaccount_status` ON rentaccount_account.id = rentaccount_status.id;"
    let account = await dbpool.promise().query(sql_2)
    return { NameGame: namegame[0], ListAccount: account[0] }
}

// Lấy toàn bộ thông tin tài khoản
let getAllAccount = async(id) => {
    var sql = "SELECT * FROM `rentaccount_account`";
    let account = await dbpool.promise().query(sql, [id])
    return { Account: account[0] }
}

// Lấy thông tin 1 tài khoản qua Id
let getAccountById = async(id) => {
    var sql = "SELECT * FROM `rentaccount_account` where id = ?";
    let account = await dbpool.promise().query(sql, [id])
    return { Account: account[0] }
}

// -------------------------MENUGAMES-----------------------------------------
// Lấy toàn bộ thông tin menugames
let getAllMenuGames = async() => {
    var sql_1 = "select * from `menugames_category`";
    let category = await dbpool.promise().query(sql_1)
    var sql_2 = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.exe, menugames_itemgames.parameter, menugames_itemgames.linkfolder_target, menugames_itemgames.linkfolder_link, menugames_itemgames.reg_id FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list;";
    let itemgames = await dbpool.promise().query(sql_2)
    return { Catogory: category[0], ItemGames: itemgames[0] }
}

// Lấy toàn bộ thể loại
let getAllCategory = async() => {
    var sql = "select * from `menugames_category`";
    let category = await dbpool.promise().query(sql)
    return { Category: category[0] }
}

// Lấy toàn bộ ItemGames
let getAllItemGames = async() => {
    var sql = "SELECT menugames_sortorder.number, menugames_itemgames.id_list, menugames_itemgames.category_id, menugames_itemgames.name_game, menugames_itemgames.icon, menugames_itemgames.folder, menugames_itemgames.exe, menugames_itemgames.parameter, menugames_itemgames.linkfolder_target, menugames_itemgames.linkfolder_link, menugames_itemgames.reg_id FROM menugames_itemgames LEFT JOIN menugames_sortorder ON menugames_itemgames.id_list = menugames_sortorder.id_list;";
    let itemgames = await dbpool.promise().query(sql)
    return { ItemGames: itemgames[0] }
}


let getItemGameById = async(id) => {
    var sql = "SELECT * FROM `menugames_itemgames` WHERE id_list = ?;"
    let itemgame = await dbpool.promise().query(sql, [id])
    return { ItemGame: itemgame[0] }
}

module.exports = {
    getAllRentAccount,
    getAllAccount,
    getAccountById,
    getAllMenuGames,
    getAllCategory,
    getAllItemGames,
    getItemGameById
}