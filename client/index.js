async function selectPort() {
    try {
        const port = await navigator.serial.requestPort();
        console.log("Port has been selected by the user");
        
        const portInfo = {
            productId: port.getInfo().usbProductId,
            vendorId: port.getInfo().usbVendorId,
            baudRate: 9600
        };

        var response = await fetch('http://localhost:3000/set-port', {
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

    let [fileHandle1] = await window.showOpenFilePicker(options);
    let readFile = await fileHandle1.getFile();
    var writableName = `write.${readFile.name.split(".").pop()}`;
    await window.showSaveFilePicker({
        suggestedName: writableName,
        types: [],
    });
    var readableName = readFile.name;

    var response = await fetch('http://localhost:3000/set-files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ writableName, readableName })
    });

    console.log(await response.text());
}

async function runScript() {
    var response = await fetch('http://localhost:3000/start-operation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ""
    });
    console.log(await response.text());
}