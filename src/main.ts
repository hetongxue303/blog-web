import { createApp } from 'vue'
import App from './App.vue'
import { directives } from './utils/directives'
import * as Icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import pinia from './store'

import '@assets/styles/index.scss'
import 'virtual:windi.css'
import 'animate.css'
import '@/router/permission'

import 'virtual:svg-icons-register'
import SvgIcon from '@components/svg-icon/index.vue'

const app = createApp(App)

const initiate = async () => {
    // element-plus图标注册
    Object.keys(Icons).forEach((key: string) => {
        app.component(key, Icons[key as keyof typeof Icons])
    })
    app.use(ElementPlus, { locale, size: 'default' })

    app.use(router)

    app.use(pinia)

    directives(app)

    app.component('SvgIcon', SvgIcon)

    app.mount('#app')
}

await initiate()
