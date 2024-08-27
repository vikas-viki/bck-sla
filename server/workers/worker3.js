const { parentPort, Worker } = require('worker_threads');
const { SerialPortStream } = require('@serialport/stream')
const { MockBinding } = require('@serialport/binding-mock')
const SerialPort = require('serialport');
const worker4 = new Worker("./workers/worker4.js");

parentPort.on('message', async (message) => {
    console.log("worker3:", message);
    if (message.message == "INIT") {
        MockBinding.createPort(message.port.portPath.toString(), { echo: true, record: true });

        const port = new SerialPortStream({ binding: MockBinding, path: message.port.portPath.toString(), baudRate: message.port.portBaudRate })

        worker4.postMessage({ message: "INIT", writeFileName: message.writeFileName });
    }
});
