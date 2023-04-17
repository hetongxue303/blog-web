import axios, { base_url } from '../utils/request'
import { Search, Tags } from './types'

export const getTagListUrl = (params: Search) => {
    return axios({
        method: 'GET',
        url: `${base_url}/tags/list`,
        params
    })
}
export const addTagUrl = (data: Tags) => {
    return axios({
        method: 'POST',
        url: `${base_url}/tags/add`,
        data
    })
}
export const updateTagUrl = (data: Tags) => {
    return axios({
        method: 'PUT',
        url: `${base_url}/tags/update`,
        data
    })
}
