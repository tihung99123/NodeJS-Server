// animation move tất cả thứ tự game để sắp xếp
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
        url: "./data_send_sortorder",
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

function Edit_SetGame(name, id) {
    var edit_set_game = document.getElementById('edit-set-game')
    edit_set_game.innerText = "Chỉnh Game - " + name
    edit_set_game.removeAttribute("disabled")
}