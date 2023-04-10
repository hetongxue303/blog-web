/**
 * 手机号码验证
 */
export const validatorMobile = (rule: any, mobile: string | number, callback: Function) => {
    if (!mobile) {
        return callback(new Error('手机号不能为空'))
    }
    if (!/^(1[3-9])\d{9}$/.test(mobile.toString())) {
        return callback(new Error('请输入正确的手机号'))
    }
    return callback()
}

/**
 * 账户验证
 */
export const validatorAccount = (rule: any, val: string, callback: Function) => {
    if (!val) {
        return callback(new Error('账号不能为空'))
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(val)) {
        return callback(new Error('请输入正确的帐户'))
    }
    return callback()
}

/**
 * 密码验证
 */
export const regularPassword = (val: string) => {
    return /^(?!.*[&<>"'\n\r]).{6,32}$/.test(val)
}

export const validatorPassword = (rule: any, val: string, callback: Function) => {
    if (!val) {
        return callback(new Error('密码不能为空'))
    }
    if (!regularPassword(val)) {
        return callback(new Error('请输入正确的密码'))
    }
    return callback()
}

/**
 * 变量名验证
 */
export const regularVarName = (val: string) => {
    return /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/.test(val)
}
export const validatorVarName = (rule: any, val: string, callback: Function) => {
    if (!val) {
        return callback()
    }
    if (!regularVarName(val)) {
        return callback(new Error('请输入正确的名称'))
    }
    return callback()
}
export const validatorVarNameKey = (rule: any, val: string, isNull: boolean, key: string, callback: Function) => {
    if (!val) {
        return isNull ? callback() : callback(new Error(`${key}不能为空`))
    }
    if (!regularVarName(val)) {
        return callback(new Error(`请输入正确的${key}`))
    }
    return callback()
}

/**
 * 验证内容是否为空
 */
export function validatorEditorRequired(rule: any, val: string, key = '内容', callback: Function) {
    if (!val || val === '<p><br></p>') {
        return callback(new Error(`${key}不能为空`))
    }
    return callback()
}
