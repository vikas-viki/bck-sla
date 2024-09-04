const { SerialPort } = require("serialport");

const READ_SIZE = 15;

const OPERATIONS = {
    INIT: 1,
    PORT_WRITE: 2,
    PORT_READ: 3,
    FILE_WRITE: 4
}

const ERRORS = {
    ERROR_OPENING_FILE: 1,
    ERROR_GETTING_FILE_STATS: 2,
    ERROR_READING_FILE: 3,
    ERROR_CLOSING_FILE: 4,
    ERROR_WRITING_FILE: 5,
    ERROR_WRITING_PORT: 6,
    ERROR_OPENING_PORT: 7,
};

async function getPort() {
    const port = new SerialPort({
        path: '/dev/ttyUSB0',
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        flowControl: false
    });
    return port;
}

module.exports = {
    READ_SIZE,
    ERRORS,
    OPERATIONS,
    getPort
}