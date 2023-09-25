import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "@/router/router";

const app = createApp(App)


//todo: do types
app.use(router)
    .use(createPinia())
    .mount('#app')
