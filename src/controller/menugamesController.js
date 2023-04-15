var menugamesModels = require('../models/menugamesModels')

const { PythonShell } = require('python-shell');

const Type = process.env.TYPE_SQL || "sqlite"


let getHomepage = async(req, res) => {


    let list_category = await menugamesModels.getAllCategory()
    let list_itemgames = await menugamesModels.getAllItemGames()
    if (Type == "mysql") {
        return res.render('index-menugames', { List_Category: JSON.stringify(list_category[0]), List_ItemGames: JSON.stringify(list_itemgames[0]) })
    } else if (Type == "sqlite") {
        return res.render('index-menugames', { List_Category: JSON.stringify(list_category), List_ItemGames: JSON.stringify(list_itemgames) })
    }

}

let saveListGame = async(req, res) => {
    let saved_listgame = req.body.item
    menugamesModels.saveListGame(saved_listgame, function(call) {
        return res.redirect(call);
    })
}

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

let delCategory = async(req, res) => {
    let { id, name } = req.body
    menugamesModels.delCategory(id, name, function(result) {
        return res.redirect(result)
    })
}

let addGame = async(req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'py_services/',
        args: ["http://127.0.0.1:3000/images/" + req.file.filename, "src/public/images/" + req.file.filename]
    };

    PythonShell.run('imageprocess.py', options, function(err, result) {
        if (err) throw err;
        console.log('result: ', result.toString());
    });

    let addaccount = req.body.AddGame
    let icongame = req.file
    menugamesModels.addGame(addaccount, icongame, function(err, result) {
        if (err) {
            return res.send("Lỗi")
        } else {
            return res.send(result)
        }
    })
}

let editGame = async(req, res) => {
    let addaccount = req.body.EditGame
    let icongame = req.file
    menugamesModels.editGame(addaccount, icongame, function(result) {
        return res.send(result)
    })
}

let delGame = async(req, res) => {
    let delGame = req.body
    menugamesModels.delGame(delGame, function(result) {
        return res.send(result)
    })
}
module.exports = { getHomepage, saveListGame, addCategory, editCategory, delCategory, addGame, editGame, delGame }