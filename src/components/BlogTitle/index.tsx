import Link from 'next/link'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  title: string
  isLogin: boolean
}

const BlogTitle = ({title, isLogin}: Props) => (
  <Link
    className="flex items-center text-n-3 font-extrabold text-2xl mb-6"
    href="/">
    <div className="relative w-10 h-10 flex items-center mr-2">
      <Image
        className="rounded-full object-cover"
        src={isLogin ? '/images/smileHeart.png' : '/images/sleepyFace.png'}
        width={30}
        height={30}
        alt="mainTitle"
      />
    </div>
    <Typography text={title} className="text-n-3 font-extrabold text-2xl" />
  </Link>
)

export default BlogTitle
