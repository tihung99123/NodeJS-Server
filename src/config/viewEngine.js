var express = require('express')

// khởi tạo ejs vào các index
//khởi tạo views public xuất các js,css,image,....
const configViewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set("views", "./src/views")
    app.use(express.static('./src/public'))
}

module.exports = configViewEngine;