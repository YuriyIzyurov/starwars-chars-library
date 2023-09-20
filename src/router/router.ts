import Home from "@/pages/Home.vue"
import News from "@/pages/News.vue"
import Gallery from "@/pages/Gallery.vue"
import Forum from "@/pages/Forum.vue"
import HomeCompositionAPI from "@/pages/HomeCompositionAPI.vue"
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        component: HomeCompositionAPI
    },
    {
        path: '/homeold',
        component: Home
    },
    {
        path: '/news',
        component: News
    },
    {
        path: '/gallery',
        component: Gallery
    },
    {
        path: '/forum',
        component: Forum
    },
]
//todo: proccess is not defined, watch .env conf
const router = createRouter({
    routes,
    history: createWebHistory()
})
export default router;
