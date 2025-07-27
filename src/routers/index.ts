import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Error from '@/views/404/index.vue'
import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/404',
        name: '404',
        component: Error
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any'
    }
]

const router = createRouter({ history: createWebHistory(), routes });

export default router;