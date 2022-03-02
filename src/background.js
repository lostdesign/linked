'use strict'

require('v8-compile-cache')

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
  Notification,
  dialog
} from 'electron'

const isDevelopment = process.env.NODE_ENV !== 'production'
const isWindows = process.platform === 'win32'
const isMacOS = process.platform === 'darwin'
const isLinux = process.platform === 'linux'

let win

// Turn off software rasterizer for less resource usage
app.commandLine.appendSwitch('disable-software-rasterizer', 'true')
app.setAppUserModelId(process.execPath)

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const path = require('path')
export const DAILY = 1000 * 60 * 60 * 24
export const WEEKLY = DAILY * 7
const basePath = path.join(app.getPath('documents'), 'linked')

const Store = require('electron-store')
global.storage = new Store({
  watch: true,
  defaults: {
    isSetupFinished: false,
    language: 'en-US',
    theme: 'dark',
    searchMode: 'forward',
    enableUpdates: true,
    updateInterval: DAILY,
    dataPath: basePath
  }
})

import updater from './updater'

const template = [
  {
    label: app.name,
    submenu: [
      { 
	role: 'about',
	async click() {
          if (isLinux) {
            const version = require("../package.json").version;
            dialog.showMessageBox({
              message: "linked",
              detail: "Version " + version + " (" + version + ")\nCopyright © 2022 André Weller",
              type: "info",
              title: "About",
              icon: "../appIcon/icon.png"
            });
          }
        }
      },
      {
        label: 'Settings',
        accelerator: 'CommandOrControl + ,',
        click() {
          reopenWindowAndSendWebContents('open-settings')
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
          reopenWindowAndSendWebContents('set-today')
        },
        accelerator: 'CommandOrControl + .'
      },
      {
        label: 'Search',
        click() {
          reopenWindowAndSendWebContents('set-search')
        },
        accelerator: 'CommandOrControl + K'
      },
      { type: 'separator' },
      {
        label: 'Previous Day',
        click() {
          reopenWindowAndSendWebContents('previous-day')
        },
        accelerator: 'CommandOrControl + P'
      },
      {
        label: 'Next Day',
        click() {
          reopenWindowAndSendWebContents('next-day')
        },
        accelerator: 'CommandOrControl + N'
      },
      { type: 'separator' },
      {
        label: 'Previous Week',
        click() {
          reopenWindowAndSendWebContents('previous-week')
        },
        accelerator: 'CommandOrControl + Shift + P'
      },
      {
        label: 'Next Week',
        click() {
          reopenWindowAndSendWebContents('next-week')
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
    win.loadURL('app://./index.html')
    nativeTheme.themeSource = global.storage.get('theme')
  }
  
  win.on('closed', () => { win = null })
}

app.on('window-all-closed', () => {
  if (!isMacOS) {
    app.quit()
  }
})

app.on('window-all-closed', () => { if (!isMacOS) app.quit() })
app.on('activate', () => { if (win === null) createWindow()} )

import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

app.whenReady().then(async () => {
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

const reopenWindowAndSendWebContents = (message) => {
  if (!win) {
    createWindow()
    app.whenReady().then(() => {
      setTimeout(() => {
        win.webContents.send(message)
      }, 300)
    })
  }
  win.webContents.send(message)
}

/* 
 * IPC MAIN COMMUNICATION
 */

ipcMain.handle('GET_STORAGE_VALUE', (event, key) => {
  return global.storage.get(key)
})

ipcMain.handle('SET_STORAGE_VALUE', (event, key, data) => {
  return global.storage.set(key, data)
})

ipcMain.handle('DELETE_STORAGE_VALUE', (event, key) => {
  return global.storage.delete(key)
})

ipcMain.handle('SET_DATA_PATH', async () => {
  const currentPath = global.storage.get('dataPath')
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory', 'createDirectory']
  })
  
  if (result.canceled === true) {
    new Notification({
      title: 'Action aborted',
      body: 'Your previous settings still apply.'
    }).show()
    
    return currentPath
  }

  const newPath = result.filePaths.length > 0
    ? result.filePaths[0]
    : basePath

  searchIndex = new Document({
    document: {
      id: 'date',
      index: ['content'],
      store: true
    },
    tokenize: global.storage.get('searchMode')
  })
  
  if ((await fs.promises.readdir(newPath)).length !== 0) {
    await dialog.showMessageBox(win, {
      message: 'Directory not empty!',
      detail: `${newPath} is not empty, please choose another directory or add an empty directory at the desired location first.`,
      type: 'error',
      buttons: ['Close'],
      defaultId: 1,
      noLink: true
    })

    return global.storage.get('dataPath')
  }

  const fsEx = require('fs-extra')
  try {
    await fsEx.move(currentPath, newPath, { overwrite: true })
  } catch (e) {
    await dialog.showMessageBox(win, {
      message: 'An error occured!',
      detail: e.toString(),
      type: 'error',
      buttons: ['Close'],
      defaultId: 1,
      noLink: true
    })
    return global.storage.get('dataPath')
  }
  
  global.storage.set('dataPath', newPath)
  await repairSearchDatabase()

  new Notification({
    title: 'Successfully set new path!',
    body: `Your data now is being read from ${newPath}.`
  }).show()

  return global.storage.get('dataPath')
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
  const dataPath = getFilePath(year)
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
    file = fs.promises.readFile(filePath, 'utf-8').then(data => JSON.parse(data))
  }

  // return the file
  return file
})

import { Document } from 'flexsearch'

let searchIndex = new Document({
  document: {
    id: 'date',
    index: ['content'],
    store: true
  },
  tokenize: global.storage.get('searchMode')
})

const searchIndexPath = `${app.getPath('userData')}/search-index/`

const createSearchIndexFolder = () => {
  !fs.existsSync(searchIndexPath) && fs.mkdirSync(searchIndexPath, { recursive: true })
}

const exportIndex = async () => {
  createSearchIndexFolder()
  searchIndex.export(
    (key, data) => fs.writeFileSync(`${searchIndexPath}${key}.json`, data !== undefined ? data : '')
  )
}

const retrieveIndex = async () => {
  createSearchIndexFolder()
  const keys = fs
    .readdirSync(searchIndexPath, { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  for (let i = 0, key; i < keys.length; i += 1) {
    key = keys[i]
    
    // TODO: mac sometimes creates this file in the search index folder, which causes the app to exit
    if (key === '.DS_Store') continue
    
    const data = fs.readFileSync(`${searchIndexPath}${key}`, 'utf8')
    searchIndex.import(key.slice(0, -5), data === undefined ? null : data)
  }
}


ipcMain.handle('SAVE_FILE', (event, args) => {
  const [year, fileName, content, rating] = args
  const dataPath = getFilePath(year, fileName)
  const filePath = `${dataPath}/${fileName}.json`
  
  searchIndex.update(fileName, {
    date: fileName, 
    content: tokenizer(content)
  })

  fs.promises.writeFile(
    filePath,
    JSON.stringify({
      content: content,
      rating: rating
    })
  )
  
  exportIndex()
})

ipcMain.handle('SEARCH', async (event, search) => {
  const results = searchIndex.search(search)

  if (results.length >= 1 ) {
    const dates = results[0].result
    let dataResult = []

    for (const date of dates) {
      await fs.promises.readFile(`${getFilePath(date.substring(0,4))}/${date}.json`, 'utf-8').then((data) => {
        dataResult.push({
          date: date,
          ...JSON.parse(data)
        })
      })
    }
    
    return dataResult.sort((a, b) => {
      let keyA = new Date(a.date), keyB = new Date(b.date)

      if (keyA < keyB) return 1
      if (keyA > keyB) return -1

      return 0
    })
  }
  return {}
})

ipcMain.handle('LOAD_SEARCH_INDEX', async () => {
  return retrieveIndex()
})

/**
 * Cleans the content from any html elements, as well as deleting any
 * base64 images and removing duplicates.
 * @param content
 * @returns { String }
 */
const tokenizer = (content) => {
  const cleanedHtml = content.replace(/(<([^>]+)>)/gi, ' ').split(' ')
  return cleanedHtml.filter((word, index, self) => self.indexOf(word) === index)
}

ipcMain.handle('REINDEX_ALL', async () => repairSearchDatabase())

const repairSearchDatabase = async () => {
  searchIndex = new Document({
    document: {
      id: 'date',
      index: ['content'],
      store: true
    },
    tokenize: global.storage.get('searchMode')
  })
  
  const isYearFolder = (folder) => /\b\d{4}\b/g.test(folder)
  const dataPath = global.storage.get('dataPath')

  const getYearFolderFiles = (year) =>
    fs.promises.readdir(getFilePath(year))
      .then((files) => files.map((file) => `${year}/${file}`))

  const years =
    await fs.promises.readdir(`${dataPath}`)
      .then((folders) => folders.filter(isYearFolder))


  await Promise.all(years.map(getYearFolderFiles))
    .then((yearFiles) => yearFiles.flat())
    .then((dirtyFiles) => dirtyFiles.filter(file => file.match(/^(.*\.json$).*$/)))
    .then((cleanFiles) =>
      cleanFiles.map((file) => {
        return {
          data: JSON.parse(fs.readFileSync(`${dataPath}/${file}`, "utf8")),
          date: file
        }
      })
    )
    .then((files) =>
      files.forEach((file) => {
        let fileName = file.date.substring(5)
        fileName = fileName.slice(0, fileName.length-5)

        try {
          searchIndex.update(fileName, {
            date: fileName,
            content: tokenizer(file.data.content)
          })
        } catch (e) {
          console.log('could not index day', fileName, file.data.content)
        }
      })
    )
    .then(() => exportIndex())
    .then(() => {
      new Notification({
        title: 'Search Index Updated!',
        body: 'Your database was successfully indexed! You may now search across all your data.'
      }).show()
    })

  return true
}

/**
 * Construct the base path where files are stored and loaded from
 */
const getFilePath = (year) => {
  return `${global.storage.get('dataPath')}/${year}`
}

const getDefaultData = () => {
  return JSON.stringify({
    content: '',
    rating: 0
  })
}
