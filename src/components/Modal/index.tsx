'use client'

import {type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

import IconButton from '@/components/IconButton'

interface Props {
  className?: string
  classWrap?: string
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({className, classWrap, isVisible, children, onClose}: Props) => {
  if (!isVisible) return null

  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50',
        className,
      )}>
      <div
        className={twMerge(
          'relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl overflow-auto',
          classWrap,
        )}>
        <div className="flex flex-row-reverse p-2">
          <IconButton
            buttonClassName="bg-transparent hover:bg-transparent"
            iconName="close"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
