const express = require('express');
const { SerialPort } = require('serialport');
const { SerialPortStream } = require('@serialport/stream')
const { MockBinding } = require('@serialport/binding-mock')
const { Worker } = require('worker_threads');

const cors = require('cors');
const app = express();

const worker1 = new Worker("./workers/worker1.js");

app.use(cors());
app.use(express.json());

var portPath, portBaudRate, readFileName, writeFileName;

app.post('/open-port', async (req, res) => {
    const { productId, vendorId, baudRate } = req.body;

    SerialPort.list().then(ports => {
        const portInfo = ports.find(port =>
            port.productId === productId.toString(16) &&
            port.vendorId === vendorId.toString(16)
        );

        if (portInfo) {
            portPath = portInfo.path.toString();
            portBaudRate = baudRate;
            // port = new SerialPort({ path: portInfo.path.toString(), baudRate });

            // port.on('open', () => {
            res.status(200).send("PORT OPENED!");
            // });

            // port.on('error', (err) => {
            //     console.error('Error opening port:', err);
            //     res.status(500).send('Failed to open port');
            // });

            // port.on('data', (data) => {
            //     console.log('Data:', data.toString());
            // });
        } else {
            res.status(404).send('PORT NOT FOUND!');
        }
    }).catch(err => {
        console.error('Error listing ports:', err);
        res.status(500).send('NO PORTS FOUND!');
    });
});

app.post('/set-files', async (req, res) => {
    var body = req.body;
    try {
        readFileName = body.readableName;
        writeFileName = body.writableName;

        res.status(200).send('FILE NAMES SET!');
    } catch (e) {
        res.status(500).send("ERROR ON FILE SAVE!");
    }
});

app.post('/start-operation', async (req, res) => {
    res.status(200).send("OPERATION STARTED!");
    worker1.postMessage({
        MESSAGE: "START_OPERATION",
        port: { portPath, portBaudRate },
        readFileName,
        writeFileName
    });
});

app.post('/close-port', async (req, res) => {
    try {
        console.log("closing port!");

        // port must be created before creating a mock one!
        var _port = new SerialPort({ path: portPath.toString(), baudRate: portBaudRate });
        _port.on("open", () => {
            MockBinding.createPort(portPath.toString());
            const port = new SerialPortStream({ binding: MockBinding, path: portPath.toString(), baudRate: portBaudRate });
            port.close();
        });
        res.status(200).send("PORT CLOSED!");
    } catch (e) {
        res.status(500).send("ERROR ON CLOSE!");
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
