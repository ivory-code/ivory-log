import {useState, useCallback, useRef} from 'react'
import {twMerge} from 'tailwind-merge'

import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Input from '@/shared/components/Input'
import Typography from '@/shared/components/Typography'

interface Props {
  onClick: (content: string) => Promise<void>
}

const CommentInput = ({onClick}: Props) => {
  const [commentValue, setCommentValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // 댓글 제출 핸들러
  const handleClick = useCallback(async () => {
    if (!commentValue.trim()) return // 공백만 있는 댓글은 제출하지 않음

    setIsLoading(true) // 로딩 시작
    try {
      await onClick(commentValue)
      setCommentValue('') // 제출 후 입력 필드 초기화
      inputRef.current?.focus() // 댓글 제출 후 입력 필드에 포커스
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting comment:', error)
      // 여기에서 사용자에게 실패 메시지를 표시할 수 있습니다.
    } finally {
      setIsLoading(false) // 로딩 종료
    }
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
        ref={inputRef}
        value={commentValue}
        onChange={e => setCommentValue(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className="w-3/4"
      />
      <Button
        aria-label="댓글 추가"
        className={twMerge('btn-small hover:bg-accent-2')}
        onClick={handleClick}
        disabled={isLoading || !commentValue.trim()}>
        {isLoading ? (
          <Typography className="caption2" text="로딩 중..." />
        ) : (
          <Typography className="caption2" text="댓글추가" />
        )}
      </Button>
    </div>
  )
}

export default CommentInput
