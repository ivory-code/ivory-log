'use client'

import {default as NextImage, type ImageProps} from 'next/image'
import {useState} from 'react'
import {twMerge} from 'tailwind-merge'

const Image = ({className = '', sizes = '500px', ...props}: ImageProps) => {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    if (typeof window !== 'undefined') {
      setLoaded(true)
    }
  }

  return (
    <NextImage
      className={twMerge(
        'inline-block align-top transition-opacity',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      onLoad={handleLoad}
      sizes={sizes}
      {...props}
    />
  )
}

export default Image
