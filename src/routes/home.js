var express = require('express')
var homeController = require('../controller/homeController')

var router = express.Router()

// trang chính
router.get('/', homeController.getHomepage)
// Routes homePage
router.post('/add-typegame', homeController.addTypeGame)
router.post('/edit-typegame', homeController.editTypeGame)
router.post('/del-typegame', homeController.delTypeGame)
router.post('/add-account', homeController.addAccount)
router.post('/edit-account', homeController.editAccount)
router.post('/del-account', homeController.delAccount)



module.exports = router