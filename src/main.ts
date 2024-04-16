import {createApp} from "vue";
import App from "./App.vue";
import "./styles.css";
import {router} from "./router.ts";
import {createPinia} from 'pinia'
import {setupI18n} from "@/i18n.ts";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";

const pinia = createPinia()

setupI18n().then((i18n) =>
  createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount("#app")
)

router.beforeEach((to, _, next) => {
  const store = useCalendarStore()

  if (to.name === 'day') {
    store.setDate(to.params.day as string)
  }

  next()
})

