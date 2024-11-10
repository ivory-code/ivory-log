import React, {memo, useMemo} from 'react'
import {twMerge} from 'tailwind-merge'

import Icon from '@/shared/components/Icon'
import Typography from '@/shared/components/Typography'
import {type IconName} from '@/shared/types/icon'

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
  const groupedIcons = useMemo(() => {
    const result: IconsType[] = []
    for (let i = 0; i < icons.length; i += 4) {
      result.push(icons.slice(i, i + 4))
    }
    return result
  }, [icons])

  return (
    <div className={twMerge('mt-6', className)}>
      <Typography text={title} className="base2" />
      <div className="space-y-4">
        {groupedIcons.map((group, groupIndex) => (
          <div
            key={`group-${groupIndex}`}
            className="flex justify-start gap-x-5">
            {group.map((icon, iconIndex) => (
              <div
                key={`icon-${icon.name}-${iconIndex}`}
                className={twMerge(
                  'w-12 h-12 rounded flex justify-center items-center',
                  icon.bg,
                )}>
                <Icon iconName={icon.name} aria-label={`${icon.name} icon`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(IconRow)
