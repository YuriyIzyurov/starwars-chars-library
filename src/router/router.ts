import Home from "@/pages/Home.vue"
import News from "@/pages/News.vue"
import Gallery from "@/pages/Gallery.vue"
import Forum from "@/pages/Forum.vue"
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/news',
        name: 'News',
        component: News
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})
export default router;
