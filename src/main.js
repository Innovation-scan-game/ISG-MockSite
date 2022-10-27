import { createApp } from "vue";
import { createPinia } from "pinia";

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { useStore } from "./stores/new";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

import App from "./App.vue";
import router from "./router";
import { Icon } from '@iconify/vue';
import "./assets/main.css";


const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
const store = useStore();

app.use(autoAnimatePlugin);
app.use(router);
app.config.globalProperties.axios = axios

app.component("Icon", Icon);

app.mount("#app");
