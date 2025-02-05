const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { registerCommandHandler } = require('./handlers/commandHandler');
const { registerDirectoryHandler } = require('./handlers/directoryHandler');
const { registerHardwareHandler } = require('./handlers/hardwareHandler');
const { registerNodeHandler } = require('./handlers/nodeHandler');

let mainWindow;

const isDev = process.env.NODE_ENV === 'development';

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4200');
  } else {
    const appPath = path.join(__dirname, 'dist/browser/index.html');
    mainWindow.loadURL(`file://${appPath}`);
  }
});

registerCommandHandler(ipcMain);
registerDirectoryHandler(ipcMain);
registerHardwareHandler(ipcMain);
registerNodeHandler(ipcMain); 