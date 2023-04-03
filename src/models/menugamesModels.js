var dbpool = require("../config/connectDB")

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

module.exports = { getAllCategory, getAllItemGames }