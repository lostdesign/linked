process.once('loaded', () => {
  const { contextBridge, ipcRenderer, shell } = require('electron')
  const fs = require('fs')
  const path = require('path')

  contextBridge.exposeInMainWorld('electron', {
    on (eventName, callback) {
      ipcRenderer.on(eventName, callback)
    },

    async invoke (eventName, ...params) {
      return await ipcRenderer.invoke(eventName, ...params)
    },
  })
})