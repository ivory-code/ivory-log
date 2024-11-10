'use client'

import {type ReactNode, useEffect, useRef} from 'react'
import {twMerge} from 'tailwind-merge'

import IconButton from '@/shared/components/IconButton'

interface Props {
  className?: string
  classWrap?: string
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({className, classWrap, isVisible, children, onClose}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // ESC 버튼으로 모달 닫기 처리
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50',
        className,
      )}
      aria-hidden={!isVisible}>
      <div
        ref={modalRef}
        className={twMerge(
          'relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl overflow-auto transition-all transform',
          classWrap,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-hidden={!isVisible}>
        <div className="flex flex-row-reverse p-2">
          <IconButton
            buttonClassName="bg-transparent hover:bg-transparent"
            iconName="close"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
