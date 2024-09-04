const { parentPort } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const { OPERATIONS, ERRORS } = require('../constants');

var filePath;
var _fd;
parentPort.on('message', (message) => {
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
                    console.log({ _fd });
                    if (err) {
                        throw (ERRORS.ERROR_OPENING_FILE, err);
                    }
                });
            } catch (e) { }
        }
        var buffer = Buffer.from(message.buffer);

        fs.write(_fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {
            if (err) {
                console.error(ERRORS.ERROR_WRITING_FILE, err);
                return;
            }

            console.log(`Wrote to file: "`, buffer.toString('utf-8'), '"');
        });
    }
});
