import {twMerge} from 'tailwind-merge'

import {ICONS} from '@/shared/constants/icons'
import {type IconName} from '@/shared/types/icon'

interface Props {
  className?: string
  iconName: IconName
  size?: number
  fill?: string
}

const Icon = ({
  className,
  iconName,
  fill = 'currentColor',
  size = 24,
}: Props) => (
  <svg
    className={twMerge('inline-block', className, fill)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true">
    <path d={ICONS[iconName]} />
  </svg>
)

export default Icon
