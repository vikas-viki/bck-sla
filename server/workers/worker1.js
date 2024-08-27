const { parentPort, Worker } = require('worker_threads');
const worker2 = new Worker("./workers/worker2.js");

parentPort.on('message', (message) => {
    console.log("worker1: ", message);
    const readFileName = message.readFileName;
    worker2.postMessage({ message: "INIT", port: message.port, writeFileName: message.writeFileName });
});
