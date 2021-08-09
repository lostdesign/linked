import Vue from 'vue'
import Vuex from 'vuex'

import calendar from '@/store/modules/calendar'
import file from '@/store/modules/file'
import app from '@/store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calendar,
    file,
    app
  }
})
