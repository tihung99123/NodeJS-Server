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
            itemlist.push({ number: counter, api_id: item.getAttribute("api_id") })
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

function dragNdrop_edit(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-edit");
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

function Edit_SetGame(id_list, name, icon, category_id, name_game, folder, parameter, child_item, data_child) {


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

    var icon_old = document.getElementById('icon-old-edit')
    icon_old.setAttribute("placeholder", icon)

    var namegame = document.getElementById('name_game-edit')
    namegame.setAttribute("placeholder", name_game)

    var folders = document.getElementById('folder-edit')
    folders.setAttribute("placeholder", folder)

    var parameters = document.getElementById('parameter-edit')
    parameters.setAttribute("placeholder", parameter)



    var childitems_edit = document.getElementById("edit_child")
    while (childitems_edit.firstChild) {
        childitems_edit.removeChild(childitems_edit.lastChild)
    }

    child_item = JSON.parse(child_item)
    for (var key in child_item) {
        _addinputedit("child", child_item[key], data_child)
    }

}

function _editGame() {
    var api_id = document.getElementById("api_id-edit").textContent
    var category_id = document.getElementById("category_id-edit")
    var name_game = document.getElementById("name_game-edit");
    var icon_old = document.getElementById("icon-old-edit");
    var folder = document.getElementById("folder-edit");
    var parameter = document.getElementById("parameter-edit");


    var List_Child = document.querySelector("#edit_child").children;
    var listChild_Array = Array.from(List_Child);
    var ListChild_link = []
    listChild_Array.forEach((item) => {
        if (item.id.includes("edit_childitem")) {
            var Item_child_id_list = document.getElementById(item.id).value
            var Item_child_name_game = document.getElementById(item.id).options[document.getElementById(item.id).selectedIndex].text
            ListChild_link.push({ id_list: Item_child_id_list, name_game: Item_child_name_game })
        }
    });

    const fileInput = document.getElementById('EditGame');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('EditGame', file);

    formData.append('EditGame', api_id);

    formData.append('EditGame', category_id.value);

    if (name_game.value.length > 0) {
        formData.append('EditGame', name_game.value);
    } else {
        formData.append('EditGame', name_game.placeholder);
    }
    formData.append('EditGame', icon_old.placeholder);

    if (folder.value.length > 0) {
        formData.append('EditGame', folder.value);
    } else {
        formData.append('EditGame', folder.placeholder);
    }

    if (parameter.value.length > 0) {
        formData.append('EditGame', parameter.value);
    } else {
        formData.append('EditGame', parameter.placeholder);
    }
    formData.append('EditGame', JSON.stringify(ListChild_link));


    fetch('/menugames/edit-game', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            window.alert(result);
            window.location.href = "/menugames";
        })
        .catch(error => {
            window.alert("Lỗi khi thêm vui lòng nhập lại hoặc khởi động lại trang.");
        });


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
        createinput1.setAttribute("id", `target-edit-${count_Link}`)
        createinput1.setAttribute("placeholder", data1)
        createinput1.setAttribute("style", "width: 100%")
        var createinput2 = document.createElement("input");
        createinput2.setAttribute("type", "text")
        createinput2.setAttribute("id", `link-edit-${count_Link}`)
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
        createinput1.setAttribute("id", `reg-edit-${count_Reg}`)
        createinput1.setAttribute("placeholder", data1)
        addinput.appendChild(createinput1)
    } else if (option == "child") {
        var listChild = document.querySelector("#edit_child").children;
        var listChildA = Array.from(listChild);
        var count_Child = listChildA.length
        var addselect_child = document.getElementById("edit_child");
        var createselect = document.createElement("select")
        createselect.setAttribute("id", `edit_childitem${count_Child}`)
        createselect.setAttribute("class", "form-select")
        createselect.setAttribute("aria-label", `Default select example`)
        var createoption = document.createElement("option")
        createoption.setAttribute("selected", "")
        createoption.setAttribute("value", data1["id_list"])
        createoption.textContent = data1["name_game"]
        createselect.appendChild(createoption)
        List_ItemGames = JSON.parse(data2)
        for (var key in List_ItemGames) {
            var createoption_list = document.createElement("option")
            createoption_list.setAttribute("value", List_ItemGames[key]['id_list'])
            createoption_list.textContent = List_ItemGames[key]['name_game']
            createselect.appendChild(createoption_list)
        }
        addselect_child.appendChild(createselect)
    }
}


function _addGame() {
    var category_id = document.getElementById("category_id").value
    var name_game = document.getElementById("name_game").value;
    var folder = document.getElementById("folder").value;
    var parameter = document.getElementById("parameter").value;


    var child_Item_Games = document.querySelector("#add_child").children;
    var listChildItems_Array = Array.from(child_Item_Games);
    var listChildItems_List = []
    listChildItems_Array.forEach((item) => {
        if (item.id.includes("childitem")) {
            var Item_child_id_list = document.getElementById(item.id).value
            var Item_child_name_game = document.getElementById(item.id).options[document.getElementById(item.id).selectedIndex].text
            listChildItems_List.push({ id_list: Item_child_id_list, name_game: Item_child_name_game })
        }
    });


    const fileInput = document.getElementById('AddGame');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('AddGame', file);
    formData.append('AddGame', category_id);
    formData.append('AddGame', name_game);
    formData.append('AddGame', folder);
    formData.append('AddGame', parameter);
    formData.append('AddGame', JSON.stringify(listChildItems_List));


    if (category_id != "Bấm vào để chọn thể loại") {
        fetch('/menugames/add-game', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                window.alert(result);
                window.location.href = "/menugames";
            })
            .catch(error => {
                window.alert("Lỗi khi thêm vui lòng nhập lại hoặc khởi động lại trang.");
            });

    } else {

        window.alert("Chưa chọn thể loại");
    }


}

function _delGame() {
    var api_id = document.getElementById("api_id-edit").textContent
    var icon_old = document.getElementById("icon-old-edit").placeholder;
    $.ajax({
        type: "POST",
        url: "./menugames/del-game",
        data: { api_id, icon_old },
        success: function(finish) {
            window.alert(finish);
            window.location.href = "/menugames";
        }
    });
}

function edit_Category(getid) {
    document.getElementById("get-category").setAttribute("value", getid)
    document.getElementById("getDel-category_id").setAttribute("value", getid)
    document.getElementById("getDel-category_name").setAttribute("value", getid)
}


function _addchilds(List_ItemGames, option) {
    if (option == "add") {
        var listChild = document.querySelector("#add_child").children;
        var listChildA = Array.from(listChild);
        var count_Child = listChildA.length
        var addselect_child = document.getElementById("add_child");
        var createselect = document.createElement("select")
        createselect.setAttribute("id", `childitem${count_Child}`)
        createselect.setAttribute("class", "form-select")
        createselect.setAttribute("aria-label", `Default select example`)
        var createoption = document.createElement("option")
        createoption.setAttribute("selected", "")
        createoption.textContent = "Chọn Child - Items Games " + count_Child
        createselect.appendChild(createoption)
        List_ItemGames = JSON.parse(List_ItemGames)
        for (var key in List_ItemGames) {
            var createoption_list = document.createElement("option")
            createoption_list.setAttribute("value", List_ItemGames[key]['id_list'])
            createoption_list.textContent = List_ItemGames[key]['name_game']
            createselect.appendChild(createoption_list)
        }
        addselect_child.appendChild(createselect)
    } else if (option == "edit") {
        var listChild = document.querySelector("#edit_child").children;
        var listChildA = Array.from(listChild);
        var count_Child = listChildA.length
        var addselect_child = document.getElementById("edit_child");
        var createselect = document.createElement("select")
        createselect.setAttribute("id", `edit_childitem${count_Child}`)
        createselect.setAttribute("class", "form-select")
        createselect.setAttribute("aria-label", `Default select example`)
        var createoption = document.createElement("option")
        createoption.setAttribute("selected", "")
        createoption.textContent = "Chọn Child - Items Games " + count_Child
        createselect.appendChild(createoption)
        List_ItemGames = JSON.parse(List_ItemGames)
        for (var key in List_ItemGames) {
            var createoption_list = document.createElement("option")
            createoption_list.setAttribute("value", List_ItemGames[key]['id_list'])
            createoption_list.textContent = List_ItemGames[key]['name_game']
            createselect.appendChild(createoption_list)
        }
        addselect_child.appendChild(createselect)
    }
}

function getImageFromURL() {

    const input = prompt("Nhập URL", "https://play-lh.googleusercontent.com/CrHJi6586GgYkSRAtCYu10Pq5Bq6OrpHSjhj36At-9oGGIaCRLTbPsgkVpACFwrZHw")
    var preview = document.getElementById("preview");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", input);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
}