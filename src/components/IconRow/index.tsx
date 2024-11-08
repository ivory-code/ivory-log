import React, {memo} from 'react'

import Icon, {type IconName} from '@/components/Icon'
import Typography from '@/components/Typography'

export type IconsType = {
  name: IconName
  bg: string
}[]

export interface IconRowProps {
  title: string
  className?: string
  icons: IconsType
}

const IconRow = ({icons, title, className}: IconRowProps) => {
  // icons 배열을 4개씩 나누어 그룹화합니다.
  const groupedIcons = icons.reduce((result, icon, index) => {
    const chunkIndex = Math.floor(index / 4)
    if (!result[chunkIndex]) {
      result[chunkIndex] = [] // 새로운 그룹 생성
    }
    result[chunkIndex].push(icon)
    return result
  }, [] as IconsType[])

  return (
    <div className={`mt-6 ${className}`}>
      <Typography text={title} className="base2" />
      <div className="space-y-4">
        {groupedIcons.map((group, groupIndex) => (
          <div key={groupIndex} className="flex justify-start gap-x-5">
            {group.map((icon, iconIndex) => (
              <div
                key={`${icon.name}-${iconIndex}`}
                className={`w-12 h-12 rounded ${icon.bg} flex justify-center items-center`}>
                <Icon iconName={icon.name} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(IconRow)
