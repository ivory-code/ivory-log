import Button from '@/shared/components/Button'
import Typography from '@/shared/components/Typography'

import type React from 'react'

interface Props {
  isVisible: boolean
  isError?: boolean
  message?: string
  onConfirm: () => void
  onCancel?: () => void
}

const Dialog = ({
  isVisible,
  isError = false,
  message = '',
  onConfirm,
  onCancel,
}: Props) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <Typography className="text-gray-700 mb-4" text={message} />
        <div className="flex justify-end space-x-4">
          {!isError && (
            <Button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none">
              취소
            </Button>
          )}
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
