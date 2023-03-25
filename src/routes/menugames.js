var express = require("express")
var menugamesController = require("../controller/menugameController")

var router = express.Router()

router.get("/menugames", menugamesController.getHomepage)
router.post("/data_send_sortorder", menugamesController.SendAllDataListGames)
router.post("/menugames/add-category", menugamesController.addCategory)
router.post("/menugames/add-game", menugamesController.addCategory)

module.exports = router