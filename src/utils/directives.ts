import { App, DirectiveBinding } from 'vue'

export const directives = (app: App) => {
    authDirective(app)
    deleteElementDirective(app)
}

/**
 * 权限指令
 * @param app
 */
const authDirective = (app: App) => {
    app.directive('auth', {
        mounted(el: HTMLElement, binding: DirectiveBinding) {}
    })
}

/**
 * 删除元素指令
 */
const deleteElementDirective = (app: App) => {
    app.directive('delEl', {
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            const { value } = binding
            if (value) el.parentNode?.removeChild(el)
        }
    })
}
