import React from 'react'

import Skeleton from '@/components/Skeleton'

const BlogPageSkeleton = () => (
  <div className="rounded-lg p-4">
    <Skeleton className="h-48 w-full mb-4 rounded" /> {/* 이미지 스켈레톤 */}
    <Skeleton className="h-6 w-3/4 mb-2" /> {/* 제목 스켈레톤 */}
    <Skeleton className="h-4 w-1/2" /> {/* 내용 스켈레톤 */}
  </div>
)

export default BlogPageSkeleton
