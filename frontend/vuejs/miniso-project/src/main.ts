import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import router from './router'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(ToastPlugin)
    .use(router)
    .use(pinia)
    .mount('#app')
