let getHomepage = function(req, res) {
    return res.render('index-menugames')
}

let SendAllDataListGames = function(req, res) {
    // console.log(req.body.item.length);
    for (let key in req.body.item) {
        console.log(req.body.item[key].IDList);
        console.log(req.body.item[key].IDName);
    }
}

let addCategory = function(req, res) {

}

module.exports = { getHomepage, SendAllDataListGames }