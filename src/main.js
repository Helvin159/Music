import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./plugins/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import "./assets/tailwind.css";
import "./assets/main.css";
import i18n from './i18n'

let app;

auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App).use(i18n);
		// createApp(App).use(store).use(router).mount("#app");

		app.use(store);
		app.use(router);
		app.use(VeeValidatePlugin);
		app.directive("icon", Icon);

		app.mount("#app");
	}
});
