process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

const { app, BrowserWindow, ipcMain, dialog, shell, protocol, nativeTheme } = require('electron')
const fs = require('fs')
const path = require('path');
const { formatWithOptions } = require('util');
const basePath = app.getPath('documents')

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
      //nodeIntegration: true,
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

  if (!app.isPackaged) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

    process.installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  }

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

ipcMain.handle('load-file', async (event, args) => {
  return await fs.promises.readFile(`${basePath}/linked/${args[0]}/${args[1]}.json`, 'utf8').catch(async (e) => {
    await saveFile(args)
  })
})

ipcMain.handle('save-file', async (event, args) => {
  return await saveFile(args)
})

const saveFile = async (args) => {
  const filePath = `${basePath}/linked/${args[0]}/${args[1]}.json`
  const content = {"content": args[2]} ?? {"content":""}

  return await fs.promises
    .mkdir(path.dirname(filePath), {recursive: true})
    .then(x => fs.promises.writeFile(filePath, JSON.stringify(content)))
}