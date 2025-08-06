import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Error from '@/views/404/index.vue'
import Layout from '@/layout/index.vue'

// import Screen from '@/views/screen/index.vue'


export const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        meta: { hidden: false, title: '' },
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: { title: '首页', hidden: false, icon: 'House' }
            },
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
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                },
                component: () => import('@/views/acl/user/index.vue')
            }, {
                path: '/acl/role',
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                },
                component: () => import('@/views/acl/role/index.vue')
            }, {
                path: '/acl/permission',
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Monitor'
                },
                component: () => import('@/views/acl/permission/index.vue')
            }
        ]

    },
    {
        path: '/screen',
        component: Screen,
        name: 'Screen',
        meta: {
            hidden: false,
            title: '数据大屏',
            icon: 'Platform'
        }
    },
    {
        path: '/product',
        component: Layout,
        name: 'Product',
        meta: {
            hidden: false,
            title: '商品管理',
            icon: 'Goods'
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    hidden: false,
                    title: '品牌管理',
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    hidden: false,
                    title: '属性管理',
                    icon: 'ChromeFilled',
                },
            },

            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    hidden: false,
                    title: 'SPU管理',
                    icon: 'Calendar'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange',
                },
            },
        ]
    }
]



const router = createRouter({ history: createWebHistory(), routes });

export default router;