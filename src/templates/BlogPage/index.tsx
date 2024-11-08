// BlogPage.tsx
'use client'

import React, {useEffect, useState, useRef, useCallback} from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'
import BlogPageSkeleton from '@/templates/BlogPage/BlogPageSkeleton'

export type BlogData = Database['public']['Tables']['posts']['Row']

const INITIAL_PAGE_COUNT = 6 // 처음에 불러올 데이터 수
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
        {isLoading && !blogsData.length // 로딩 중이며 초기 데이터가 없는 경우
          ? Array.from({length: INITIAL_PAGE_COUNT}).map((_, index) => (
              <BlogPageSkeleton key={index} />
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
      <div ref={observerRef} className="h-10" /> {/* 감지할 빈 요소 */}
    </Layout>
  )
}

const BlogPage = () => {
  const [blogsData, setBlogsData] = useState<BlogData[]>([])
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터가 있는지 여부
  const [page, setPage] = useState(1) // 페이지 번호
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태

  // 중복 데이터 필터링 함수
  const filterDuplicateBlogs = (
    newBlogs: BlogData[],
    existingBlogs: BlogData[],
  ) => {
    return newBlogs.filter(
      blog => !existingBlogs.some(existingBlog => existingBlog.id === blog.id),
    )
  }

  // 데이터 로딩 함수 (초기 로딩 및 추가 로딩)
  const fetchBlogs = useCallback(async (from: number, to: number) => {
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

  // 초기 데이터를 불러오는 함수
  const loadInitialBlogs = useCallback(async () => {
    const initialData = await fetchBlogs(0, INITIAL_PAGE_COUNT - 1)
    setBlogsData(initialData)
    if (initialData.length < INITIAL_PAGE_COUNT) {
      setHasMore(false)
    }
  }, [fetchBlogs])

  // 추가 데이터를 불러오는 함수
  const loadMoreBlogs = useCallback(async () => {
    if (isLoading || !hasMore) return // 이미 로딩 중이거나 더 이상 데이터가 없으면 중단

    const from = page * LOAD_MORE_COUNT
    const to = from + LOAD_MORE_COUNT - 1
    const moreData = await fetchBlogs(from, to)

    if (moreData.length > 0) {
      const filteredBlogs = filterDuplicateBlogs(moreData, blogsData)
      setBlogsData(prevBlogs => [...prevBlogs, ...filteredBlogs])
      setPage(prevPage => prevPage + 1)
    } else {
      setHasMore(false)
    }
  }, [fetchBlogs, hasMore, isLoading, page, blogsData])

  // 초기 데이터 로드
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
