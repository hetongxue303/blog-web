import { createApp } from 'vue'
import App from './App.vue'
import { directives } from './utils/directives'
import * as Icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from './store'
import i18n from './locales'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import '@assets/styles/index.scss'
import 'virtual:windi.css'
import 'animate.css'
import '@/router/permission'
import { install } from '@icon-park/vue-next/es/all'

import 'virtual:svg-icons-register'
import SvgIcon from '@components/svg-icon/index.vue'

const app = createApp(App)

const initiate = async () => {
    // element-plus图标注册
    Object.keys(Icons).forEach((key: string) => app.component(key, Icons[key as keyof typeof Icons]))

    app.use(ElementPlus)

    app.use(router)

    app.use(pinia)

    app.use(i18n)

    VXETable.setup({
        i18n: (key, args) => i18n.global.t(key, args)
    })
    app.use(VXETable)

    directives(app)

    // 注册iconPark图标
    install(app, 'icon-park')

    app.component('SvgIcon', SvgIcon)

    app.mount('#app')
}

await initiate()
