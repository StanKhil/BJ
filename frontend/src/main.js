import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/styles.css'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const pinia = createPinia()
const app = createApp(App);

pinia.use( ({store}) => { store.router = router })

app
.use(router)
.use(pinia)
.mount('#app');