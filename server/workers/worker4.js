const { parentPort } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const { OPERATIONS, ERRORS } = require('../constants');

var filePath;
var _fd;
parentPort.on('message', async (message) => {
    if (message.message == OPERATIONS.INIT) {
        const writeFileName = message.writeFileName;
        filePath = path.join(__dirname, '..', '..', 'data', writeFileName);
        fs.open(filePath, 'a', (err, fd) => {
            _fd = fd;
            if (err) {
                throw (ERRORS.ERROR_OPENING_FILE, err);
            }
        });
    }

    if (message.message == OPERATIONS.FILE_WRITE) {
        if (!_fd) {
            try {
                fs.open(filePath, 'a', (err, fd) => {
                    _fd = fd;

                    if (err) {
                        throw (ERRORS.ERROR_OPENING_FILE, err);
                    }
                });
            } catch (e) { }
        }
        var buffer = Buffer.from(message.buffer, 'base64');

        fs.write(_fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {
            if (err) {
                console.error(ERRORS.ERROR_WRITING_FILE, err);
                return;
            }
            // console.log(`Wrote to file: "`, buffer.toString("base64"), '"');
        });

        if (message?.end.atEnd) {
            var file_size;
            var endTime = Date.now();
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    throw (ERRORS.ERROR_GETTING_FILE_STATS, err);
                }
                file_size = stats.size;

                console.log("READ_SIZE: ", message.end.size, "bytes \nWRITE_SIZE: ", file_size, "bytes");
                var noOfKBs = message.end.size / 1024;
                var timeTaken = (endTime - message.end.startTime) / 1000;
                var transferSpeed = Number(noOfKBs / timeTaken).toFixed(4);
                console.log(transferSpeed + " KBs/s");
            });
        }
    }
});
