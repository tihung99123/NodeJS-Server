var express = require('express')
var viewEngine = require('./config/viewEngine')
var app = express()
var homeRouter = require('./routes/home')
var menugamesRouter = require('./routes/menugames')
var RentAccRouter = require('./routes/rentacc')
var apiRouter = require('./routes/api')

const http = require('http');
const httpServer = http.Server(app);
const socketio = require('./socketio/server')



require('dotenv').config()
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(express.json());

socketio(httpServer)
viewEngine(app)

app.use('/', urlencodedParser, homeRouter)
app.use('/', urlencodedParser, menugamesRouter)
app.use('/', urlencodedParser, RentAccRouter)
app.use('/', urlencodedParser, apiRouter)


httpServer.listen(port, function() {
    console.log(`server bắt đầu chạy http://127.0.0.1:${port}`);
})