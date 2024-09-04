// worker2
const { parentPort, Worker } = require('worker_threads');
const worker3 = new Worker("./workers/worker3.js");
const { OPERATIONS, getPort, ERRORS } = require('../constants');
const fs = require("fs");

let pd;

parentPort.on('message', async (message) => {
    if (message.message === OPERATIONS.INIT) {
        try {
            pd = fs.openSync(message.port.path, 'r+');
        } catch (e) {
            throw (ERRORS.ERROR_OPENING_PORT, e);
        }
        worker3.postMessage({ message: OPERATIONS.INIT, pd, writeFileName: message.writeFileName });
    }

    if (message.message === OPERATIONS.PORT_WRITE) {
        const data = Buffer.from(message.data);

        try {
            fs.writeSync(pd, data);
            // console.log("PORT WRITE:", data.toString('utf8'));

            worker3.postMessage({ message: OPERATIONS.PORT_READ, length: data.length, pd, end: message.end });
        } catch (err) {
            console.error('Error writing to port:', err);
        }
    }
});