var menugamesModels = require('../models/menugamesModels')

const Type = process.env.TYPE_SQL || "sqlite"

// khởi tạo trang chính và gửi danh sách thể loại 
// danh sách game có sắp xếp đồng thời gửi cả danh sách công cụ
let getHomepage = async(req, res) => {
    let list_category = await menugamesModels.getAllCategory()
    let list_itemtools = await menugamesModels.getAllItemTools()
    let list_itemgames = await menugamesModels.getAllItemGames()
    if (Type == "mysql") {
        return res.render('index-menugames', { List_Category: JSON.stringify(list_category[0]), List_ItemTools: JSON.stringify(list_itemtools[0]), List_ItemGames: JSON.stringify(list_itemgames[0]) })
    } else if (Type == "sqlite") {
        return res.render('index-menugames', { List_Category: JSON.stringify(list_category), List_ItemTools: JSON.stringify(list_itemtools), List_ItemGames: JSON.stringify(list_itemgames) })
    }
}


// thêm thể loại mới vào máy chủ
// bao gồm tên vào modal
let addCategory = async(req, res) => {
    let { category_name } = req.body;
    menugamesModels.addCategory(category_name, function(err, result) {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

// chỉnh sửa thể loại
// bao gồm id và tên vào modal
let editCategory = async(req, res) => {
    let { id, category_new } = req.body;
    menugamesModels.editCategory(id, category_new, function(err, result) {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.redirect(result)
        }
    })
}

//xoá thể loại
// bao gồm id và tên vào modal
let delCategory = async(req, res) => {
    let { id, name } = req.body
    menugamesModels.delCategory(id, name, function(result) {
        return res.redirect(result)
    })
}

// lưu lại danh sách sắp xếp category
// bao gồm number và id_list vào modal
let saveListCategory = async(req, res) => {
    let saved_listcategory = req.body.item
    menugamesModels.saveListCategory(saved_listcategory, function(call) {
        return res.redirect(call);
    })
}

// lưu lại danh sách sắp xếp menugames
// bao gồm number và id_list vào modal
let saveListTool = async(req, res) => {
    let saved_listtool = req.body.item
    menugamesModels.saveListTool(saved_listtool, function(call) {
        return res.redirect(call);
    })
}

// thêm tool
//bao gồm hình ảnh, tên tool, thư mục tool, hậu tố
let addTool = async(req, res) => {
    let addaccount = req.body.AddTool
    let icontool = req.file
    menugamesModels.addTool(addaccount, icontool, function(err, result) {
        if (err) {
            console.log(err);
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

//chỉnh sửa tool
//bao gồm hình ảnh, tên tool, thư mục tool, hậu tố
let editTool = async(req, res) => {
    let addaccount = req.body.EditTool
    let icontool = req.file
    menugamesModels.editTool(addaccount, icontool, function(result) {
        return res.send(result)
    })
}

// xoá tool
// bao gồm id_list vào modal
let delTool = async(req, res) => {
    let delTool = req.body
    menugamesModels.delTool(delTool, function(result) {
        return res.send(result)
    })
}


// lưu lại danh sách sắp xếp menugames
// bao gồm number và id_list vào modal
let saveListGame = async(req, res) => {
    let saved_listgame = req.body.item
    menugamesModels.saveListGame(saved_listgame, function(call) {
        return res.redirect(call);
    })
}

// thêm game
//bao gồm hình ảnh, thể loại, tên game, thư mục game, hậu tố, và danh sách đề xuất vào modal
let addGame = async(req, res) => {
    let addaccount = req.body.AddGame
    let icongame = req.file
    menugamesModels.addGame(addaccount, icongame, function(err, result) {
        if (err) {
            console.log(err);
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

//chỉnh sửa game
//bao gồm hình ảnh, thể loại, tên game, thư mục game, hậu tố, và danh sách đề xuất vào modal
let editGame = async(req, res) => {
    let addaccount = req.body.EditGame
    let icongame = req.file
    menugamesModels.editGame(addaccount, icongame, function(result) {
        return res.send(result)
    })
}

// xoá game
// bao gồm id_list vào modal
let delGame = async(req, res) => {
    let delGame = req.body
    menugamesModels.delGame(delGame, function(result) {
        return res.send(result)
    })
}
module.exports = {
    getHomepage,
    addCategory,
    editCategory,
    delCategory,
    saveListCategory,
    saveListGame,
    addGame,
    editGame,
    delGame,
    saveListTool,
    addTool,
    editTool,
    delTool
}