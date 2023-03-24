var express = require("express")
var menugamesController = require("../controller/menugameController")

var router = express.Router()

router.get("/menugames", menugamesController.getHomepage)
router.post("/senddata/test", menugamesController.SendAllDataListGames)

module.exports = router