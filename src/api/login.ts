import * as qs from 'qs'
import axios, { base_url } from '../utils/request'

export const login = (data: any) => {
    return axios({
        method: 'POST',
        url: `${base_url}/login`,
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const logout = () => {
    return axios({
        method: 'GET',
        url: `${base_url}/logout`
    })
}

export const getCaptcha = () => {
    return axios({
        method: 'GET',
        url: `${base_url}/captcha-image`
    })
}
