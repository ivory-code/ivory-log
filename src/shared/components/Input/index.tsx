import {forwardRef, type ChangeEvent} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props {
  value?: string
  defaultValue?: string
  name?: string
  className?: string
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      defaultValue,
      name,
      className = '',
      placeholder = '',
      onChange,
    }: Props,
    ref,
  ) => {
    return (
      <input
        ref={ref} // ref를 전달
        className={twMerge(
          'w-full h-11 pl-11 pr-4 bg-transparent shadow-[inset_0_0_0_0.0625rem_#DADBDC] rounded-full outline-none caption1 text-n-5 transition-shadow focus:shadow-[inset_0_0_0_0.125rem_#0084FF] placeholder:text-n-4',
          className,
        )}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    )
  },
)

Input.displayName = 'Input' // displayName을 명시해주는 것이 좋습니다.

export default Input
