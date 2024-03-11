import {createApp} from "vue";
import "./styles.css";
import App from "./App.vue";
import {router} from "./router.ts";
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .mount("#app");
