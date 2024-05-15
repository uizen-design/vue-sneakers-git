import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createWebHashHistory, createRouter } from 'vue-router'

import App from './App.vue'
import home from './pages/home.vue'
import favorites from './pages/favorites.vue'

const app = createApp(App)

const routes = [
    { path: '/', component: home },
    { path: '/favorites', component: favorites },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
