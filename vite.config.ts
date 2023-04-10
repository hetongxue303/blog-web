import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { fileURLToPath } from 'url'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        eslintPlugin({
            include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
            cache: false
        }),
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: `@import '@/assets/styles/variables.scss';`
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@layout': fileURLToPath(new URL('./src/layout', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url))
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
        open: false,
        hmr: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        assetsInlineLimit: 4096,
        cssCodeSplit: true,
        reportCompressedSize: false,
        rollupOptions: {}
    }
})
