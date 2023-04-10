var express = require('express')
var rentaccController = require('../controller/rentaccController')

var router = express.Router()

// homepage
router.get('/rentacc', rentaccController.getHomepage)

// Routes RentAccount
router.post('/rentacc/add-typegame', rentaccController.addTypeGame)
router.post('/rentacc/edit-typegame', rentaccController.editTypeGame)
router.post('/rentacc/del-typegame', rentaccController.delTypeGame)
router.post('/rentacc/add-account', rentaccController.addAccount)
router.post('/rentacc/edit-account', rentaccController.editAccount)
router.post('/rentacc/del-account', rentaccController.delAccount)



module.exports = router