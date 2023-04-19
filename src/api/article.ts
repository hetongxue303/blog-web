import axios, { base_url } from '../utils/request'
import { Article, Search } from './types'

export const getArticleListUrl = (params: Search) => {
    return axios({ method: 'GET', url: `${base_url}/article/list`, params })
}
export const addArticleUrl = (data: Article) => {
    return axios({ method: 'POST', url: `${base_url}/article/add`, data })
}
export const updateArticleUrl = (data: Article) => {
    return axios({ method: 'PUT', url: `${base_url}/article/update`, data })
}
export const deleteArticleUrl = (id: number) => {
    return axios({ method: 'DELETE', url: `${base_url}/article/delete/${id}` })
}
export const batchDeleteArticleUrl = (data: number[]) => {
    return axios({ method: 'DELETE', url: `${base_url}/article/batchDelete`, data })
}
