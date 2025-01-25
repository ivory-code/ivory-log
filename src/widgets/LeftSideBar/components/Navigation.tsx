import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {twMerge} from 'tailwind-merge'

import Icon from '@/shared/components/Icon'
import {type NavigationType} from '@/widgets/LeftSideBar/types'

interface Props {
  items: NavigationType[]
  isSideBarVisible?: boolean
  isAdmin: boolean
}

const Navigation = ({items, isSideBarVisible = false, isAdmin}: Props) => {
  const pathname = usePathname()

  const filteredItems = isAdmin ? items : items.filter(item => !item.isAdmin)

  return (
    <div className={twMerge(isSideBarVisible && 'px-2')}>
      {filteredItems.map(item => {
        const isActive = pathname === item.url
        const linkClass = twMerge(
          'flex items-center justify-start h-12 base2 font-semibold text-n-3/75 rounded-lg transition-colors hover:text-n-1 px-3',
          isActive &&
            'text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]',
        )

        return (
          <Link href={item.url} key={item.title} className={linkClass}>
            <div className="relative w-6 h-6 flex-shrink-0">
              <Icon iconName={item.icon} className={item.iconClass} />
            </div>
            {!isSideBarVisible && <div className="ml-3">{item.title}</div>}
          </Link>
        )
      })}
    </div>
  )
}

export default Navigation
