import axios from 'axios'
import {useParams, usePathname} from 'next/navigation'
import {type ReactNode, useCallback, useEffect, useState} from 'react'

import {createComment} from '@/app/api/createComment'
import {deleteComment} from '@/app/api/deleteComment'
import {
  COMMENT_BAR_BREAKPOINT,
  SIDE_BAR_BREAKPOINT,
} from '@/components/Layout/constants'
import LeftNavigationSideBar from '@/components/LeftNavigationSideBar'
import RightCommentBar from '@/components/RightCommentBar'
import {type CommentData} from '@/components/RightCommentBar/CommentBox'
import TopNavigationBar from '@/components/TopNavigationBar'
import {useUser} from '@/store/user'
import {throttle} from '@/utils/throttle'

interface Props {
  children: ReactNode
  isMainView?: boolean
}

const Layout = ({children, isMainView = false}: Props) => {
  const params = useParams()
  const pathname = usePathname()
  const user = useUser(state => state.user)

  const [isLeftSideMiniBarVisible, setIsLeftSideMiniBarVisible] =
    useState(false)
  const [isRightSideBarVisible, setIsRightSideBarVisible] = useState(true)
  const [commentsData, setCommentsData] = useState<CommentData[]>([])
  const [blogCommentData, setBlogCommentData] = useState<CommentData[]>([])

  const isBlogDetailPage = pathname.includes('blog') && params.id !== undefined

  const handleResize = throttle(() => {
    setIsLeftSideMiniBarVisible(window.innerWidth <= SIDE_BAR_BREAKPOINT)
    setIsRightSideBarVisible(window.innerWidth > COMMENT_BAR_BREAKPOINT)
  }, 200)

  const fetchBlogCommentData = useCallback(async () => {
    const res = await axios(`/api/blogDetail?id=${params.id}`)
    setBlogCommentData(res.data.comments)
  }, [params.id])

  const fetchCommentsData = useCallback(async () => {
    const res = await axios(`/api/blog`)
    setCommentsData(res.data.comments)
  }, [])

  const handleCreateComment = useCallback(
    async ({
      username,
      userId,
      content,
    }: {
      username: string
      userId: string
      content: string
    }) => {
      const newComment = await createComment({
        username,
        userId,
        blogId: `${params.id}`,
        content,
        role: user?.role ?? '',
      })

      if (!newComment) {
        return
      }

      if (isBlogDetailPage) {
        setBlogCommentData(prevData => [newComment, ...prevData])
        return
      }
      setCommentsData(prevData => [newComment, ...prevData])
    },
    [isBlogDetailPage, params.id, user?.role],
  )

  const handleDeleteComment = useCallback(
    async ({
      userId,
      commentId,
      role,
    }: {
      userId: string
      commentId: string
      role?: string
    }) => {
      await deleteComment({userId, commentId, role})

      if (isBlogDetailPage) {
        setBlogCommentData(prevData =>
          prevData.filter(comment => comment.id !== commentId),
        )
        return
      }
      setCommentsData(prevData =>
        prevData.filter(comment => comment.id !== commentId),
      )
    },
    [isBlogDetailPage],
  )

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    if (isBlogDetailPage) {
      fetchBlogCommentData()

      return
    }
    fetchCommentsData()
  }, [fetchBlogCommentData, fetchCommentsData, isBlogDetailPage])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 md:overflow-hidden ${
          isLeftSideMiniBarVisible ? 'pl-24 md:pl-0' : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftNavigationSideBar
          user={user}
          isLeftSideBarVisible={isLeftSideMiniBarVisible}
        />
        <TopNavigationBar user={user} />
        <div className="flex py-6 md:py-0 h-screen">
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] ${
              isMainView || !isRightSideBarVisible
                ? 'pr-0'
                : 'pr-[22.5rem] 2xl:pr-80 lg:pr-0'
            }`}>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
              <div className="relative flex flex-col grow max-w-full md:pt-18">
                {children}
              </div>
            </div>
            {isMainView ||
              (isRightSideBarVisible && (
                <RightCommentBar
                  data={isBlogDetailPage ? blogCommentData : commentsData}
                  user={user}
                  className={`${
                    !isLeftSideMiniBarVisible &&
                    'md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0'
                  }`}
                  createComment={handleCreateComment}
                  deleteComment={handleDeleteComment}
                  isBlogDetailPage={isBlogDetailPage}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
