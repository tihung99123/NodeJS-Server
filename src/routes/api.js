var express = require('express')
var router = express.Router()
var apiController = require('../controller/apiController')

// -------------------------RENTACCOUNT-----------------------------------------
// lấy toàn bộ thông tin tài khoản và tên game
router.get('/api/rentacc', apiController.getAllRentAccount)

// lấy thông tin toàn bộ tài khoản 
router.get('/api/rentacc/account', apiController.getAllAccount)

// lấy thông tin 1 tài khoản qua id
router.get('/api/rentacc/account/:id', apiController.getAccountId)

// -------------------------MENUGAMES-----------------------------------------
// lấy toàn bộ thông tin thể loại và ItemGames
router.get('/api/menugames', apiController.getAllMenuGames)

// Lấy toàn bộ thể loại
router.get('/api/menugames/category', apiController.getAllCategory)

// Lấy toàn bộ ItemGames
router.get('/api/menugames/itemgames', apiController.getAllItemGames)

// Lấy thông tin ItemGames bằng Id
router.get('/api/menugames/itemgames/:id', apiController.getItemGameById)

module.exports = router