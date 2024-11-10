import {type IconName} from '@/shared/types/icon'

export type NavigationType = {
  title: string
  url: string
  icon: IconName
  iconClass: string
  isAdmin: boolean
  onClick?: () => void
}
