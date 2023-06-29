import Home from "@/views/Home.vue";

import {createWebHistory, createRouter} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ],
})

export default router