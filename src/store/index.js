import Vue from 'vue'
import Vuex from 'vuex'

import calendar from '@/store/modules/calendar'
import storage from '@/store/modules/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calendar,
    storage
  }
})
