import {twMerge} from 'tailwind-merge'

import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Typography from '@/shared/components/Typography'
import {type IconName} from '@/shared/types/icon'

interface Props {
  title: string
  onClick: () => void
  isAdmin?: boolean
  iconName?: IconName // 아이콘을 커스터마이징할 수 있도록 props 추가
  className?: string // 추가: 외부 스타일 커스터마이징을 위해 className 전달
}

const BlogList = ({
  onClick,
  title,
  isAdmin = false,
  iconName = isAdmin ? 'blog' : 'favoriteFilled',
  className,
}: Props) => (
  <Button
    onClick={onClick}
    className={twMerge(
      'group w-full flex items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent',
      'hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5',
      className, // 외부에서 전달된 className을 병합하여 적용
    )}>
    <div className="relative flex justify-center items-center w-15 h-15 mr-6">
      <div className="absolute inset-0 opacity-20 rounded-xl" />
      <Icon className="relative z-1" iconName={iconName} fill="fill-accent-6" />
    </div>
    <Typography className="ml-3" text={title} />
    <Icon className="ml-auto fill-n-4 transition-colors" iconName="arrowNext" />
  </Button>
)

export default BlogList
