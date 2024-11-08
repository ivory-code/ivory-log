// BlogDetailPage.tsx
'use client'

import axios from 'axios'
import {useParams} from 'next/navigation'
import {type FormEvent, useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'
import {twMerge} from 'tailwind-merge'

import {addFavorite} from '@/app/api/addFavorite'
import {deleteFavorite} from '@/app/api/deleteFavorite'
import {getBlogFavorite} from '@/app/api/getFavorite'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Image from '@/components/Image'
import Layout from '@/components/Layout'
import MarkdownView from '@/components/MarkdownView'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import BlogDetailPageSkeleton from '@/templates/BlogDetailPage/BlogDetailPageSkeleton'
import {type BlogData} from '@/templates/BlogPage'

const BlogDetailPage = () => {
  const params = useParams()
  const user = useUser(state => state.user)

  const [blogDetailData, setBlogDetailData] = useState<BlogData | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const blogId = `${params.id}`

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const fetchBlogDetailData = useCallback(async () => {
    if (blogId) {
      try {
        const {data} = await axios.get<{post: BlogData}>(
          `/api/blogDetail?id=${blogId}`,
        )
        setBlogDetailData(data.post)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch blog detail:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [blogId])

  const fetchFavoriteData = useCallback(async () => {
    if (!blogId) {
      return
    }

    const data = await getBlogFavorite({blogId})
    if (data?.length) {
      setIsBookmarked(true)
    }
  }, [blogId])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      if (!user?.id || !blogDetailData?.title) return

      if (isBookmarked) {
        await deleteFavorite({userId: user.id, blogId})
        setIsBookmarked(false)
        return
      }
      await addFavorite({
        userId: user.id,
        blogId,
        blogTitle: blogDetailData.title,
      })
      setIsBookmarked(true)
    },
    [user?.id, blogDetailData?.title, isBookmarked, blogId],
  )

  useEffect(() => {
    if (blogId) {
      fetchBlogDetailData()
      fetchFavoriteData()
    }
  }, [blogId, fetchBlogDetailData, fetchFavoriteData])

  useEffect(() => {
    if (blogDetailData?.content) {
      void convertMarkdownToHtml(blogDetailData.content)
    }
  }, [blogDetailData?.content, convertMarkdownToHtml])

  return (
    <Layout>
      {isLoading ? (
        <BlogDetailPageSkeleton />
      ) : (
        <div>
          {blogDetailData?.titleImageUrl && (
            <div className="relative w-full aspect-[2.4]">
              <Image
                className="rounded-xl object-cover"
                src={blogDetailData.titleImageUrl}
                fill
                alt="blogDetailImage"
                priority
              />
            </div>
          )}
          <div>
            <div className="flex justify-between items-center">
              <Typography
                text={blogDetailData?.title ?? ''}
                className="mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black"
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                className={twMerge('btn-small hover:bg-accent-2')}>
                <Icon
                  iconName={isBookmarked ? 'favoriteFilled' : 'favorite'}
                  className="fill-accent-6 w-8 h-8"
                />
              </Button>
            </div>
            <MarkdownView
              content={htmlContent}
              className="mt-4 body2 font-semibold text-n-6"
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default BlogDetailPage
