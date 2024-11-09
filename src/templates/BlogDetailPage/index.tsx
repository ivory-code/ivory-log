'use client'

import {useParams} from 'next/navigation'
import {type FormEvent, useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'
import {twMerge} from 'tailwind-merge'

import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Image from '@/components/Image'
import Layout from '@/components/Layout'
import MarkdownView from '@/components/MarkdownView'
import Typography from '@/components/Typography'
import {mockBlogs, mockFavorites} from '@/mock/mockData' // mock data import
import {useUser} from '@/store/user'
import BlogDetailPageSkeleton from '@/templates/BlogDetailPage/BlogDetailPageSkeleton'

export type BlogData = {
  id: string
  author_id: string | null
  content: string
  created_at: string
  title: string
  titleImageUrl: string
  updated_at: string | null
  published: boolean | null
}

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
      // Replace API call with mock data
      const blog = mockBlogs.find(blog => blog.id === blogId)
      if (blog) {
        setBlogDetailData(blog)
      }
    }
    setIsLoading(false)
  }, [blogId])

  const fetchFavoriteData = useCallback(async () => {
    if (!blogId || !user?.id) return

    // Replace API call with mock data
    const favorite = mockFavorites.find(
      fav => fav.user_id === user.id && fav.post_id === blogId,
    )
    setIsBookmarked(!!favorite)
  }, [blogId, user?.id])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      if (!user?.id || !blogDetailData?.title) return

      // Add or remove favorite from mock data
      if (isBookmarked) {
        const index = mockFavorites.findIndex(
          fav => fav.user_id === user.id && fav.post_id === blogId,
        )
        if (index !== -1) {
          mockFavorites.splice(index, 1) // Remove from mockFavorites
        }
        setIsBookmarked(false)
      } else {
        mockFavorites.push({
          user_id: user.id,
          post_id: blogId,
          post_title: blogDetailData.title,
          created_at: new Date().toISOString(),
          id: `${mockFavorites.length + 1}`,
        })
        setIsBookmarked(true)
      }
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
