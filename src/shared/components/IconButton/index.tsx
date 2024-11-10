import {twMerge} from 'tailwind-merge'

import Icon from '@/shared/components/Icon'
import {type IconName} from '@/shared/types/icon'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  buttonClassName?: string
  iconClassName?: string
  iconName: IconName
  onClick?: () => void
  ariaLabel?: string
}

const IconButton = ({
  iconName,
  buttonClassName = '',
  iconClassName = '',
  onClick,
  type = 'button',
  ariaLabel,
}: Props) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center p-2',
        buttonClassName,
      )}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel || iconName}>
      <Icon iconName={iconName} className={twMerge('w-6 h-6', iconClassName)} />
    </button>
  )
}

export default IconButton
