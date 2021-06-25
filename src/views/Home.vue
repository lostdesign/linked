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
import { mapActions } from 'vuex'
import { Actions as CalendarActions } from '@/store/modules/calendar/types'

export default {
  components: {
    Layout,
    AppHeader,
    Editor
  },
  methods: {
    ...mapActions('calendar', [CalendarActions.SET_DATE]),
    setDay() {
      this.setDate(this.$route.params.date)
    }
  },
  created() {
    this.setDay()
  },
  beforeRouteUpdate(to, from, next) {
    next()
    /*const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    )
    if (answer) {
      next()
    } else {
      next(false)
    }*/
  },
  watch: {
    $route: 'setDay'
  }
}
</script>
