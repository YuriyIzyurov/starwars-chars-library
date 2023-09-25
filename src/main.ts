import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";

const app = createApp(App)
components.forEach(c => app.component(c.name, c))

//todo: do types
app.use(router)
    .use(createPinia())
    .mount('#app')
