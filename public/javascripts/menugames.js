$(document).ready(function() {
    getOrder();
});

//hàm khởi tạo di chuyển các block
function getOrder() {
    $.ajax({
        success: function(data) {
            // console.log(data[0]["element"]);
            moveElement(data[2]["element"], data[3]["element"]); //3 before 4
            moveElement(data[1]["element"], data[2]["element"]); //2 before 3
            moveElement(data[0]["element"], data[1]["element"]); //1 before 2
            setTimeout(gridDragInit(), 0.5);
        }
    });
}

//hàm khởi tạo di chuyển các block
function moveElement(move, toBeBefore) {
    $(move).insertBefore(toBeBefore);
}

function gridDragInit() {
    $("#basic-grid").gridstrap();
    $("#basic-grid_tool").gridstrap();
}

// Gửi tất cả thứ tự list thể loại vào server dể cập nhật
function updateOrder_Category(item) {
    $.ajax({
        type: "POST",
        url: "./menugames/data_send_menugames_sortorder_category",
        data: { item },
        success: function() {
            console.log("done");
        }
    });
}

// Gửi tất cả thứ tự list tool vào server dể cập nhật
function updateOrder_Tool(item) {
    $.ajax({
        type: "POST",
        url: "./menugames/data_send_menugames_sortorder_tool",
        data: { item },
        success: function() {
            console.log("done");
        }
    });
}

// Gửi tất cả thứ tự list game vào server dể cập nhật
function updateOrder_Game(item) {
    $.ajax({
        type: "POST",
        url: "./menugames/data_send_menugames_sortorder_game",
        data: { item },
        success: function() {
            console.log("done");
        }
    });
}


//lấy toàn bộ thông tin theo thứ tự đã sắp xếp vào mảng (thể loại)
function CHECKOKSAVE_Category() {
    var listCategory = document.querySelector("#table_tbody_category").children;
    var listArray = Array.from(listCategory);
    var Categorylist = []
    var counter = 0;
    listArray.forEach((item) => {
        counter++;
        if (item.id.includes("id_category-")) {
            Categorylist.push({ number: counter, category_name: item.getAttribute("category_name") })
        }
    });
    updateOrder_Category(Categorylist)
    window.location.href = "/menugames";
}


//lấy toàn bộ thông tin theo thứ tự đã sắp xếp vào mảng (game)
function CHECKOKSAVE_Game() {
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
    updateOrder_Game(itemlist)
    window.location.href = "/menugames";
}

//lấy toàn bộ thông tin theo thứ tự đã sắp xếp vào mảng (tool)
function CHECKOKSAVE_Tool() {
    var listItems = document.querySelector("#basic-grid_tool").children;
    var listArray = Array.from(listItems);
    var itemlist = []
    var counter = 0;
    listArray.forEach((item) => {
        counter++;
        if (item.id.includes("id_tools-")) {
            itemlist.push({ number: counter, api_id: item.getAttribute("api_id") })
        }
    });
    updateOrder_Tool(itemlist)
    window.location.href = "/menugames";
}

"use strict";

//kẻo thả vào ô trong modalbox hình ảnh(addgame)
function dragNdrop(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-game");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
}

//kẻo thả vào ô trong modalbox hình ảnh(editgame)
function dragNdrop_edit(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-edit");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
}

//kẻo thả vào ô trong modalbox hình ảnh(addtool)
function dragNdrop_tool(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-tool");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
}

//kẻo thả vào ô trong modalbox hình ảnh(edittool)
function dragNdrop_tool_edit(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-tool-edit");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);

}

// hàm kéo vào các id
function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}

// hàm thả vào các id
function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}

//chỉnh sửa thể loại lấy thông tin arg từ trong hàm và set lại các thông tin trong modalbox chỉnh sửa thể loại
function edit_Category(getid) {
    document.getElementById("get-category").setAttribute("value", getid)
    document.getElementById("getDel-category_id").setAttribute("value", getid)
    document.getElementById("getDel-category_name").setAttribute("value", getid)
}

//thêm tool get id từ các element vào mảng và up lên máy chủ
function _addTool() {
    var name_tool = document.getElementById("name_tool").value;
    var folder = document.getElementById("folder_tool").value;
    var parameter = document.getElementById("parameter_tool").value;

    const fileInput = document.getElementById('AddTool');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('AddTool', file);
    formData.append('AddTool', name_tool);
    formData.append('AddTool', folder);
    formData.append('AddTool', parameter);

    fetch('/menugames/add-tool', {
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
}

//chỉnh sửa tool get id từ các element vào mảng và up lên máy chủ
function _editTool() {
    var api_id = document.getElementById("api_id-edit_tool").textContent
    var name_tool = document.getElementById("name_tool-edit_tool");
    var icon_old = document.getElementById("icon-old-edit_tool");
    var folder = document.getElementById("folder-edit_tool");
    var parameter = document.getElementById("parameter-edit_tool");


    const fileInput = document.getElementById('EditTool');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('EditTool', file);

    formData.append('EditTool', api_id);

    if (name_tool.value.length > 0) {
        formData.append('EditTool', name_tool.value);
    } else {
        formData.append('EditTool', name_tool.placeholder);
    }
    formData.append('EditTool', icon_old.placeholder);

    if (folder.value.length > 0) {
        formData.append('EditTool', folder.value);
    } else {
        formData.append('EditTool', folder.placeholder);
    }

    if (parameter.value.length > 0) {
        formData.append('EditTool', parameter.value);
    } else {
        formData.append('EditTool', parameter.placeholder);
    }

    fetch('/menugames/edit-tool', {
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
}

//xoá tool get id từ các element vào mảng và up lên máy chủ
function _delTool() {
    var api_id = document.getElementById("api_id-edit_tool").textContent
    var icon_old = document.getElementById("icon-old-edit_tool").placeholder;
    $.ajax({
        type: "POST",
        url: "./menugames/del-tool",
        data: { api_id, icon_old },
        success: function(finish) {
            window.alert(finish);
            window.location.href = "/menugames";
        }
    });
}

//chỉnh sửa các thông tin trong modal box của chỉnh sửa công cụ
function Edit_SetTool(id_list, name, icon, name_game, folder, parameter) {


    var edit_set_game = document.getElementById('edit-set-tool')
    edit_set_game.innerText = "Chỉnh Tool - " + name
    edit_set_game.removeAttribute("disabled")

    var preview_edit = document.getElementById("preview-edit");
    while (preview_edit.firstChild) {
        preview_edit.removeChild(preview_edit.lastChild)
    }

    var previewImg_edit = document.createElement("img");
    previewImg_edit.setAttribute("src", "./images/" + icon);
    preview_edit.appendChild(previewImg_edit);

    var api_id = document.getElementById('api_id-edit_tool')
    api_id.innerText = id_list

    var icon_old = document.getElementById('icon-old-edit_tool')
    icon_old.setAttribute("placeholder", icon)

    var namegame = document.getElementById('name_tool-edit_tool')
    namegame.setAttribute("placeholder", name_game)

    var folders = document.getElementById('folder-edit_tool')
    folders.setAttribute("placeholder", folder)

    var parameters = document.getElementById('parameter-edit_tool')
    parameters.setAttribute("placeholder", parameter)


}


//thêm game get id từ các element vào mảng và up lên máy chủ
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

//chỉnh sửa game get id từ các element vào mảng và up lên máy chủ
function _editGame() {
    var api_id = document.getElementById("api_id-edit").textContent
    var category_id = document.getElementById("category_id-editget")
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
}

//xoá game get id từ các element vào mảng và up lên máy chủ
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

//chỉnh sửa game get tất cả element id vào modal box chỉnh sửa item game 
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

// thêm dữ liệu trong các modal box đã chỉ định
function _addinputedit(option, data1, data2) {
    if (option == "child") {
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

//thêm dữ liệu vào modal box đã được chỉ định (childs)
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