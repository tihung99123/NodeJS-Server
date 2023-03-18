const { query } = require('../config/connectDB');
var dbpool = require('../config/connectDB')

const socketio = (httpServer) => {
    const io = require('socket.io')(httpServer, { maxHttpBufferSize: 1e7 });
    io.on('connection', (server) => {
        console.log(server.id, 'is connected');
        server.on('message', (data) => {
            console.log('message', data);
        })
        server.on('disconnect', () => {
            dbpool.query('delete from `status` where clientname = ?', server.id, function(err, deleteclientname) {
                if (err) {
                    console.log('Không có clientname này trong status');
                } else {
                    console.log(server.id, 'disconnected -- Done');
                }
            })
            server.disconnect()
        })
        server.on('GETLISTACCOUNT', (typegame) => {
            dbpool.query('SELECT * FROM `account` AS t1 WHERE NOT EXISTS ( SELECT 1 FROM `status` AS t2 WHERE t2.ID = t1.ID ) AND t1.typegame = "setting";',
                typegame,
                function(err, listaccount) {
                    if (err) {
                        console.log("Lỗi khi kết nối đến database (102)");
                    } else {
                        server.emit("SENDLISTACC", listaccount)
                    }
                })
        })
        server.on('LOGINACCOUNT', (data) => {
            data = data.split('|')
            dbpool.query('SELECT * FROM `account` where account = ?', data[0], function(err, account) {
                if (err) {
                    console.log("Lỗi khi kết nối đến database (103)");
                } else {
                    dbpool.query('select * from `status` where account = ?', data[0], function(err, result) {
                        if (err) {
                            console.log("Lỗi khi kết nối đến database (104)");
                        } else {
                            if (result == "") {
                                dbpool.execute('insert into status(id, typegame, account, clientid, clientname) values (?, ?, ?, ?, ?)', [account[0]['id'], account[0]['typegame'], data[0], data[1], server.id])
                                server.emit("RUNGAMEACCOUNT", account)
                            } else {
                                server.emit("MESSAGEUsed", "Tài khoản đã có người sử dụng")
                            }
                        }
                    })
                }
            })
        })
        server.on('LOGOUTACCOUNT', (data) => {
            dbpool.query('delete from `status` where account = ? and clientname = ?', [data, server.id], function(err, deleteclientname) {
                if (err) {
                    console.log('Không có clientname này trong status');
                } else {
                    console.log(server.id, 'is loggout account', data);
                }
            })
        })
        server.on('DONATEACCOUNT', (data) => {
            console.log('Quyên góp tài khoản miễn phí', data);
        })
    })
}


module.exports = socketio