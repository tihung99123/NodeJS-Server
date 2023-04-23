var express = require('express')
var rentaccController = require('../controller/rentaccController')

var router = express.Router()

// homepage
router.get('/rentacc', rentaccController.getHomepage)

// Routes RentAccount
//thêm loại game
router.post('/rentacc/add-typegame', rentaccController.addTypeGame)

// chỉnh sủa loại game
router.post('/rentacc/edit-typegame', rentaccController.editTypeGame)

// xoá loại game
router.post('/rentacc/del-typegame', rentaccController.delTypeGame)

// thêm tài khoản
router.post('/rentacc/add-account', rentaccController.addAccount)

// chỉnh sửa tài khoản
router.post('/rentacc/edit-account', rentaccController.editAccount)

// xoá tài khoản
router.post('/rentacc/del-account', rentaccController.delAccount)


module.exports = router