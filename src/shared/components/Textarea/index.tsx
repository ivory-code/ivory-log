import {type ChangeEvent} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props {
  value: string
  name?: string
  defaultValue?: string
  className?: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({
  value,
  className,
  placeholder = '',
  onChange,
  defaultValue,
  name = '',
}: Props) => {
  return (
    <textarea
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={twMerge(
        'w-full h-11 pl-11 pr-4 bg-transparent shadow-[inset_0_0_0_0.0625rem_#DADBDC] rounded-full outline-none caption1 text-n-5 transition-shadow focus:shadow-[inset_0_0_0_0.125rem_#0084FF] placeholder:text-n-4 resize-none',
        className,
      )}
      placeholder={placeholder}
    />
  )
}

export default Textarea
