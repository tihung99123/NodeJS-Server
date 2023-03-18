var express = require('express')
var router = express.Router()
var apiController = require('../controller/apiController')

// lấy toàn bộ thông tin tài khoản
router.get('/api/list/type', apiController.GetAllType)
router.get('/api/list/account', apiController.GetAllAccount)
// lấy toàn bộ thông tin tài khoản
router.get('/api/v1/:id', apiController.GetAccount)


module.exports = router