import md5 from 'js-md5'

export function useLogin() {
    const encryptPasswordByMD5 = (password: string): string => md5(md5(password).split('').reverse().join(''))

    return {
        encryptPasswordByMD5
    }
}
