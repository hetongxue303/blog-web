import { App, DirectiveBinding } from 'vue'

export const directives = (app: App) => {
    authDirective(app)
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
