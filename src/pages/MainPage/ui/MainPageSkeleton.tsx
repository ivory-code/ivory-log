import React from 'react'

import Skeleton from '@/shared/components/Skeleton'

interface SkeletonGroupProps {
  items: {className: string}[]
  direction?: 'row' | 'col'
}

const SkeletonGroup = ({items, direction = 'col'}: SkeletonGroupProps) => {
  const wrapperClass = direction === 'row' ? 'flex gap-4 mt-4' : 'flex flex-col'
  return (
    <div className={wrapperClass}>
      {items.map((item, index) => (
        <Skeleton
          key={`${item.className}-${index}`}
          className={item.className}
        />
      ))}
    </div>
  )
}

const MainPageSkeleton = () => {
  return (
    <div>
      {/* 제목 및 부제목 스켈레톤 */}
      <Skeleton className="mb-4 h-8 w-1/2" />
      <Skeleton className="mb-12 h-4 w-1/3" />

      <div className="flex py-8 border-t lg:block md:py-8 dark:border-n-5">
        <div className="shrink-0 w-[21rem] lg:w-full lg:mb-10 lg:pr-0">
          {/* 텍스트 블록 스켈레톤 */}
          <SkeletonGroup
            items={[
              {className: 'mt-4 h-4 w-full'},
              {className: 'mt-2 h-4 w-3/4'},
              {className: 'mt-2 h-4 w-1/2'},
            ]}
          />
          {/* Skill 아이콘 */}
          <SkeletonGroup
            items={[
              {className: 'h-12 w-12 rounded'},
              {className: 'h-12 w-12 rounded'},
              {className: 'h-12 w-12 rounded'},
            ]}
            direction="row"
          />
        </div>
        <div className="grow px-5 justify-center">
          {/* 이미지 스켈레톤 */}
          <Skeleton className="w-full h-[500px] rounded-3xl" />
        </div>
      </div>
    </div>
  )
}

export default MainPageSkeleton
