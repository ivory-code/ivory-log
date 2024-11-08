import {twMerge} from 'tailwind-merge'

import Icon, {type IconName} from '@/components/Icon'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  buttonClassName?: string
  iconClassName?: string
  iconName: IconName
  onClick?: () => void
}

const IconButton = ({
  iconName,
  buttonClassName = '',
  iconClassName = '',
  onClick,
  type = 'button',
}: Props) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center p-2',
        buttonClassName,
      )}
      onClick={onClick}
      type={type}>
      <Icon iconName={iconName} className={twMerge('w-6 h-6', iconClassName)} />
    </button>
  )
}

export default IconButton
