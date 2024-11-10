import {twMerge} from 'tailwind-merge'

interface Props {
  content: string
  className?: string
}

const MarkdownView = ({content, className}: Props) => {
  return (
    <div
      className={twMerge(className)}
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, '<br />'),
      }}
    />
  )
}

export default MarkdownView
