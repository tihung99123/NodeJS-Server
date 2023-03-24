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
        url: "./senddata/test",
        data: { item },
        success: function(result) {
            console.log(result);
        }
    });
}

function GetAllValue() {
    var listItems = document.querySelector("#basic-grid").children;
    var listArray = Array.from(listItems);
    var itemlist = []
    var counter = 0;
    listArray.forEach((item) => {
        counter++;
        if (item.id.includes("col")) {
            itemlist.push({ IDList: counter, IDName: item.id })
        }
    });
    updateOrder(itemlist)
        // console.log(itemlist);
}