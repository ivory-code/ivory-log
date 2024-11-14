'use client'

import React, {useCallback, useEffect, useState, useRef} from 'react'

import BlogCard from '@/features/blog/components/BlogCard'
import BlogPageSkeleton from '@/pages/BlogPage/ui/BlogPageSkeleton'
import {type BlogData} from '@/shared/types'
import {createBrowserClient} from '@/supabase/client'
import Layout from '@/widgets/Layout/components'

const INITIAL_PAGE_COUNT = 2 // 처음에 불러올 데이터 수
const LOAD_MORE_COUNT = 2 // 추가로 불러올 데이터 수

const supabase = createBrowserClient()

interface Props {
  isLoading: boolean
  hasMore: boolean
  blogsData: BlogData[]
  loadMoreBlogs: () => Promise<void>
}

const Page = ({isLoading, hasMore, blogsData, loadMoreBlogs}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null) // Observer 감지용 Ref

  // Intersection Observer로 감지하여 추가 데이터 로드
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreBlogs()
        }
      },
      {threshold: 0.5}, // 요소가 50% 화면에 보일 때 트리거
    )

    const currentObserverRef = observerRef.current // 현재 observerRef 값을 변수에 저장

    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    // cleanup 함수에서 안전하게 observer 해제
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef) // cleanup 시점에서 observer 해제
      }
    }
  }, [loadMoreBlogs, hasMore, isLoading])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
        {isLoading && !blogsData.length
          ? Array.from({length: INITIAL_PAGE_COUNT}).map((_, index) => (
              <BlogPageSkeleton key={`${index}`} />
            ))
          : blogsData.map((data, index) => (
              <BlogCard
                key={`${data.id}-${index}`}
                id={data.id}
                title={data.title}
                imageUrl={data.titleImageUrl}
                content={data.content}
              />
            ))}
      </div>
      {hasMore && <div ref={observerRef} className="h-10" />}{' '}
    </Layout>
  )
}

const BlogPage = () => {
  const [blogsData, setBlogsData] = useState<BlogData[]>([]) // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터가 있는지 여부
  const [page, setPage] = useState(1)

  const loadBlogs = useCallback(async (from: number, to: number) => {
    setIsLoading(true)
    try {
      const res = await supabase
        .from('posts')
        .select('*')
        .order('created_at', {ascending: false})
        .range(from, to)

      return res.data || []
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching blogs:', error)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadInitialBlogs = useCallback(async () => {
    const initialData = await loadBlogs(0, INITIAL_PAGE_COUNT - 1)
    setBlogsData(initialData)
    if (initialData.length < INITIAL_PAGE_COUNT) {
      setHasMore(false)
    }
  }, [loadBlogs])

  const loadMoreBlogs = useCallback(async () => {
    if (isLoading || !hasMore) return

    const from = page * LOAD_MORE_COUNT
    const to = from + LOAD_MORE_COUNT - 1
    const moreData = await loadBlogs(from, to)

    if (moreData.length > 0) {
      setBlogsData(prevBlogs => [...prevBlogs, ...moreData])
      setPage(prevPage => prevPage + 1)
    } else {
      setHasMore(false)
    }
  }, [isLoading, hasMore, page, loadBlogs])

  useEffect(() => {
    loadInitialBlogs()
  }, [loadInitialBlogs])

  return (
    <Page
      isLoading={isLoading}
      hasMore={hasMore}
      blogsData={blogsData}
      loadMoreBlogs={loadMoreBlogs}
    />
  )
}

export default BlogPage
