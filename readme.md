# Introduction

This project consists of two components: a frontend written in HTML and a server written in Node.js. Here's an overview of the project's operations:

![Project Overview](./data/workflow.png)

## Setup

Follow these steps to run the project:

1. **Install Node.js** by following the instructions in the "Node.js Installation and Setup" section below.

2. **Clone the repository:**
   ```bash
   git clone https://github.com/vikas-viki/bck-sla.git
   ```

3. Install dependencies:

- Navigate to the `sla/server` directory.
Install the project dependencies by running:
```bash
npm install
```

4. Start the local server:

- Inside the `sla/server` directory, run:
```bash
node index.js
```

5. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in Visual Studio Code.

6. Launch the frontend:

- Right-click the `client/index.html` file.
- Select `Open with Live Server`. This will open the file in your browser.

7. Use the application in the browser:

- Select a port by clicking `Select port`.
- Select files by clicking `Select files`. Note: You must select and save the files inside the `sla/data` folder.
- Click on `Run script`. This will run the script, allowing you to compare the selected read and write files. You can also view the transmission speed in the integrated terminal where you started the server.

## Node.js Installation and Setup

This guide will help you install and set up Node.js on your system.

### Windows

1. **Download Node.js Installer:**
   - Visit the [Node.js official website](https://nodejs.org/).
   - Download the latest LTS (Long Term Support) version.

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file to run the installer.
   - Follow the setup prompts, leaving all default options selected.
   - Ensure the **Add to PATH** option is checked.

3. **Verify Installation:**
   - Open Command Prompt (cmd) and run the following commands:
     ```sh
     node -v
     npm -v
     ```
   - You should see the versions of Node.js and npm printed on the screen.

### macOS

1. **Using Homebrew:**
   - If you don't have Homebrew, install it by running the following command in Terminal:
     ```sh
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Node.js using Homebrew:
     ```sh
     brew install node
     ```

2. **Using the Installer:**
   - Download the macOS installer from the [Node.js official website](https://nodejs.org/).
   - Run the installer and follow the setup instructions.

3. **Verify Installation:**
   - Open Terminal and run:
     ```sh
     node -v
     npm -v
     ```
   - Ensure that the Node.js and npm versions are displayed.

### Linux

1. **Using Package Manager:**

   **Debian/Ubuntu:**
   ```sh
   sudo apt update
   sudo apt install -y nodejs npm
