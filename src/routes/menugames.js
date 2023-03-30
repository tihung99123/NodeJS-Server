var express = require("express")
const multer = require('multer');

var menugamesController = require("../controller/menugameController")

var router = express.Router()
const upload = multer({ dest: 'src/public/images/' });

router.get("/menugames", menugamesController.getHomepage)
router.post("/menugames/data_send_menugames_sortorder", menugamesController.SendAllDataListGames)
router.post("/menugames/add-category", menugamesController.addCategory)
router.post("/menugames/del-category", menugamesController.delCategory)
router.post("/menugames/add-game", upload.single('AddGame'), menugamesController.addGame)
router.post("/menugames/edit-game", upload.single('EditGame'), menugamesController.editGame)
router.post("/menugames/del-game", menugamesController.delGame)

module.exports = router