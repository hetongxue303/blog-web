import axios, { base_url } from '../utils/request'
import { Category, Search } from './types'

export const getCategoryListUrl = (params: Search) => {
    return axios({ method: 'GET', url: `${base_url}/category/list`, params })
}
export const addCategoryUrl = (data: Category) => {
    return axios({ method: 'POST', url: `${base_url}/category/add`, data })
}
export const updateCategoryUrl = (data: Category) => {
    return axios({ method: 'PUT', url: `${base_url}/category/update`, data })
}
export const deleteCategoryUrl = (id: number) => {
    return axios({ method: 'DELETE', url: `${base_url}/category/delete/${id}` })
}
export const batchDeleteCategoryUrl = (data: number[]) => {
    return axios({ method: 'DELETE', url: `${base_url}/category/batchDelete`, data })
}
