import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {twMerge} from 'tailwind-merge'

import {useSanitizeMarkdown} from '@/features/blog/hooks/useSanitizeMarkdown'
import Image from '@/shared/components/Image'
import Typography from '@/shared/components/Typography'

interface Props {
  id: string
  title: string
  imageUrl: string
  content: string
  className?: string // 추가: 컴포넌트 스타일을 커스터마이징할 수 있도록 className 전달
}

const BlogCard = ({id, title, imageUrl, content, className}: Props) => {
  const pathname = usePathname()
  const isBlogPage = pathname ? pathname.includes('Blog') : false

  const sanitizedContent = useSanitizeMarkdown(content)

  return (
    <div className={twMerge('w-full max-w-[30rem] mx-auto', className)}>
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-5">
        <div className="relative w-full aspect-[2.4]">
          <Image
            className="rounded-xl object-cover"
            src={imageUrl}
            fill
            alt="blogContent"
            priority
          />
        </div>
        <Typography
          className={twMerge(
            'mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black overflow-hidden',
            isBlogPage && 'truncate',
          )}
          text={title}
        />
        <div
          className={twMerge(
            'mt-4 body2 font-semibold text-n-6 overflow-hidden',
            isBlogPage && 'truncate',
          )}
          dangerouslySetInnerHTML={{__html: sanitizedContent}}
        />
        <div className="flex flex-wrap">
          <Link
            href={`/blogDetail/${id}`}
            className="btn-dark btn-small"
            prefetch={false}>
            <Typography className="base2" text="View More" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
