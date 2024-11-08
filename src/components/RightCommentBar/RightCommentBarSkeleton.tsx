import React from 'react'

import Skeleton from '@/components/Skeleton'

const RightCommentBarSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-6 w-1/4" /> {/* 댓글 작성자 */}
          <Skeleton className="h-4 w-3/4" /> {/* 댓글 내용 */}
          <Skeleton className="h-4 w-1/2" /> {/* 댓글 내용 */}
        </div>
      ))}
    </div>
  )
}

export default RightCommentBarSkeleton
