export interface Search {
    current: number
    size: number
    keywords?: string
}

export interface Filter {
    label: string
    status: boolean
}

export interface Tags {
    id?: number
    name?: string
    remark?: string
    status?: boolean
    isDel?: boolean
    createBy?: number
    createTime?: Date
    updateBy?: number
    updateTime?: Date
}
export interface Category {
    id?: number
    name?: string
    remark?: string
    status?: boolean
    isDel?: boolean
    createBy?: number
    createTime?: Date
    updateBy?: number
    updateTime?: Date
}
