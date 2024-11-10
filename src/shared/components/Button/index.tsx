import {type ReactNode, type MouseEvent} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>
  children: ReactNode
  disabled?: boolean
}

const Button = ({
  className = '',
  onClick,
  type = 'button',
  children,
  disabled = false,
}: Props) => {
  return (
    <button
      className={twMerge('btn-dark btn-small', className)}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
