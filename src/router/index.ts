import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './static/routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
