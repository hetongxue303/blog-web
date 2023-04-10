import { JSEncrypt } from 'jsencrypt'
import { useCookies } from '@vueuse/integrations/useCookies'
import { AUTHORIZATION_KEY, EXPIRE_TIME_KEY, PRIVATE_KEY, PUBLIC_KEY } from './constants'
import router from '../router'

const cookies = useCookies()
/**
 * 设置浏览器标题
 * @param router vue路由
 */
export const setBrowserTitle = () => {
    if (typeof router.currentRoute.value.meta.title === 'string') {
        document.title = router.currentRoute.value.meta.title as string
    }
}

/**
 * 生成范围随机数
 * @param min 最小值
 * @param max 最大值
 */
export const randomNumber = (min: number | undefined, max: number | undefined): number | undefined => {
    if (min === undefined || max === undefined) return undefined
    return Math.floor(Math.random() * ((max as number) - (min as number))) + (min as number)
}

/**
 * 延时请求
 * @param callback 请求回调
 * @param min 最小范围
 * @param max 最大范围
 */
export const delayRequest = (callback: () => void, min?: number, max?: number) => {
    setTimeout(async () => {
        callback()
    }, randomNumber(min, max))
}

/**
 * 文本加密
 *
 * @param text 明文
 */
export const encrypt = (text: string): string | false => {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    return encryptor.encrypt(text)
}

/**
 * 文本解密
 *
 * @param text 密文
 */
export const decrypt = (text: string): string | false => {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(PRIVATE_KEY)
    return encryptor.decrypt(text)
}

/**
 * 获取token
 */
export const getToken = (): string => {
    return cookies.get(AUTHORIZATION_KEY)
}

/**
 * 清除token
 */
export const removeToken = () => {
    cookies.remove(AUTHORIZATION_KEY)
}

/**
 * 设置token
 * @param token
 */
export const setToken = (token: string) => {
    cookies.set(AUTHORIZATION_KEY, token)
}

/**
 * 设置token过期时间
 * @param time
 */
export const setTokenTime = (time: number) => {
    cookies.set(EXPIRE_TIME_KEY, time)
}

/**
 * 获取token过期时间
 */
export const getTokenTime = (): number => {
    return cookies.get(EXPIRE_TIME_KEY)
}

/**
 * 清除token过期时间
 */
export const removeTokenTime = () => {
    cookies.remove(EXPIRE_TIME_KEY)
}
