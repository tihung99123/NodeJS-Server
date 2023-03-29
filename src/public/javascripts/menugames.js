$(document).ready(function() {
    getOrder();
});

function getOrder() {
    $.ajax({
        success: function(data) {
            // console.log(data[0]["element"]);
            moveElement(data[2]["element"], data[3]["element"]); //3 before 4
            moveElement(data[1]["element"], data[2]["element"]); //2 before 3
            moveElement(data[0]["element"], data[1]["element"]); //1 before 2
            setTimeout(gridDragInit(), 2);
        }
    });
}

function moveElement(move, toBeBefore) {
    $(move).insertBefore(toBeBefore);
}

function gridDragInit() {
    $("#basic-grid").gridstrap();
}

// Gửi tất cả thứ tự list game vào server dể cập nhật
function updateOrder(item) {
    $.ajax({
        type: "POST",
        url: "./menugames/data_send_menugames_sortorder",
        data: { item },
        success: function() {
            console.log("done");
        }
    });
}


function CHECKOKSAVE() {
    var listItems = document.querySelector("#basic-grid").children;
    var listArray = Array.from(listItems);
    var itemlist = []
    var counter = 0;
    listArray.forEach((item) => {
        counter++;
        if (item.id.includes("id_games-")) {
            itemlist.push({ IDList: counter, IDName: item.id })
        }
    });
    updateOrder(itemlist)
    window.location.href = "/menugames";
}


"use strict";

function dragNdrop(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
}

function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}

function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}

function Edit_SetGame(id_list, name, icon, category_id, name_game, folder, exe, parameter, linkfolder_target, linkfolder_link, reg_id) {

    var edit_set_game = document.getElementById('edit-set-game')
    edit_set_game.innerText = "Chỉnh Game - " + name
    edit_set_game.removeAttribute("disabled")

    var preview_edit = document.getElementById("preview-edit");
    while (preview_edit.firstChild) {
        preview_edit.removeChild(preview_edit.lastChild)
    }

    var previewImg_edit = document.createElement("img");
    previewImg_edit.setAttribute("src", "./images/" + icon);
    preview_edit.appendChild(previewImg_edit);

    var api_id = document.getElementById('api_id-edit')
    api_id.innerText = id_list
    category = document.getElementById('category_id-edit').innerText = category_id

    var namegame = document.getElementById('name_game-edit')
    namegame.setAttribute("placeholder", name_game)

    var folders = document.getElementById('folder-edit')
    folders.setAttribute("placeholder", folder)

    var exes = document.getElementById('exe-edit')
    exes.setAttribute("placeholder", exe)

    var parameters = document.getElementById('parameter-edit')
    parameters.setAttribute("placeholder", parameter)

    linkfolder_target = JSON.parse(linkfolder_target)
    var addinputtargetlink_edit = document.getElementById("addinputtargetlink-edit")
    while (addinputtargetlink_edit.firstChild) {
        addinputtargetlink_edit.removeChild(addinputtargetlink_edit.lastChild)
    }

    linkfolder_link = JSON.parse(linkfolder_link)
    var addinputlinklink_edit = document.getElementById("addinputlinklink-edit")
    while (addinputlinklink_edit.firstChild) {
        addinputlinklink_edit.removeChild(addinputlinklink_edit.lastChild)
    }

    reg_id = JSON.parse(reg_id)
    var addinputregreg_edit = document.getElementById("addinputregreg-edit")
    while (addinputregreg_edit.firstChild) {
        addinputregreg_edit.removeChild(addinputregreg_edit.lastChild)
    }

    for (var key in linkfolder_target) {
        _addinputedit("link", linkfolder_target[key]['Target'], linkfolder_link[key]['Link'])
    }
    for (var key in reg_id) {
        _addinputedit("reg", reg_id[key]['File'])
    }
}

function Edit_SetGameSend() {
    var api_id = document.getElementById("api_id-edit").value
    var category_id = document.getElementById("category_id-edit").value
    var name_game = document.getElementById("name_game-edit").value;
    var folder = document.getElementById("folder-edit").value;
    var exe = document.getElementById("exe-edit").value;
    var parameter = document.getElementById("parameter-edit").value;

    var listTarget_Link = document.querySelector("#addinputtargetlink-edit").children;
    var listTarget_Array = Array.from(listTarget_Link);
    var Linklist_target = []
    listTarget_Array.forEach((item) => {
        if (item.id.includes("target")) {
            var target = document.getElementById(item.id).value
            Linklist_target.push({ Tag_Target: item.id, Target: target })
        }
    });
    var listLink_Link = document.querySelector("#addinputlinklink-edit").children;
    var listLink_Array = Array.from(listLink_Link);
    var Linklist_link = []
    listLink_Array.forEach((item) => {
        if (item.id.includes("link")) {
            var link = document.getElementById(item.id).value
            Linklist_link.push({ Tag_Link: item.id, Link: link })
        }
    });

    var listReg = document.querySelector("#addinputregreg-edit").children;
    var listReg_Array = Array.from(listReg);
    var LinkReg_List = []
    listReg_Array.forEach((item) => {
        if (item.id.includes("reg")) {
            var REG_File = document.getElementById(item.id).value
            LinkReg_List.push({ Tag_Reg: item.id, File: REG_File })
        }
    });

    const fileInput = document.getElementById('EditGame');
    const file = fileInput.files[0];
    const formData = new FormData();
    const formData1 = new FormData();
    formData.append('EditGame', file);
    formData.append('EditGame', category_id);
    formData.append('EditGame', name_game);
    formData.append('EditGame', folder);
    formData.append('EditGame', exe);
    formData.append('EditGame', parameter);
    formData.append('EditGame', JSON.stringify(Linklist_target));
    formData.append('EditGame', JSON.stringify(Linklist_link));
    formData.append('EditGame', JSON.stringify(LinkReg_List));

    fetch('/menugames/add-game', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            window.alert("Thêm Thành công");
        })
        .catch(error => {
            window.alert("Lỗi khi thêm vui lòng nhập lại hoặc khởi động lai trang.");
        });

    window.location.href = "/menugames";

    // $.ajax({
    //     type: "POST",
    //     url: "./menugames/add-game",
    //     data: { category_id, name_game, name_disk, folder, exe, parameter, Linklist_target, Linklist_link, LinkReg_List },
    //     success: function() {
    //         console.log("done");
    //     }
    // });
}

function _addinputedit(option, data1, data2) {
    if (option == "link") {
        var listLinkFolder = document.querySelector("#addinputlink" + option + "-edit").children;
        var listArray_Link = Array.from(listLinkFolder);
        var count_Link = listArray_Link.length
        var addinputtarget = document.getElementById("addinputtarget" + option + "-edit");
        var addinputlink = document.getElementById("addinputlink" + option + "-edit");
        var createinput1 = document.createElement("input")
        createinput1.setAttribute("type", "text")
        createinput1.setAttribute("id", `target${count_Link}`)
        createinput1.setAttribute("placeholder", data1)
        createinput1.setAttribute("style", "width: 100%")
        var createinput2 = document.createElement("input");
        createinput2.setAttribute("type", "text")
        createinput2.setAttribute("id", `link${count_Link}`)
        createinput2.setAttribute("placeholder", data2)
        createinput2.setAttribute("style", "width: 100%")
        addinputtarget.appendChild(createinput1)
        addinputlink.appendChild(createinput2)
    } else if (option == "reg") {
        var listRegFolder = document.querySelector("#addinputreg" + option + "-edit").children;
        var listArray_Reg = Array.from(listRegFolder);
        var count_Reg = listArray_Reg.length
        var addinput = document.getElementById("addinputreg" + option + "-edit");
        var createinput1 = document.createElement("input")
        createinput1.setAttribute("type", "text")
        createinput1.setAttribute("id", `reg${count_Reg}`)
        createinput1.setAttribute("placeholder", data1)
        addinput.appendChild(createinput1)
    }
}

function _addinput(option) {
    if (option == "link") {
        var listLinkFolder = document.querySelector("#addinputlink" + option).children;
        var listArray_Link = Array.from(listLinkFolder);
        var count_Link = listArray_Link.length
        var addinputtarget = document.getElementById("addinputtarget" + option);
        var addinputlink = document.getElementById("addinputlink" + option);
        var createinput1 = document.createElement("input")
        createinput1.setAttribute("type", "text")
        createinput1.setAttribute("id", `target${count_Link}`)
        createinput1.setAttribute("placeholder", `Target-${count_Link}`)
        createinput1.setAttribute("style", "width: 100%")
        var createinput2 = document.createElement("input");
        createinput2.setAttribute("type", "text")
        createinput2.setAttribute("id", `link${count_Link}`)
        createinput2.setAttribute("placeholder", `Link-${count_Link}`)
        createinput2.setAttribute("style", "width: 100%")
        addinputtarget.appendChild(createinput1)
        addinputlink.appendChild(createinput2)
    } else if (option == "reg") {
        var listRegFolder = document.querySelector("#addinputreg" + option).children;
        var listArray_Reg = Array.from(listRegFolder);
        var count_Reg = listArray_Reg.length
        var addinput = document.getElementById("addinputreg" + option);
        var createinput1 = document.createElement("input")
        createinput1.setAttribute("type", "text")
        createinput1.setAttribute("id", `reg${count_Reg}`)
        createinput1.setAttribute("placeholder", `Reg-${count_Reg}`)
        addinput.appendChild(createinput1)
    }
}

function _addGame() {
    var category_id = document.getElementById("category_id").value
    var name_game = document.getElementById("name_game").value;
    var folder = document.getElementById("folder").value;
    var exe = document.getElementById("exe").value;
    var parameter = document.getElementById("parameter").value;

    var listTarget_Link = document.querySelector("#addinputtargetlink").children;
    var listTarget_Array = Array.from(listTarget_Link);
    var Linklist_target = []
    listTarget_Array.forEach((item) => {
        if (item.id.includes("target")) {
            var target = document.getElementById(item.id).value
            Linklist_target.push({ Tag_Target: item.id, Target: target })
        }
    });
    var listLink_Link = document.querySelector("#addinputlinklink").children;
    var listLink_Array = Array.from(listLink_Link);
    var Linklist_link = []
    listLink_Array.forEach((item) => {
        if (item.id.includes("link")) {
            var link = document.getElementById(item.id).value
            Linklist_link.push({ Tag_Link: item.id, Link: link })
        }
    });

    var listReg = document.querySelector("#addinputregreg").children;
    var listReg_Array = Array.from(listReg);
    var LinkReg_List = []
    listReg_Array.forEach((item) => {
        if (item.id.includes("reg")) {
            var REG_File = document.getElementById(item.id).value
            LinkReg_List.push({ Tag_Reg: item.id, File: REG_File })
        }
    });

    const fileInput = document.getElementById('AddGame');
    const file = fileInput.files[0];
    const formData = new FormData();
    const formData1 = new FormData();
    formData.append('AddGame', file);
    formData.append('AddGame', category_id);
    formData.append('AddGame', name_game);
    formData.append('AddGame', folder);
    formData.append('AddGame', exe);
    formData.append('AddGame', parameter);
    formData.append('AddGame', JSON.stringify(Linklist_target));
    formData.append('AddGame', JSON.stringify(Linklist_link));
    formData.append('AddGame', JSON.stringify(LinkReg_List));

    fetch('/menugames/add-game', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            window.alert("Thêm Thành công");
        })
        .catch(error => {
            window.alert("Lỗi khi thêm vui lòng nhập lại hoặc khởi động lai trang.");
        });

    window.location.href = "/menugames";

    // $.ajax({
    //     type: "POST",
    //     url: "./menugames/add-game",
    //     data: { category_id, name_game, name_disk, folder, exe, parameter, Linklist_target, Linklist_link, LinkReg_List },
    //     success: function() {
    //         console.log("done");
    //     }
    // });
}