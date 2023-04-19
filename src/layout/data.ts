import { MenuItem } from '../../types/layout'

export const data: MenuItem[] = [
    {
        title: '首页',
        icon: 'icon-park-home',
        path: '/dashboard'
    },
    {
        title: '写博客',
        icon: 'icon-park-home',
        path: '/write'
    },
    {
        title: '博客管理',
        icon: 'icon-park-home',
        path: '/blog',
        children: [
            {
                title: '文章管理',
                icon: 'icon-park-home',
                path: '/blog/article'
            },
            {
                title: '标签管理',
                icon: 'icon-park-home',
                path: '/blog/tags'
            },
            {
                title: '分类管理',
                icon: 'icon-park-home',
                path: '/blog/category'
            }
        ]
    },
    {
        title: '系统管理',
        icon: 'icon-park-home',
        path: '/system',
        children: [
            {
                title: '用户管理',
                icon: 'icon-park-home',
                path: '/system/user'
            },
            {
                title: '角色管理',
                icon: 'icon-park-home',
                path: '/system/user'
            },
            {
                title: '菜单管理',
                icon: 'icon-park-home',
                path: '/system/user'
            }
        ]
    }
]
