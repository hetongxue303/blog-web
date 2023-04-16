export interface MenuItem {
    title: string
    icon?: string
    path?: string
    children?: Array<MenuItem>
}
