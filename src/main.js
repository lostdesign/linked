import Vue from 'vue'
import store from '@/store'

import App from './App.vue'
import router from './router'
import i18n from '@/locales'
import '@/assets/css/tailwind.css'

// If you want to use Sentry for your error reporting, add your Sentry DSN configuration here.
// import * as Sentry from '@sentry/electron';
// Sentry.init({ dsn: 'your-dsn-url' });

const Storage = require('electron-store')

// We keep our main storage as a global variable
// so that it's automatically available in all
// our components
window.mainStorage = new Storage({
  watch: true,
  defaults: {}
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
