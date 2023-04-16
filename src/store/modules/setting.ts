import { defineStore } from 'pinia'
import { Setting } from '../interface'

export const useSetting = defineStore('setting', {
    state: (): Setting => {
        return {
            collapse: false
        }
    },
    getters: {
        getCollapse: (state) => state.collapse
    },
    actions: {
        changeCollapse() {
            this.collapse = !this.collapse
        }
    },
    persist: { key: 'setting' }
})
