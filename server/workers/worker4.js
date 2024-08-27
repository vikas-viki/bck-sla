const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
    console.log("reading 4");
    console.log("worker4", message);
});
