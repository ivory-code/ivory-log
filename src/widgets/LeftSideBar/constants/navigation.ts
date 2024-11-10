import {type NavigationType} from '@/widgets/LeftSideBar/types'

export const NAVIGATION: NavigationType[] = [
  {
    title: '홈',
    url: '/',
    icon: 'home',
    iconClass: 'fill-accent-1',
    isAdmin: false,
  },
  {
    title: '게시글',
    url: '/blog',
    icon: 'blog',
    iconClass: 'fill-accent-2',
    isAdmin: false,
  },
  {
    title: '즐겨찾기',
    url: '/favorite',
    icon: 'favorite',
    iconClass: 'fill-accent-5',
    isAdmin: true,
  },
  {
    title: '글 작성하기',
    url: '/blogCreate',
    icon: 'create',
    iconClass: 'fill-primary-2',
    isAdmin: true,
  },
  {
    title: '글 관리하기',
    url: '/blogDashBoard',
    icon: 'settings',
    iconClass: 'fill-accent-3',
    isAdmin: true,
  },
]
