const { app, BrowserWindow } = require('electron')
const port = 9000

function createWindow() {
    // Start server
    // Create the browser window.
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    // and load the index.html of the app.
    const url = `http://localhost:${port}/`
    win.loadURL(url)
  }
  
  app.on('ready', createWindow)