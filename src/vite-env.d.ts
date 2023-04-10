declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMeta {
    readonly env: {
        readonly ENV: string
        readonly VITE_PORT: number
        readonly VITE_OPEN: boolean
        readonly VITE_BASIC_URL: string
        readonly VITE_AXIOS_URL: string
        readonly VITE_PROXY_URL: string
        readonly VITE_OUT_DIR: string
    }
}
