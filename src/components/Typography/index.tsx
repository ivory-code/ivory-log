import {twMerge} from 'tailwind-merge'

interface Props {
  text: string
  className?: string
}

const Typography = ({text, className = ''}: Props) => {
  return <div className={twMerge(className)}>{text}</div>
}

export default Typography
