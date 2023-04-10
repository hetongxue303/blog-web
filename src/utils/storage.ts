/**
 * localStorage存储
 * @method get 获取
 * @method set 设置
 * @method remove 移除
 * @method clear 移除全部
 */
export const local = {
    get(key: string) {
        const val: any = window.localStorage.getItem(key)
        return JSON.parse(val)
    },
    set(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}

/**
 * sessionStorage存储
 * @method get 获取
 * @method set 设置
 * @method remove 移除
 * @method clear 移除全部
 */
export const session = {
    get(key: string) {
        const val: any = window.sessionStorage.getItem(key)
        return JSON.parse(val)
    },
    set(key: string, value: any) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string) {
        window.sessionStorage.removeItem(key)
    },
    clear() {
        window.sessionStorage.clear()
    }
}
