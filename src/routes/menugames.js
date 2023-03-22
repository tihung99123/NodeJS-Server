var express = require("express")
var menugamesController = require("../controller/menugameController")

var router = express.Router()

router.get("/menugames", menugamesController.getHomepage)

module.exports = router