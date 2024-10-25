import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/styles.css'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const app = createApp(App);

app
.use(router)
.mount('#app');