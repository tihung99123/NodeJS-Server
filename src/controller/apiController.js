var apiModels = require('../models/apiModel')

// -------------------------RENTACCOUNT-------------------------------------
// lấy toàn bộ thông tin tài khoản và namegame
let getAllRentAccount = async(req, res) => {
    let info = await apiModels.getAllRentAccount()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

//lấy toàn bộ tài khoản
let getAllAccount = async(req, res) => {
    let info = await apiModels.getAllAccount()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// lấy tài khoản qua id
let getAccountId = async(req, res) => {
    let info = await apiModels.getAccountById(req.params.id)
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// -------------------------MENUGAMES-----------------------------------------
// Lấy toàn bộ thông tin menugames
let getAllMenuGames = async(req, res) => {
    let info = await apiModels.getAllMenuGames()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// Lấy toàn bộ thể loại
let getAllCategory = async(req, res) => {
    let info = await apiModels.getAllCategory()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// Lấy toàn bộ ItemTools
let getAllItemTools = async(req, res) => {
    let info = await apiModels.getAllItemTools()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// Lấy toàn bộ ItemGames
let getAllItemGames = async(req, res) => {
    let info = await apiModels.getAllItemGames()
    res.header("Content-Type", 'application/json');
    res.json(info)
}

// Lấy thông tin ItemTools bằng Id
let getItemToolById = async(req, res) => {
        let info = await apiModels.getItemToolById(req.params.id)
        res.header("Content-Type", 'application/json');
        res.json(info)
    }
    // Lấy thông tin ItemGames bằng Id
let getItemGameById = async(req, res) => {
    let info = await apiModels.getItemGameById(req.params.id)
    res.header("Content-Type", 'application/json');
    res.json(info)
}


// Lấy thông tin ItemGames theo thể loại
let getItemGameByCategory = async(req, res) => {
    let info = await apiModels.getItemGameByCategory(req.params.id)
    res.header("Content-Type", 'application/json');
    res.json(info)
}

module.exports = {
    getAllRentAccount,
    getAllAccount,
    getAccountId,
    getAllMenuGames,
    getAllCategory,
    getAllItemTools,
    getAllItemGames,
    getItemToolById,
    getItemGameById,
    getItemGameByCategory
}