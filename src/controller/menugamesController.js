var dbpool = require('../config/connectDB')
var menugamesModels = require('../models/menugamesModels')
var fs = require("fs")


let getHomepage = async(req, res) => {
    let list_category = await menugamesModels.getAllCategory()
    let list_itemgames = await menugamesModels.getAllItemGames()
    return res.render('index-menugames', { List_Category: JSON.stringify(list_category[0]), List_ItemGames: JSON.stringify(list_itemgames[0]) })

}

let saveListGame = async(req, res) => {
    let saved_listgame = req.body.item
    menugamesModels.saveListGame(saved_listgame, function(call) {
        return res.redirect(call);
    })
}

let addCategory = async(req, res) => {
    let { category_name } = req.body;
    menugamesModels.addCategory(category_name, function(err, result) {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

let delCategory = async(req, res) => {
    let delCategory = req.body.Del_Category
    menugamesModels.delCategory(delCategory, function(result) {
        return res.send(result)
    })
}

let addGame = async(req, res) => {
    let addaccount = req.body.AddGame
    let icongame = req.file
    menugamesModels.addGame(addaccount, icongame, function(err, result) {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

let editGame = async(req, res) => {
    let addaccount = req.body.EditGame
    let icongame = req.file
    menugamesModels.editGame(addaccount, icongame, function(result) {
        return res.send(result)
    })
}

let delGame = async(req, res) => {
    let delGame = req.body
    menugamesModels.delGame(delGame, function(result) {
        return res.send(result)
    })
}
module.exports = { getHomepage, saveListGame, addCategory, delCategory, addGame, editGame, delGame }