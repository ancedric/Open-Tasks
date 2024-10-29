import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { routes } from './Routes.js'
import { createPinia } from 'pinia'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app =createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
