process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

const { app, BrowserWindow, ipcMain, dialog, shell, protocol, nativeTheme } = require('electron')
const path = require('path')

let mainWindow

const createWindow  = () => {
  app.commandLine.appendSwitch('disable-software-rasterizer', 'true')
  mainWindow = new BrowserWindow({
    width: 450,
    minWidth: 450,
    maxWidth: 450,
    height: 1000,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      devTools: process.env.NODE_ENV === 'development',
      webSecurity: false,
      allowRunningInsecureContent: true,
      enableRemoteModule: true
    },
  })

  mainWindow.setMenuBarVisibility(false)

  if (process.env.NODE_ENV !== 'development') mainWindow.loadFile('index.html')

  else {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(decodeURIComponent(url)) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  nativeTheme.themeSource = 'dark';

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// EVENTS
ipcMain.on('select-dir', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  event.reply('select-dir-reply', result.filePaths)
})

ipcMain.on('open-url', async (event, url) => {
  shell.openExternal(url)
})
