import DOMPurify from 'dompurify'
import {marked} from 'marked'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {twMerge} from 'tailwind-merge'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  id: string
  title: string
  imageUrl: string
  content: string
}

const BlogCard = ({id, title, imageUrl, content}: Props) => {
  const pathname = usePathname()
  const isBlogPage = pathname.includes('Blog')

  const [sanitizedContent, setSanitizedContent] = useState('')

  // 마크다운을 HTML로 변환하면서 이미지 태그를 제거하고 100자까지 잘라줍니다
  const renderPreviewContent = async (markdown: string): Promise<string> => {
    const html = await marked.parse(markdown) // Promise를 해제
    const sanitizedHtml = DOMPurify.sanitize(html.replace(/<img[^>]*>/g, '')) // 이미지 태그 제거 후 정제
    const previewText =
      sanitizedHtml.length > 100
        ? sanitizedHtml.slice(0, 100) + '...'
        : sanitizedHtml // 100자 제한
    return previewText
  }

  useEffect(() => {
    const convertContent = async () => {
      const htmlContent = await renderPreviewContent(content)
      setSanitizedContent(htmlContent)
    }

    convertContent()
  }, [content])

  return (
    <div className="w-full max-w-[30rem] mx-auto">
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
