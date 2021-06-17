const { ipcRenderer } = require('electron')
import { formatDate } from '@/store/modules/calendar/helper'

const fetchFile = date => {
  return ipcRenderer.invoke('FETCH_FILE', [formatDate(date, 'y'), date])
}
const saveFile = (date, file) => {
  return ipcRenderer.invoke('SAVE_FILE', [
    formatDate(date, 'y'),
    date,
    file.content,
    file.rating
  ])
}

const debounce = (func, wait) => {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export { debounce, fetchFile, saveFile }
