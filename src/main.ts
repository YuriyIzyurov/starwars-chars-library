import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";
import store from "@/store";


const app = createApp(App)
components.forEach(c => app.component(c.name, c))

//todo: do types
app.use(router)
    .use(store)
    .mount('#app')
