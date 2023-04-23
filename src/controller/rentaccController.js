const rentaccModels = require('../models/rentaccModels')
require('dotenv').config()
const Type = process.env.TYPE_SQL || "sqlite"

// khởi tạo trang chính
let getHomepage = async(req, res) => {
        let namegame = await rentaccModels.getAllNameGame()
        let account = await rentaccModels.getAllAccount()
        if (Type == "mysql") {
            return res.render('index-rentacc', {
                DataType: JSON.stringify(namegame[0]),
                DataAccount: JSON.stringify(account[0])
            })
        } else if (Type == "sqlite") {
            return res.render('index-rentacc', {
                DataType: JSON.stringify(namegame),
                DataAccount: JSON.stringify(account)
            })
        }

    }
    // thêm loại game
    // bao gồm loại game và tên marcro vào modal
let addTypeGame = async(req, res) => {
        let { typegame, settingmacro } = req.body;
        await rentaccModels.addTypeGame(typegame, settingmacro, (err, result) => {
            if (err) {
                return res.send("Lỗi")
            } else {
                return res.send(result)
            }
        })
    }
    // chỉnh sửa loai game
    // bao gồm loại game và tên marcro vào modal
let editTypeGame = async(req, res) => {
    let { typegameold, settingmacroold, typegamenew, settingmacronew } = req.body;
    await rentaccModels.editTypeGame(typegameold, settingmacroold, typegamenew, settingmacronew, (err, result) => {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

// xoá loại game
// bao gồm tên loại game vào modal
let delTypeGame = async(req, res) => {
    let typegame = req.body.typegame;
    await rentaccModels.delTypeGame(typegame)
    return res.redirect('/rentacc');
}

// thêm tài khoản
// bao gồm loại game tài khoản mật khẩu vào modal
let addAccount = async(req, res) => {
    let { typegame, taikhoan, matkhau } = req.body;
    if (typegame == "Chọn loại game") return res.redirect('/rentacc');
    await rentaccModels.addAccount(typegame, taikhoan, matkhau, (err, result) => {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

// chỉnh sửa tài khoản
// bao gồm loại game tài khoản mật khẩu vào modal
let editAccount = async(req, res) => {
    let { idaccount, typegamenew, taikhoannew, matkhaunew } = req.body;
    if (typegamenew == "Chọn loại game") return res.redirect('/rentacc');
    await rentaccModels.editAccount(idaccount, typegamenew, taikhoannew, matkhaunew, (err, result) => {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

//xoá tài khoản
// bao gồm loại game tài khoản mật khẩu vào modal
let delAccount = async(req, res) => {
    let { typegame, taikhoan } = req.body;
    await rentaccModels.delAccount(typegame, taikhoan)
    return res.redirect('/rentacc');
}


module.exports = { getHomepage, addTypeGame, editTypeGame, delTypeGame, addAccount, editAccount, delAccount }