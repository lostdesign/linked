import Vue from 'vue'
import Vuex from 'vuex'

import calendar from '@/store/modules/calendar'
import file from '@/store/modules/file'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calendar,
    file
  }
})
