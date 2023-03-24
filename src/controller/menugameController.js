let getHomepage = function(req, res) {
    return res.render('index-menugames')
}

let SendAllDataListGames = function(req, res) {
    console.log(JSON.stringify(req.body));
}

module.exports = { getHomepage, SendAllDataListGames }