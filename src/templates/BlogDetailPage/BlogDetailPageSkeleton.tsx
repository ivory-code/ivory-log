import React from 'react'

import Skeleton from '@/components/Skeleton'

const BlogDetailPageSkeleton = () => (
  <div>
    {/* 이미지 스켈레톤 */}
    <Skeleton className="relative w-full aspect-[2.4] rounded-xl mb-6" />

    <div className="flex justify-between items-center">
      {/* 제목 스켈레톤 */}
      <Skeleton className="w-3/4 h-10 mb-4 rounded-md" />
      {/* 좋아요 아이콘 스켈레톤 */}
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>

    {/* 본문 스켈레톤 */}
    <div className="space-y-4">
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-6 w-5/6 rounded-md" />
      <Skeleton className="h-6 w-3/4 rounded-md" />
      <Skeleton className="h-6 w-2/3 rounded-md" />
    </div>
  </div>
)

export default BlogDetailPageSkeleton
