const { PythonShell } = require('python-shell');
var fs = require('fs')

let processPicture = function(hostip, port, pythonfolder, pythonfile, sourcefile, destinationfile) {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: `${pythonfolder}/`,
        args: [`http://${hostip}:${port}/images/` + sourcefile, "public/images/" + destinationfile]
    };
    PythonShell.run(pythonfile, options, function(err, result) {
        if (err) throw err;
        console.log('result: ', result.toString());
    });
}

let deleteFile = function(fileDelete) {
    fs.unlink('./public/images/' + fileDelete, (err) => {
        if (err) {
            throw err;
        }
        console.log("Xoá thành công.");
    });
}

module.exports = {
    processPicture,
    deleteFile
}