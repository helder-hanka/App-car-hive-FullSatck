import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import { setupInterceptors } from './interceptor/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const authStore = useAuthStore()
setupInterceptors(authStore)
