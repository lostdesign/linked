import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Settings from '@/views/Settings'
import Overview from '@/views/Overview'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '/day/:date',
    name: 'Day',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
