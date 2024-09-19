const { SerialPort } = require('serialport');
const { Worker } = require('worker_threads');
const express = require('express');

const cors = require('cors');
const { getPort } = require('./constants');
const { argv, argv0 } = require('process');
const { parseArgs } = require('update/lib/utils');
const app = express();

const worker1 = new Worker("./workers/worker1.js");

app.use(cors());
app.use(express.json());

var path, _baudRate, readFileName, writeFileName;

// recieves the set port data request from the port
app.post('/set-port', async (req, res) => {
    const { productId, vendorId, baudRate } = req.body;

    SerialPort.list().then(async ports => {
        const portInfo = ports.find(port =>
            port.productId === productId.toString(16) &&
            port.vendorId === vendorId.toString(16)
        );

        if (portInfo) {
            path = portInfo.path.toString();

            console.log({ path })
            _baudRate = baudRate;

            await getPort(path, _baudRate);

            res.status(200).send("PORT DATA SET!");
        } else {
            res.status(404).send('PORT NOT FOUND!');
        }
    }).catch(err => {
        console.error('Error listing ports:', err);
        res.status(500).send('NO PORTS FOUND!');
    });
});

// recieves the set files request from the port
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

// recieves start operation req from the client
app.post('/start-operation', async (req, res) => {
    res.status(200).send("OPERATION STARTED!");
    worker1.postMessage({
        MESSAGE: "START_OPERATION",
        port: { path, baudRate: _baudRate },
        readFileName,
        writeFileName
    });
});

// starts the server on given port, refer server/package.json
app.listen(argv[2], () => {
    console.log('Server is running on http://localhost:' + argv[2]);
});