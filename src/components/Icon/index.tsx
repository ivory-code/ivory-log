import {twMerge} from 'tailwind-merge'

import {ICONS} from '@/components/Icon/icons'

export type IconName = keyof typeof ICONS

interface Props {
  className?: string
  iconName: IconName
  size?: number
  fill?: string
}

const Icon = ({className, iconName, fill, size = 24}: Props) => (
  <svg
    className={twMerge('inline-block', className)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true">
    <path className={fill} d={ICONS[iconName]} />
  </svg>
)

export default Icon
