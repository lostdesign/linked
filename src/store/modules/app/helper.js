const { ipcRenderer } = require('electron')

export const getLanguage = async () => {
  return ipcRenderer.invoke('GET_STORAGE_VALUE', 'language')
}

export const getTheme = async () => {
  return ipcRenderer.invoke('GET_STORAGE_VALUE', 'theme')
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
