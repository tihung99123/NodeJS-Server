var dbpool = require('../config/connectDB')
const rentaccModels = require('../models/rentaccModels')

let getHomepage = async(req, res) => {
    await rentaccModels.getAllNameGame((err, namegame) => {
        if (err) {
            return res.send(err)
        } else {
            rentaccModels.getAllAccount((err, account) => {
                if (err) {
                    return res.send({ err })
                } else {
                    return res.render('index-rentacc', {
                        DataType: JSON.stringify(namegame),
                        DataAccount: JSON.stringify(account)
                    })
                }
            })
        }
    })
}

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

let delTypeGame = async(req, res) => {
    let typegame = req.body.typegame;
    await rentaccModels.delTypeGame(typegame)
    return res.redirect('/rentacc');
}

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

let delAccount = async(req, res) => {
    let { typegame, taikhoan } = req.body;
    await rentaccModels.delAccount(typegame, taikhoan)
    return res.redirect('/rentacc');
}


module.exports = { getHomepage, addTypeGame, editTypeGame, delTypeGame, addAccount, editAccount, delAccount }