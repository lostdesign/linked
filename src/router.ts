import Home from "./pages/Home.vue";
import Settings from "./pages/Settings.vue";

import { createWebHistory, createRouter } from "vue-router";
import Day from "@/pages/Day.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
  { path: '/day/:day', component: Day, name: 'day' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes, 
})