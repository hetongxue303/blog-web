import md5 from 'js-md5'
import { reactive, ref } from 'vue'
import { getCaptcha, login } from '../../../api/login'
import { FormInstance } from 'element-plus'
import { MessageError, MessageWarning, NotificationSuccess } from '../../../utils/element'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { decrypt, encrypt } from '../../../utils/common'

export function useLogin() {
    const form: { username: string; password: string; captcha: string; status: boolean } = reactive({
        username: 'admin',
        password: '123456',
        captcha: '1123',
        status: false
    })
    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()
    const loading = ref(false)
    const imgUrl = ref('')
    const redirect = ref('')
    const ruleFormRef = ref<FormInstance>()
    const encryptPasswordByMD5 = (password: string): string => md5(md5(password).split('').reverse().join(''))
    const refreshCaptcha = () => getCaptcha().then(({ data }) => (imgUrl.value = data.content))
    const handleLogin = async (formEl?: FormInstance) => {
        if (!formEl) return
        await formEl.validate(async (valid) => {
            if (valid) {
                loading.value = true
                login({
                    username: form.username,
                    password: encryptPasswordByMD5(form.password),
                    code: form.captcha,
                    rememberMe: form.status
                })
                    .then(({ data, status }) => {
                        if (data.code === 200 && status === 200) {
                            handleRememberMe(form.status)
                            // userStore.setUserInfo(data)
                            NotificationSuccess('登陆成功')
                            router.push(redirect.value || '/')
                        } else {
                            form.captcha = ''
                            refreshCaptcha()
                            MessageWarning(data.message || '登陆失败，请重试！')
                        }
                    })
                    .catch(({ response }) => {
                        form.captcha = ''
                        refreshCaptcha()
                        MessageError(response.data.message)
                    })
                    .finally(() => (loading.value = false))
            }
        })
    }
    const handleRememberMe = (status: boolean) => {
        if (status) {
            const expires: Date = new Date(new Date().getTime() + 60 * 60 * 1000)
            cookie.remove('username')
            cookie.remove('password')
            cookie.remove('rememberMe')
            cookie.set('username', form.username, { expires })
            cookie.set('password', encrypt(form.password), { expires })
            cookie.set('rememberMe', form.status, { expires })
        } else {
            cookie.remove('username')
            cookie.remove('password')
            cookie.remove('rememberMe')
        }
    }
    const getCookie = () => {
        form.username = cookie.get('username')
        form.password = cookie.get('password') ? (decrypt(cookie.get('password')) as string) : ''
        form.status = Boolean(cookie.get('rememberMe'))
    }
    return {
        route,
        form,
        loading,
        imgUrl,
        redirect,
        ruleFormRef,
        refreshCaptcha,
        handleLogin,
        encryptPasswordByMD5,
        handleRememberMe,
        getCookie
    }
}
