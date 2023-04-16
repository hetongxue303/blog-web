import axios, { base_url } from '../utils/request'
import { Search } from './types'

export const getTagList = (params: Search) => {
    return axios({
        method: 'GET',
        url: `${base_url}/tags/list`,
        params
    })
}
