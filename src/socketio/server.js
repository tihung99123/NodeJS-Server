var dbpool = require('../config/connectDB')
var rentaccModels = require('../models/rentaccModels')
var menugamesModels = require('../models/menugamesModels')

require('dotenv').config()
const Type = process.env.TYPE_SQL

const socketio = (httpServer) => {
    const io = require('socket.io')(httpServer, {
        maxHttpBufferSize: 1e7
    });
    io.on('connection', (server) => {
        console.log(server.id, 'is connected');

        server.on('message', (data) => {
            console.log('message', data);
        })

        server.on('disconnect', () => {
            if (Type == "mysql") {
                dbpool.query('delete from `rentaccount_status` where clientname = ?', server.id, function(err, deleteclientname) {
                    if (err) {
                        console.log('Không có clientname này trong status');
                    } else {
                        console.log(server.id, 'disconnected -- Done');
                    }
                })
            } else if (Type == "sqlite") {
                dbpool.db.all('delete from `rentaccount_status` where clientname = ?', server.id, function(err, deleteclientname) {
                    if (err) {
                        console.log('Không có clientname này trong status');
                    } else {
                        console.log(server.id, 'disconnected -- Done');
                    }
                })
            }
            server.disconnect()
        })

        server.on('GETLISTACCOUNT', (typegame) => {
            if (Type == "mysql") {
                dbpool.query('SELECT * FROM `rentaccount_account` AS t1 WHERE NOT EXISTS ( SELECT 1 FROM `rentaccount_status` AS t2 WHERE t2.ID = t1.ID ) AND t1.typegame = ?;',
                    typegame,
                    function(err, listaccount) {
                        if (err) {
                            console.log("Lỗi khi kết nối đến database (102)");
                        } else {
                            server.emit("SENDLISTACC", listaccount)
                        }
                    })
            } else if (Type == "sqlite") {
                dbpool.db.all('SELECT * FROM `rentaccount_account` AS t1 WHERE NOT EXISTS ( SELECT 1 FROM `rentaccount_status` AS t2 WHERE t2.ID = t1.ID ) AND t1.typegame = ?;',
                    typegame,
                    function(err, listaccount) {
                        if (err) {
                            console.log("Lỗi khi kết nối đến database (102)");
                        } else {
                            server.emit("SENDLISTACC", listaccount)
                        }
                    })
            }
        })

        server.on('LOGINACCOUNT', (data) => {
            data = data.split('|')
            if (Type == "mysql") {
                dbpool.query('SELECT * FROM `rentaccount_account` where account = ?', data[0], function(err, account) {
                    if (err) {
                        console.log("Lỗi khi kết nối đến database (103)");
                    } else {
                        dbpool.query('select * from `rentaccount_status` where account = ?', data[0], function(err, result) {
                            if (err) {
                                console.log("Lỗi khi kết nối đến database (104)");
                            } else {
                                if (result == "") {
                                    dbpool.execute('insert into rentaccount_status(id, typegame, account, clientid, clientname) values (?, ?, ?, ?, ?)', [account[0]['id'], account[0]['typegame'], data[0], data[1], server.id])
                                    server.emit("RUNGAMEACCOUNT", account)
                                } else {
                                    server.emit("MESSAGEUsed", "Tài khoản đã có người sử dụng")
                                }
                            }
                        })
                    }
                })
            } else if (Type == "sqlite") {
                dbpool.db.all('SELECT * FROM `rentaccount_account` where account = ?', data[0], function(err, account) {
                    if (err) {
                        console.log("Lỗi khi kết nối đến database (103)");
                    } else {
                        dbpool.db.all('select * from `rentaccount_status` where account = ?', data[0], function(err, result) {
                            if (err) {
                                console.log("Lỗi khi kết nối đến database (104)");
                            } else {
                                if (result == "") {
                                    dbpool.db.run('insert into rentaccount_status(id, typegame, account, clientid, clientname) values (?, ?, ?, ?, ?)', [account[0]['id'], account[0]['typegame'], data[0], data[1], server.id])
                                    server.emit("RUNGAMEACCOUNT", account)
                                } else {
                                    server.emit("MESSAGEUsed", "Tài khoản đã có người sử dụng")
                                }
                            }
                        })
                    }
                })

            }
        })

        server.on('LOGOUTACCOUNT', (data) => {
            if (Type == "mysql") {
                dbpool.query('delete from `rentaccount_status` where account = ? and clientname = ?', [data, server.id], function(err, deleteclientname) {
                    if (err) {
                        console.log('Không có clientname này trong status');
                    } else {
                        console.log(server.id, 'is loggout account', data);
                    }
                })
            } else if (Type == "sqlite") {
                dbpool.db.run('delete from `rentaccount_status` where account = ? and clientname = ?', [data, server.id], function(err, deleteclientname) {
                    if (err) {
                        console.log('Không có clientname này trong status');
                    } else {
                        console.log(server.id, 'is loggout account', data);
                    }
                })
            }
        })
        server.on('DONATEACCOUNT', (data) => {
            console.log('Quyên góp tài khoản miễn phí', data);
        })

        server.on('GETLISTMENUGAMES', async(data) => {
            if (Type == "mysql") {
                let listitemgames = await menugamesModels.getAllItemGames()
                let listcategory = await menugamesModels.getAllCategory()
                let sortorder = await menugamesModels.getSortOrderItems()
                server.emit("GETLISTMENUGAMES", {
                    'listitemgames': listitemgames[0],
                    'listcategory': listcategory[0],
                    'sortorder': sortorder[0]
                })
            } else if (Type == "sqlite") {
                let listitemgames = await menugamesModels.getAllItemGames()
                let listcategory = await menugamesModels.getAllCategory()
                let sortorder = await menugamesModels.getSortOrderItems()
                server.emit("GETLISTMENUGAMES", {
                    'listitemgames': listitemgames,
                    'listcategory': listcategory,
                    'sortorder': sortorder
                })
            }
        })

    })
}


module.exports = socketio