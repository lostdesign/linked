<template>
  <router-view />
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  data() {
    return {
      get themeMode() {
        const mode = localStorage.theme
        ipcRenderer.invoke('dark-mode:toggle', mode)

        return mode
      },
      set themeMode(value) {// eslint-disable-line
        ipcRenderer.invoke('dark-mode:toggle', value)
        return localStorage.theme = value
      },
    }
  },
  created() {
    if (this.themeMode === 'dark' || (!('theme' in localStorage))) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>