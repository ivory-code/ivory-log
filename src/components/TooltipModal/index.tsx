import {type ReactNode} from 'react'

import Typography from '@/components/Typography'

interface Props {
  isModalVisible: boolean
  title: string
  description?: string
  children?: ReactNode
}

const TooltipModal = ({
  isModalVisible,
  title,
  description,
  children,
}: Props) => {
  if (!isModalVisible) {
    return null
  }

  return (
    <div className="bg-slate-200 rounded-lg absolute bottom-10 right-0 transform translate-y-full px-10 py-4 shadow-md z-50">
      <Typography text={title} className="base2 font-semibold" />
      <div className="flex justify-around mt-2">
        {children
          ? children
          : description && (
              <Typography
                text={description}
                className="caption1 font-semibold"
              />
            )}
      </div>
    </div>
  )
}

export default TooltipModal
