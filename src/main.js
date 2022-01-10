import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./plugins/validation";
import "./assets/tailwind.css";
import "./assets/main.css";

let app = createApp(App);
// createApp(App).use(store).use(router).mount("#app");

app.use(store);
app.use(router);
app.use(VeeValidatePlugin);

app.mount("#app");
