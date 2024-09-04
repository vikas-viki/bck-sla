// worker 1
const { parentPort, Worker } = require('worker_threads');
const worker2 = new Worker("./workers/worker2.js");
const fs = require('fs');
const path = require('path');
const { READ_SIZE, ERRORS, OPERATIONS } = require('../constants');

parentPort.on('message', (message) => {
    // console.log("worker1: ", message);
    worker2.postMessage({ message: OPERATIONS.INIT, port: message.port, writeFileName: message.writeFileName });

    const FILE_NAME = message.readFileName;
    const FILE_PATH = path.join(__dirname, '..', '..', 'data', FILE_NAME);

    var read_position = 0;
    var file_size;
    var read_size = READ_SIZE;

    fs.open(FILE_PATH, 'r', (err, fd) => {
        if (err) {
            throw (ERRORS.ERROR_OPENING_FILE, err);
        }

        fs.stat(FILE_PATH, (err, stats) => {
            if (err) {
                throw (ERRORS.ERROR_GETTING_FILE_STATS, err);
            }
            file_size = stats.size;
        });

        function readNext() {
            const BUFFER = Buffer.alloc(read_size);
            fs.read(fd, BUFFER, 0, read_size, read_position, (err, num) => {
                if (err) {
                    throw (ERRORS.ERROR_READING_FILE, err);
                }

                if (read_position < file_size) {
                    read_position += read_size;
                    read_size = Math.min(read_size, file_size - read_position);

                    console.log("FILE READ: ",BUFFER.toString('utf8'));
                    worker2.postMessage({ message: OPERATIONS.PORT_WRITE, data: BUFFER })
                    readNext();
                } else {
                    console.log('Reached the end of the file.');
                    fs.close(fd, (err) => {
                        if (err) throw (ERRORS.ERROR_CLOSING_FILE, err);
                    });
                }
            });
        }
        readNext();
    });

});
