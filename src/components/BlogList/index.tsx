import {twMerge} from 'tailwind-merge'

import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Typography from '@/components/Typography'

interface Props {
  title: string
  onClick: () => void
  isAdmin?: boolean
}

const BlogList = ({onClick, title, isAdmin = false}: Props) => (
  <Button
    onClick={onClick}
    className={twMerge(
      'group w-full flex items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent',
      'hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5',
    )}>
    <div className="relative flex justify-center items-center w-15 h-15 mr-6">
      <div className="absolute inset-0 opacity-20 rounded-xl" />
      <Icon
        className="relative z-1"
        iconName={isAdmin ? 'blog' : 'favoriteFilled'}
        fill="fill-accent-6"
      />
    </div>
    <Typography className="ml-3" text={title} />
    <Icon className="ml-auto fill-n-4 transition-colors" iconName="arrowNext" />
  </Button>
)

export default BlogList
