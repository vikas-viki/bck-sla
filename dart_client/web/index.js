var portId = 3000;

/**
 * Requests a port from the user and sends port information to a server.
 */
async function selectPort() {
    try {
        // Request the user to select a serial port.
        const port = await navigator.serial.requestPort();
        console.log("Port has been selected!");

        // Retrieve port information needed for the server.
        const portInfo = {
            productId: port.getInfo().usbProductId,
            vendorId: port.getInfo().usbVendorId,
            baudRate: 9600 // Set baud rate for the port.
        };

        // Send the port information to the server using a POST request.
        var response = await fetch(`http://localhost:${portId}/set-port`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(portInfo)
        });

        console.log(await response.text());
    } catch (e) {
        console.log(`Error selecting the port: ${e.message}`);
    }
}

/**
 * Opens a file picker to select a file and save it with a new name.
 */
async function selectFiles() {
    var options = {
        // excludeAcceptAllOption: true,
        // multiple: false,
        // startIn: "desktop",
        // types: [
        //     {
        //         description: "Text files",
        //         accept: {
        //             'text/plain': ['.txt']
        //         }
        //     }
        // ]
    };

    // Show the file picker to select a file for reading.
    let [fileHandle1] = await window.showOpenFilePicker(options);
    let readFile = await fileHandle1.getFile();

    // Generate a new filename for saving the file.
    var writableName = `write.${readFile.name.split(".").pop()}`;

    // Show the file save picker to select the location for saving the file.
    await window.showSaveFilePicker({
        suggestedName: writableName,
        types: [],
    });

    var readableName = readFile.name;

    // Send the file names to the server using a POST request.
    var response = await fetch(`http://localhost:${portId}/set-files`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ writableName, readableName })
    });

    console.log(await response.text());
}

/**
 * Starts an operation on the server.
 */
async function runScript() {
    // Send a POST request to the server to start an operation.
    var response = await fetch(`http://localhost:${portId}/start-operation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ""
    });

    console.log(await response.text());
}

// used to get the status of the operation
async function getStatus() {
    var response = await fetch(`http://localhost:${portId}/get-status`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var result = JSON.parse(await response.text());
    console.log("percent: ", result["percent"]);
    var percent = Number(result.percent);
    return percent;
}

function log(param) {
    console.log(param);
}