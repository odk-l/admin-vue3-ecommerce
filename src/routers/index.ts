import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Error from '@/views/404/index.vue'
import Layout from '@/layout/index.vue'
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";


export const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        meta: { title: 'layout', hidden: false },
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: { title: '首页', hidden: false }
            },
            {
                path: '/test',
                name: 'test',
                component: Home,
                meta: { title: '测试', hidden: false }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: '登录', hidden: true }
    },
    {
        path: '/404',
        name: '404',
        component: Error,
        meta: { title: '未找到页面', hidden: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: { title: '任意路由', hidden: true }
    }
]

const router = createRouter({ history: createWebHistory(), routes });

export default router;