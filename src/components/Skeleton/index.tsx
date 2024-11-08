import React from 'react'

interface Props {
  className?: string
}

const Skeleton = ({className}: Props) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
)

export default Skeleton
