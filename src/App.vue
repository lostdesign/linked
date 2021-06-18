<template>
  <router-view />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  Getters as CalendarGetters,
  Actions as CalendarActions
} from '@/store/modules/calendar/types'

import { Actions as FileActions } from '@/store/modules/storage/types'

const { ipcRenderer } = require('electron')

export default {
  data() {
    return {
      get themeMode() {
        const mode = localStorage.theme
        ipcRenderer.invoke('dark-mode:toggle', mode)

        return mode
      },
      // eslint-disable-next-line
      set themeMode(value) {
        ipcRenderer.invoke('dark-mode:toggle', value)
        return (localStorage.theme = value)
      }
    }
  },
  methods: {
    ...mapActions('calendar', [
      CalendarActions.SET_DATE,
      CalendarActions.SET_DAY_TO,
      CalendarActions.SET_CURRENT_WEEK
    ]),
    ...mapActions('storage', [FileActions.FETCH_FILE])
  },
  computed: {
    ...mapGetters('calendar', [CalendarGetters.GET_CURRENT_DATE])
  },
  mounted() {
    ipcRenderer.on('open-settings', () => {
      this.$router.push('settings', () => {})
    })

    ipcRenderer.on('set-today', () => {
      this.setDate()
    })

    ipcRenderer.on('previous-day', () => {
      this.setDayTo(-1)
    })

    ipcRenderer.on('next-day', () => {
      this.setDayTo(1)
    })

    ipcRenderer.on('previous-week', () => {
      this.setDayTo(-7)
    })

    ipcRenderer.on('next-week', () => {
      this.setDayTo(7)
    })
  },
  created() {
    this.fetchFile(this.getCurrentDate)

    this.$store.subscribe((mutation) => {
      if (mutation.type === `calendar/${CalendarActions.SET_DATE}`) {
        this.fetchFile(this.getCurrentDate)
        this.setCurrentWeek()
      }
    })

    if (this.themeMode === 'dark' || !('theme' in localStorage)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>