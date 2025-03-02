const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

if (process.env.NODE_ENV === 'development') {
  iconPath = path.join(__dirname, 'images/icon.png');
} else {
  iconPath = path.join(__dirname, '../../src/images', 'icon.png');
}


console.log(iconPath);
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: iconPath, // Set the icon dynamically based on the environment
  });
  

  mainWindow.setAspectRatio(1); // Lock aspect ratio to 1:1
  
  // Join the directory path and the file name (index.html)
  const indexPath = path.join(__dirname, 'index.html');
  
  // Load the file into the window
  mainWindow.loadFile(indexPath);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
