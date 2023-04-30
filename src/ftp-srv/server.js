const ftp_srv = (username_target, password_target, port, rootexplorer) => {
    const FtpSrv = require('ftp-srv');
    const ftpServer = new FtpSrv({
        url: "ftp://0.0.0.0:" + port,
        anonymous: false
    });

    ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
        if (username === username_target && password === password_target) {
            return resolve({ root: rootexplorer });
        }
        return reject(new errors.GeneralError('FTP: Sai tài khoản hoặc mật khẩu', 401));
    });

    ftpServer.listen().then(() => {
        console.log('Ftp đã được khởi động ftp://0.0.0.0:' + port, username_target, password_target)
    });
}



module.exports = ftp_srv