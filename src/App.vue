<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      get themeMode() {
        return localStorage.theme
      },
      set themeMode(value) {
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