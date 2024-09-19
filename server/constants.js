const { SerialPort } = require("serialport");

const READ_SIZE = 8;

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

// used to set the baudRate of the port
async function getPort(path, baudRate) {
    const port = new SerialPort({
        path,
        baudRate,
        flowControl: false
    });
    port.on('open', () => {
        port.close();
    })  
}

module.exports = {
    READ_SIZE,
    ERRORS,
    OPERATIONS,
    getPort
}