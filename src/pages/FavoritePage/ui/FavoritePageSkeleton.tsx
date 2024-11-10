import React from 'react'

import Skeleton from '@/shared/components/Skeleton'

const FavoritePageSkeleton = () => (
  <div className="flex justify-center items-center p-2">
    <Skeleton className="w-full h-8 rounded" /> {/* 제목 스켈레톤 */}
  </div>
)

export default FavoritePageSkeleton
