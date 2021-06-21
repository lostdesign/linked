import { app, BrowserWindow, shell } from 'electron'
import { isMacOS } from '@/services/helper'

export const template = [
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      {
        label: 'Settings',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('open-settings')
            browserWindow.show()
          })
        },
        accelerator: 'CMD + ,'
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
        label: 'Home',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('open-home')
            browserWindow.show()
          })
        }
      },
      {
        label: 'Overview',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('open-overview')
            browserWindow.show()
          })
        },
        accelerator: 'CMD + K'
      }
    ]
  },
  {
    label: 'Calendar',
    submenu: [
      {
        label: 'Today',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('set-today')
            browserWindow.show()
          })
        },
        accelerator: 'CTRL + SHIFT + ENTER'
      },
      { type: 'separator' },
      {
        label: 'Previous Day',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('previous-day')
            browserWindow.show()
          })
        },
        accelerator: 'CTRL + SHIFT + LEFT'
      },
      {
        label: 'Next Day',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('next-day')
            browserWindow.show()
          })
        },
        accelerator: 'CTRL + SHIFT + RIGHT'
      },
      { type: 'separator' },
      {
        label: 'Previous Week',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('previous-week')
            browserWindow.show()
          })
        }
      },
      {
        label: 'Next Week',
        click() {
          BrowserWindow.getAllWindows().forEach(browserWindow => {
            browserWindow.webContents.send('next-week')
            browserWindow.show()
          })
        }
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
        click: () => {
          shell.openExternal('https://uselinked.com/docs')
        }
      }
    ]
  }
]
