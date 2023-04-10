import { RouteRecordRaw } from 'vue-router'
import Layout from '../../layout/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        name: 'login',
        path: '/login',
        meta: { title: '登录' },
        component: () => import('@views/login/index.vue')
    },
    {
        name: '401',
        path: '/401',
        meta: { title: '请先登录' },
        component: () => import('@views/error/401.vue')
    },
    {
        name: '403',
        path: '/403',
        meta: { title: '权限不足' },
        component: () => import('@views/error/403.vue')
    },
    {
        name: '404',
        path: '/:pathMatch(.*)*',
        meta: { title: '页面不存在' },
        component: () => import('@views/error/404.vue')
    },
    {
        name: '500',
        path: '/500',
        meta: { title: '出错啦' },
        component: () => import('@views/error/500.vue')
    },
    {
        path: '/',
        name: 'main',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                meta: { title: '首页' },
                component: () => import('@views/dashboard/index.vue')
            }
        ]
    }
]
