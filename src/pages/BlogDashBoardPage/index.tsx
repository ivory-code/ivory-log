'use client'

import React, {useCallback, useEffect, useState, useRef} from 'react'

import {deleteBlog} from '@/app/api/deleteBlog'
import BlogEditModal, {
  type BlogEditModalRef,
} from '@/features/blog/components/BlogEditModal'
import BlogList from '@/features/blog/components/BlogList'
import EditProfileModal, {
  type EditProfileModalRef,
} from '@/features/profile/components/EditProfileModal'
import BlogDashBoardPageSkeleton from '@/pages/BlogDashBoardPage/ui/BlogDashBoardPageSkeleton'
import Button from '@/shared/components/Button'
import Dialog from '@/shared/components/Dialog'
import Icon from '@/shared/components/Icon'
import IconButton from '@/shared/components/IconButton'
import Typography from '@/shared/components/Typography'
import {type BlogData} from '@/shared/types'
import {useUser} from '@/store/user'
import Layout from '@/widgets/Layout/components'

export const runtime = 'experimental-edge'

interface Props {
  blogsData: BlogData[]
  isLoading: boolean
  blogId: string | null
  onChangeBlogId: (id: string | null) => void
  onDeleteBlog: (blogId: string) => void
  refetchBlogs: () => void
}

const Page = ({
  blogsData,
  isLoading,
  blogId,
  onChangeBlogId,
  onDeleteBlog,
  refetchBlogs,
}: Props) => {
  const editProfileModalRef = useRef<EditProfileModalRef>(null)
  const blogEditModalRef = useRef<BlogEditModalRef>(null)

  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null)

  const handleEditProfile = () => {
    editProfileModalRef.current?.openModal()
  }

  const handleBlogDetail = (blog: BlogData) => {
    setSelectedBlog(blog)
    blogEditModalRef.current?.openModal()
  }

  return (
    <div>
      <Layout>
        <Button
          onClick={handleEditProfile}
          className="group w-1/2 h-15 flex justify-center items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5">
          <div>
            <Icon iconName="blog" fill="fill-accent-3" />
            <Typography text="홈 추가/수정" className="base2" />
          </div>
        </Button>
        {isLoading ? (
          Array.from({length: 5}).map((_, index) => (
            <BlogDashBoardPageSkeleton key={`${index}`} />
          ))
        ) : blogsData.length > 0 ? (
          blogsData.map(data => (
            <div key={data.id} className="flex justify-between items-center">
              <BlogList
                onClick={() => handleBlogDetail(data)}
                title={data.title}
                isAdmin
              />
              <IconButton
                buttonClassName="ml-4 fill-accent-1 transition-colors items-center bg-transparent"
                iconName="delete"
                onClick={() => onChangeBlogId(data.id)}
              />
              <Dialog
                isVisible={blogId === data.id}
                message="삭제하시겠습니까?"
                onConfirm={() => onDeleteBlog(data.id)}
                onCancel={() => onChangeBlogId(null)}
              />
            </div>
          ))
        ) : (
          <Typography text="No blogs found." />
        )}
      </Layout>
      <EditProfileModal ref={editProfileModalRef} />
      <BlogEditModal
        ref={blogEditModalRef}
        blogData={selectedBlog ?? undefined}
        refetchBlogs={refetchBlogs}
      />
    </div>
  )
}

const BlogDashBoardPage = () => {
  const user = useUser(state => state.user)

  const [blogsData, setBlogsData] = useState<BlogData[]>([]) // Use proper type for blogs data
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가
  const [blogId, setBlogId] = useState<string | null>(null)

  const handleChangeBlogId = (id: string | null) => {
    if (blogId) {
      setBlogId(null)
      return
    }
    setBlogId(id)
  }

  const fetchBlogsData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/blogDashBoard', {method: 'GET'})
      if (!response.ok) {
        throw new Error('Failed to fetch blogs data')
      }
      const result = await response.json()
      setBlogsData(result.blogsData) // 데이터를 설정
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch blogs data:', error)
    } finally {
      setIsLoading(false) // 로딩 해제
    }
  }, [])

  const handleDeleteBlog = useCallback(
    async (blogId: string) => {
      if (!user) return

      try {
        await deleteBlog({userId: user.id, blogId, role: user.role})
        setBlogsData(prevData => prevData.filter(blog => blog.id !== blogId))
        setBlogId(null)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to delete blog:', error)
      }
    },
    [user],
  )

  useEffect(() => {
    fetchBlogsData()
  }, [fetchBlogsData])

  return (
    <>
      <Page
        blogsData={blogsData}
        isLoading={isLoading}
        blogId={blogId}
        onChangeBlogId={handleChangeBlogId}
        onDeleteBlog={handleDeleteBlog}
        refetchBlogs={fetchBlogsData}
      />
    </>
  )
}

export default BlogDashBoardPage
