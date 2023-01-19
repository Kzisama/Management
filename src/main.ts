import { createApp } from "vue";
import "reset.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";
import "@/assets/weathericon/iconfont.js";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).component("svg-icon", SvgIcon).mount("#app");
