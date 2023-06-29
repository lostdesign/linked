import {createApp} from "vue";
import devtools from '@vue/devtools'
import "./styles.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");


devtools.connect("http://localhost:1420")