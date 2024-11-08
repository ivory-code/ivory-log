import Link from 'next/link'
import {twMerge} from 'tailwind-merge'

import Icon, {type IconName} from '@/components/Icon'
import {NAVIGATION} from '@/components/LeftNavigationSideBar/constants'
import {type User} from '@/store/user'

interface TopNavigationBarProps {
  user: User | null
}

const TopNavigationBar = ({user}: TopNavigationBarProps) => {
  const isAdmin = user?.role === 'admin'
  // admin 접근 권한에 따라 메뉴 필터링
  const filteredItems = NAVIGATION.filter(item => !item.isAdmin || isAdmin)

  return (
    <div className="hidden md:block">
      <div className="flex fixed top-0 left-0 right-0 items-center justify-around bg-n-7 h-14 shadow-md z-50 ">
        {filteredItems.map(item => (
          <Link
            href={item.url}
            key={item.title}
            className="flex flex-col items-center">
            <Icon
              iconName={item.icon as IconName}
              className={twMerge('w-6 h-6', item.iconClass)}
            />
            <span className="text-xs text-white">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopNavigationBar
