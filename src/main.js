import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.scss'
import App from './App.vue'
import MitIdFlow from './components/MitIdFlow.vue'
import SimpleFlow from './components/SimpleFlow.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: MitIdFlow },
    { path: '/simple', component: SimpleFlow }
  ]
})

app.use(router)
app.mount('#app')
