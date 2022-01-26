<template>
  <router-view />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  Getters as CalendarGetters,
  Actions as CalendarActions
} from '@/store/modules/calendar/types'

import { Actions as FileActions } from '@/store/modules/file/types'
import {
  Getters as AppGetters,
  Actions as AppActions
} from '@/store/modules/app/types'

const { ipcRenderer } = require('electron')

export default {
  methods: {
    ...mapActions('calendar', [
      CalendarActions.SET_DATE,
      CalendarActions.SET_DAY_TO,
      CalendarActions.SET_CURRENT_WEEK
    ]),
    ...mapActions('file', [FileActions.FETCH_FILE]),
    ...mapActions('app', [AppActions.INIT_APP])
  },
  computed: {
    ...mapGetters('calendar', [CalendarGetters.GET_CURRENT_DATE]),
    ...mapGetters('app', [AppGetters.GET_LANGUAGE, AppGetters.GET_THEME])
  },
  mounted() {
    ipcRenderer.on('open-settings', () => {
      this.$router.push('settings', () => {})
    })

    ipcRenderer.on('set-today', () => {
      this.setDate()
    })

    ipcRenderer.on('set-search', () => {
      this.$router.push('search', () => {})
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
    this.initApp()
    this.fetchFile(this.getCurrentDate)

    this.$store.subscribe((mutation) => {
      if (mutation.type === `calendar/${CalendarActions.SET_DATE}`) {
        this.fetchFile(this.getCurrentDate)
        this.setCurrentWeek()
      }

      if (mutation.type === `app/${AppActions.SET_THEME}`) {
        if (this.getTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    })

    if (this.getTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>
