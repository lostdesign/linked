const { ipcRenderer } = require('electron')
const DAILY = 1000 * 60 * 60 * 24
const WEEKLY = DAILY * 7

export const getLanguage = async () => {
  return ipcRenderer.invoke('GET_STORAGE_VALUE', 'language')
}

export const getTheme = async () => {
  return ipcRenderer.invoke('GET_STORAGE_VALUE', 'theme')
}

export const getUpdateInterval = async () => {
  const updateInterval = await ipcRenderer.invoke('GET_STORAGE_VALUE', 'updateInterval')
  return updateInterval === DAILY ? 0 : 1
}

export const setTheme = async (theme) => {
  return ipcRenderer.invoke('SET_STORAGE_VALUE', 'theme', theme).then(() => {
    ipcRenderer.invoke('TOGGLE_THEME', theme)
  })
}

export const setLanguage = async (language) => {
  localStorage.lang = language
  return ipcRenderer.invoke('SET_STORAGE_VALUE', 'language', language)
}

export const loadSearchIndex = async () => {
  await ipcRenderer.invoke('LOAD_SEARCH_INDEX')
}

export const reIndexAll = async () => {
  await ipcRenderer.invoke('REINDEX_ALL')
}

export const setUpdateInterval = async (updateInterval) => {
  return ipcRenderer.invoke('SET_STORAGE_VALUE', 'updateInterval', updateInterval === 0 ? DAILY : WEEKLY)
}