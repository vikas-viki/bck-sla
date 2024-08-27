const { parentPort, Worker } = require('worker_threads');
const { SerialPort } = require('serialport');
const worker3 = new Worker("./workers/worker3.js");

parentPort.on('message', async (message) => {
    console.log("worker2", message);
    var port;
    if (message.message == "INIT") {
        port = new SerialPort({ path: message.port.portPath.toString(), baudRate: message.port.portBaudRate });
        port.on("open", ()=>{
            worker3.postMessage({ message: "INIT", port: message.port, writeFileName: message.writeFileName });
        });
    }

    if (message.message == "WRITE_PORT") {

    }
});
