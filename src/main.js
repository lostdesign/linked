import Vue from 'vue'
import store from '@/store'

import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'
import i18n from './i18n'

const Storage = require('electron-store')
window.mainStorage = new Storage({
  watch: true,
  defaults: {}
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
