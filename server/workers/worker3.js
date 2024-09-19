// worker3
const { parentPort, Worker } = require('worker_threads');
const { OPERATIONS, READ_SIZE } = require('../constants');
const worker4 = new Worker("./workers/worker4.js");
const fs = require("fs");

let pd;

parentPort.on('message', async (message) => {
    if (message.message === OPERATIONS.INIT) {
        pd = message.pd;
        worker4.postMessage({ message: OPERATIONS.INIT, writeFileName: message.writeFileName });
    }

    if (message.message === OPERATIONS.PORT_READ) {
        var size = Math.min(READ_SIZE, message.length);
        const buffer = Buffer.alloc(size);
        // reading data from the port
        fs.readSync(message.pd, buffer, 0, buffer.length, null);
        // console.log("PORT READ:", buffer.toString('base64'));

        worker4.postMessage({ message: OPERATIONS.FILE_WRITE, buffer, end: message.end });
    }
});