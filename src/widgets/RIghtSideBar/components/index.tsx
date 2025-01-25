import {useCallback} from 'react'
import {twMerge} from 'tailwind-merge'

import LoginForm from '@/features/auth/components/LoginForm'
import CommentBox, {
  type CommentData,
} from '@/features/comment/components/CommentBox'
import CommentInput from '@/shared/components/CommentInput'
import {type User} from '@/store/user'
import RightSideBarSkeleton from '@/widgets/RIghtSideBar/components/ui/RightSideBarSkeleton'

interface Props {
  data: CommentData[] | null // null이면 데이터 로딩 중
  user: User | null
  className?: string
  createComment?: ({
    username,
    userId,
    content,
  }: {
    username: string
    userId: string
    content: string
  }) => Promise<void>
  deleteComment: ({
    userId,
    commentId,
    role,
  }: {
    userId: string
    commentId: string
    role?: string
  }) => Promise<void>
  isBlogDetailPage?: boolean
}

const RightSideBar = ({
  data,
  user,
  className = '',
  createComment,
  deleteComment,
  isBlogDetailPage = true,
}: Props) => {
  const handleInput = useCallback(
    async (content: string) => {
      if (createComment && user) {
        await createComment({
          username: user.nickname,
          userId: user.id,
          content,
        })
      }
    },
    [createComment, user],
  )

  const handleDelete = useCallback(
    (commentId: string) => {
      if (deleteComment && user) {
        deleteComment({
          userId: user.id,
          commentId,
          role: user.role,
        })
      }
    },
    [deleteComment, user],
  )

  const renderContent = () => {
    if (data === null) {
      // 데이터 로딩 중
      return <RightSideBarSkeleton />
    }

    if (data.length === 0) {
      // 데이터는 있으나 비어 있음
      return (
        <div className="flex items-center justify-center h-full text-n-4">
          <div className="text-center">
            <p className="body1 text-n-4">댓글이 없습니다.</p>
            <p className="caption1 text-n-4/75">첫 댓글을 작성해보세요!</p>
          </div>
        </div>
      )
    }

    // 데이터가 존재
    return data.map((comment, index) => (
      <CommentBox
        key={`${comment.id}-${index}`}
        item={comment}
        isDisabled={isBlogDetailPage}
        onClickPositiveButton={() => handleDelete(comment.id)}
      />
    ))
  }

  return (
    <div
      className={twMerge(
        'absolute top-0 right-0 bottom-0 flex flex-col w-[22.5rem] pt-[8rem] bg-n-1 rounded-r-[1.25rem] border-l border-n-3 shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)] 2xl:w-80 lg:rounded-[1.25rem] lg:invisible lg:opacity-0 lg:transition-opacity lg:z-20 lg:border-l-0 lg:shadow-2xl md:fixed md:w-[calc(100%-4rem)] md:border-l md:rounded-none',
        !isBlogDetailPage ? 'pb-24' : '',
        className,
      )}>
      <LoginForm className="absolute top-0 left-0 right-0 flex justify-end items-center h-18 px-9 border-b border-n-3 lg:pr-18 md:pr-16" />
      <div className="absolute top-24 left-0 right-0 flex items-center px-9 md:px-6">
        <div className="base2 text-n-4/75">최근 댓글 수</div>
        <div className="ml-3 px-2 bg-n-3 rounded-lg caption1 text-n-4">
          {data ? data.length : 0}
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth items-center px-6 md:px-3">
        {renderContent()}
      </div>
      {isBlogDetailPage && (
        <div className="absolute left-0 right-0 bottom-0 py-6 px-3">
          <CommentInput onClick={handleInput} />
        </div>
      )}
    </div>
  )
}

export default RightSideBar
