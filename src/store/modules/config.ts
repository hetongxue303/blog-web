import { defineStore } from 'pinia'
import { Config } from '../interface'

export const useConfig = defineStore('config', {
    state: (): Config => {
        return {}
    },
    getters: {},
    actions: {},
    persist: { key: 'config' }
})
