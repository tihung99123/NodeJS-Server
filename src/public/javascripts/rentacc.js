function EditTypeGame(typegameold, settingmacroold) {
    document.getElementById("typegameold-input").setAttribute("value", typegameold)
    document.getElementById("settingmacroold-input").setAttribute("value", settingmacroold)
}

function DelTypeGame(typegame) {
    document.getElementById("del-typegameinput").setAttribute("value", typegame)
}

function EditAccount(id,typegameold) {
    document.getElementById("idaccount-input").setAttribute("value", id)
    document.getElementById("typegamenew-input").innerText = typegameold
}

function DelAccount(typegameold, taikhoanold) {
    document.getElementById("del-typeinput").setAttribute("value", typegameold)
    document.getElementById("del-taikhoaninput").setAttribute("value", taikhoanold)
}

// function CheckTypeGameExists() {

// }