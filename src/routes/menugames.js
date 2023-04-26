var express = require("express")
const multer = require('multer');

var menugamesController = require("../controller/menugamesController")

var router = express.Router()
const upload = multer({ dest: 'src/public/images/' }); // setting thư mục khi upload hình ảnh lên máy chủ
//khởi tạo trang chính
router.get("/menugames", menugamesController.getHomepage)

//thêm thể loại
router.post("/menugames/add-category", menugamesController.addCategory)

// chỉnh sửa thể loại
router.post("/menugames/edit-category", menugamesController.editCategory)

// xoá thể loại
router.post("/menugames/del-category", menugamesController.delCategory)

//chỉnh sửa danh sách category
router.post("/menugames/data_send_menugames_sortorder_category", menugamesController.saveListCategory)

//chỉnh sửa danh sách menugames
router.post("/menugames/data_send_menugames_sortorder_game", menugamesController.saveListGame)

// thêm game đồng thởi thêm arg upload ảnh lên máy chủ
router.post("/menugames/add-game", upload.single('AddGame'), menugamesController.addGame)

// chỉnh sửa game đồng thời chỉnh sửa ảnh cũ và ảnh mới trên máy chủ
router.post("/menugames/edit-game", upload.single('EditGame'), menugamesController.editGame)

// xoá game đồng thời xoá luôn hình ãnh trên máy chủ
router.post("/menugames/del-game", menugamesController.delGame)

//chỉnh sửa danh sách menugames của box tool
router.post("/menugames/data_send_menugames_sortorder_tool", menugamesController.saveListTool)

// thêm tool đồng thởi thêm arg upload ảnh lên máy chủ
router.post("/menugames/add-tool", upload.single('AddTool'), menugamesController.addTool)

// chỉnh sửa tool đồng thời chỉnh sửa ảnh cũ và ảnh mới trên máy chủ
router.post("/menugames/edit-tool", upload.single('EditTool'), menugamesController.editTool)

// xoá tool đồng thời xoá luôn hình ãnh trên máy chủ
router.post("/menugames/del-tool", menugamesController.delTool)


module.exports = router