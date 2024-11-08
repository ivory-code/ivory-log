import {type ReactNode, type MouseEvent} from 'react'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>
  children: ReactNode
}

const Button = ({
  className = '',
  onClick,
  type = 'button',
  children,
}: Props) => {
  return (
    <button
      className={`btn-dark btn-small ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  )
}

export default Button
