import { createApp } from 'vue'
import './styles/style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.ts'

createApp(App).use(router).use(createPinia()).mount('#app');
