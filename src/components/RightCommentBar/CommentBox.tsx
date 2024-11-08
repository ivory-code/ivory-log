import {format, parseISO} from 'date-fns'
import {toZonedTime} from 'date-fns-tz'
import Link from 'next/link'
import {useCallback, useState, useMemo} from 'react'
import {twMerge} from 'tailwind-merge'

import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

export type CommentData = Database['public']['Tables']['comments']['Row']

interface Props {
  isDisabled?: boolean
  item: CommentData
  onClickPositiveButton?: () => void
  onClickNegativeButton?: () => void | Promise<void>
}

const CommentBox = ({
  item,
  isDisabled = false,
  onClickPositiveButton,
  onClickNegativeButton,
}: Props) => {
  const user = useUser(state => state.user)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const isDeleteButtonVisible =
    user?.id === item.user_id || user?.role === 'admin'

  const formattedDate = useMemo(() => {
    const timeZone = 'Asia/Seoul'
    const createdAt = parseISO(item.created_at)
    const createdAtKST = toZonedTime(createdAt, timeZone)
    return format(createdAtKST, 'yyyy-MM-dd HH:mm:ss')
  }, [item.created_at])

  const handleTooltipVisible = () => {
    setIsTooltipVisible(prev => !prev)
  }

  const closeTooltip = useCallback(() => {
    setIsTooltipVisible(false)
  }, [])

  const handlePositiveButton = useCallback(() => {
    onClickPositiveButton?.()
    closeTooltip()
  }, [onClickPositiveButton, closeTooltip])

  const handleNegativeButton = useCallback(() => {
    onClickNegativeButton?.()
    closeTooltip()
  }, [onClickNegativeButton, closeTooltip])

  return (
    <div>
      <div className="relative flex justify-between items-center">
        <Link
          className={twMerge('block mt-2', isDisabled && 'cursor-default')}
          href={isDisabled ? '' : `/blogDetail/${item.post_id}`}
          onClick={event => isDisabled && event.preventDefault()}>
          <div
            className={twMerge(
              'group py-3 px-3 rounded-xl transition-colors',
              !isDisabled && 'hover:bg-n-3/75',
            )}>
            <div className="truncate base1 font-semibold text-n-6">
              {item.username}
            </div>
            <div className="mt-1 base2 text-n-5">{item.content}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="caption2 text-n-4/75">{formattedDate}</div>
            </div>
          </div>
        </Link>
        {isDeleteButtonVisible && (
          <div>
            <IconButton
              onClick={handleTooltipVisible}
              iconName="delete"
              iconClassName="cursor-pointer fill-accent-1"
              buttonClassName="bg-transparent hover:bg-accent-1/25"
            />
            <Dialog
              isVisible={isTooltipVisible}
              message="댓글을 삭제하시겠습니까?"
              onConfirm={handlePositiveButton}
              onCancel={handleNegativeButton}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentBox
