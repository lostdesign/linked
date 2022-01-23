'use strict'

require('v8-compile-cache')

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu
} from 'electron'

const isDevelopment = process.env.NODE_ENV !== 'production'
const isWindows = process.platform === 'win32'
const isMacOS = process.platform === 'darwin'

let win

//import * as Sentry from '@sentry/electron';
//Sentry.init({ dsn: 'https://f12af54d6a3b4f00a7ec80e69cba835e@o559982.ingest.sentry.io/5695233' });

// Turn off software rasterizer for less resource usage
app.commandLine.appendSwitch('disable-software-rasterizer', 'true')

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

export const DAILY = 1000 * 60 * 60 * 24
export const WEEKLY = DAILY * 7

const Store = require('electron-store')
global.storage = new Store({
  watch: true,
  defaults: {
    isSetupFinished: false,
    language: 'en-US',
    theme: 'dark',
    enableUpdates: true,
    updateInterval: DAILY
  }
})

import updater from './updater'

const template = [
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      {
        label: 'Settings',
        accelerator: 'CommandOrControl + ,',
        click() {
          win.webContents.send('open-settings')
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMacOS
        ? [
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
            }
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Today',
        click() {
          win.webContents.send('set-today')
        },
        accelerator: 'CommandOrControl + .'
      },
      { type: 'separator' },
      {
        label: 'Previous Day',
        click() {
          win.webContents.send('previous-day')
        },
        accelerator: 'CommandOrControl + P'
      },
      {
        label: 'Next Day',
        click() {
          win.webContents.send('next-day')
        },
        accelerator: 'CommandOrControl + N'
      },
      { type: 'separator' },
      {
        label: 'Previous Week',
        click() {
          win.webContents.send('previous-week')
        },
        accelerator: 'CommandOrControl + Shift + P'
      },
      {
        label: 'Next Week',
        click() {
          win.webContents.send('next-week')
        },
        accelerator: 'CommandOrControl + Shift + N'
      },
      { type: 'separator' },
      { role: 'reload' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Documentation',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://uselinked.com/')
        }
      },
      {
        label: 'Check for updates',
        click: async () => updater.askForUpdates()
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)




const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 470,
    minWidth: 450,
    height: 850,
    minHeight: 450,
    title: 'linked',
    backgroundColor: '#161616',
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    const { createProtocol } = require('vue-cli-plugin-electron-builder/lib')
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    nativeTheme.themeSource = global.storage.get('theme')
  }

  win.on('closed', () => { win = null })
}

app.on('window-all-closed', () => { if (!isMacOS) app.quit() })
app.on('activate', () => { if (win === null) createWindow()} )

import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  updater.setupUpdates()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (isWindows) {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle('GET_STORAGE_VALUE', (event, key) => {
  return global.storage.get(key)
})

ipcMain.handle('SET_STORAGE_VALUE', (event, key, data) => {
  return global.storage.set(key, data)
})

ipcMain.handle('DELETE_STORAGE_VALUE', (event, key) => {
  return global.storage.delete(key)
})

ipcMain.handle('TOGGLE_THEME', (event, mode) => {
  if (mode === 'light') {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

const fs = require('fs')

ipcMain.handle('FETCH_FILE', async (event, args) => {
  const [year, fileName] = args
  const dataPath = getFilePath(year, fileName)
  const filePath = `${dataPath}/${fileName}.json`
  let file

  // create the file if it does not exist yet
  if (!fs.existsSync(filePath)) {
    file = fs.promises.mkdir(dataPath, { recursive: true }).then(() => {
      return fs.promises.writeFile(filePath, getDefaultData()).then(() => {
        return fs.promises.readFile(filePath, 'utf-8').then((data) => {
          return JSON.parse(data)
        })
      })
    })
  } else {
    file = fs.promises.readFile(filePath, 'utf-8').then((data) => {
      return JSON.parse(data)
    })
  }

  // return the file
  return file
})

ipcMain.handle('SAVE_FILE', (event, args) => {
  const [year, fileName, content, rating] = args
  const dataPath = getFilePath(year, fileName)
  const filePath = `${dataPath}/${fileName}.json`

  fs.promises.writeFile(
    filePath,
    JSON.stringify({
      content: content,
      rating: rating
    })
  )
})

/**
 * Construct the base path where files are stored and loaded from
 */
const basePath = app.getPath('documents')
const getFilePath = (year) => {
  return `${basePath}/linked/${year}`
}

const getDefaultData = () => {
  return JSON.stringify({
    content: '',
    rating: 0
  })
}
