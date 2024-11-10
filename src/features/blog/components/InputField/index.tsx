import {type ChangeEvent, forwardRef} from 'react'
import {twMerge} from 'tailwind-merge'

import Input from '@/shared/components/Input'

interface Props {
  label: string
  value: string
  name?: string
  defaultValue?: string
  className?: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      name = '',
      className,
      placeholder = '',
      onChange,
      defaultValue,
    }: Props,
    ref,
  ) => (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{label}</h2>
      <Input
        ref={ref} // ref 전달
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(
          'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500',
          className,
        )}
      />
    </div>
  ),
)

InputField.displayName = 'InputField'

export default InputField
