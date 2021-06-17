<template>
  <Layout>
    <main class="flex-col items-stretch h-full min-h-screen">
      <app-header />
      <editor />
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout'
import AppHeader from '@/components/app-header'
import Editor from '@/components/editor'

import { mapGetters, mapActions } from 'vuex'
import {
  Getters as CalendarGetters,
  Actions as CalendarActions
} from '@/store/modules/calendar/types'

export default {
  components: {
    Layout,
    AppHeader,
    Editor
  },
  data() {
    return {
      keysPressed: {}
    }
  },
  methods: {
    ...mapActions('calendar', [
      CalendarActions.SET_DATE,
      CalendarActions.SET_DAY_TO
    ])
  },
  computed: {
    ...mapGetters('calendar', [CalendarGetters.GET_CURRENT_DATE])
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true
      const modifier = this.keysPressed['Shift'] && this.keysPressed['Control']

      if (modifier && event.code === 'Enter') {
        this.setDate()
      }

      if (modifier && event.code === 'ArrowLeft') {
        this.setDayTo(-1)
      }

      if (modifier && event.code === 'ArrowRight') {
        this.setDayTo(1)
      }
    })

    document.addEventListener('keyup', (event) => {
      delete this.keysPressed[event.key]
    })
  }
}
</script>
