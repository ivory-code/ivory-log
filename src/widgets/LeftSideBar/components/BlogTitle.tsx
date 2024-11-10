import Link from 'next/link'
import {twMerge} from 'tailwind-merge'

import Image from '@/shared/components/Image'
import Typography from '@/shared/components/Typography'

interface Props {
  title: string
  isLogin: boolean
}

const BlogTitle = ({title, isLogin}: Props) => {
  const imageSrc = isLogin ? '/images/smileHeart.png' : '/images/sleepyFace.png'

  return (
    <Link
      className={twMerge(
        'flex items-center text-n-3 font-extrabold text-2xl mb-6',
      )}
      href="/">
      <div className="relative w-10 h-10 flex items-center mr-2">
        <Image
          className="rounded-full object-cover"
          src={imageSrc}
          width={30}
          height={30}
          alt="mainTitle"
        />
      </div>
      <Typography text={title} className="text-n-3 font-extrabold text-2xl" />
    </Link>
  )
}

export default BlogTitle
