var express = require("express")
var menugamesController = require("../controller/menugameController")

var router = express.Router()

router.get("/menugames", menugamesController.getHomepage)
router.post("/data_send_sortorder", menugamesController.SendAllDataListGames)

module.exports = router