var express = require("express")
var homeController = require('../controller/homeController')

var router = express.Router()

// khởi tạo trang chỉnh
router.get('/', homeController.getHomepage)

module.exports = router