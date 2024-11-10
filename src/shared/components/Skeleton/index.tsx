import {twMerge} from 'tailwind-merge'

interface Props {
  className?: string
}

const Skeleton = ({className}: Props) => (
  <div className={twMerge('animate-pulse bg-gray-300 rounded', className)} />
)

export default Skeleton
