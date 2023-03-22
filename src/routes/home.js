var express = require("express")
var homeController = require('../controller/homeController')

var router = express.Router()

router.get('/', homeController.getHomepage)

module.exports = router