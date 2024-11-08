import React from 'react'

import Skeleton from '@/components/Skeleton'

const BlogDashBoardPageSkeleton = () => (
  <div className="flex justify-between items-center p-3">
    <Skeleton className="h-8 w-5/6 rounded" /> {/* 제목 스켈레톤 */}
    <Skeleton className="h-8 w-8 rounded-full" /> {/* 삭제 버튼 스켈레톤 */}
  </div>
)

export default BlogDashBoardPageSkeleton
