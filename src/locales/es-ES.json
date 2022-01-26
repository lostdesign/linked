<template>
  <Layout>
    <main class="flex flex-col items-stretch min-h-screen">
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
  methods: {
    ...mapActions('calendar', [
      CalendarActions.SET_DATE,
      CalendarActions.SET_DAY_TO
    ])
  },
  computed: {
    ...mapGetters('calendar', [CalendarGetters.GET_CURRENT_DATE])
  }
}
</script>
