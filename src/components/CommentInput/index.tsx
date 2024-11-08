import {useCallback, useState} from 'react'
import {twMerge} from 'tailwind-merge'

import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Typography from '@/components/Typography'

interface Props {
  onClick: (content: string) => Promise<void>
}

const CommentInput = ({onClick}: Props) => {
  const [commentValue, setCommentValue] = useState('')

  const handleClick = useCallback(async () => {
    await onClick(commentValue)
    setCommentValue('') // 제출 후 입력 필드 초기화
  }, [commentValue, onClick])

  return (
    <div className="flex items-center justify-between relative md:w-full md:mr-0">
      <div className="group absolute top-3 left-4 text-0">
        <Icon
          className="w-5 h-5 fill-n-4/50 transition-colors"
          iconName="create"
        />
      </div>
      <Input
        value={commentValue}
        onChange={e => setCommentValue(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className="w-3/4"
      />
      <Button
        className={twMerge('btn-small hover:bg-accent-2')}
        onClick={handleClick}>
        <Typography className="caption2" text="댓글추가" />
      </Button>
    </div>
  )
}

export default CommentInput
