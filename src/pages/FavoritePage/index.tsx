'use client'

import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'

import {getBlogsFavorites} from '@/app/api/getFavorite'
import BlogList from '@/features/blog/components/BlogList'
import FavoritePageSkeleton from '@/pages/FavoritePage/ui/FavoritePageSkeleton'
import Typography from '@/shared/components/Typography'
import {type FavoriteData} from '@/shared/types'
import {useUser} from '@/store/user'
import Layout from '@/widgets/Layout/components'

interface Props {
  favoritesData: FavoriteData[] | null // null이면 로딩 중
}

const Page = ({favoritesData}: Props) => {
  const router = useRouter()

  const handleRouter = useCallback(
    (id: string) => {
      router.push(`/blogDetail/${id}`)
    },
    [router],
  )

  const renderContent = () => {
    if (favoritesData === null) {
      // 데이터 로딩 중
      return Array.from({length: 5}).map((_, index) => (
        <FavoritePageSkeleton key={index} />
      ))
    }

    if (favoritesData.length === 0) {
      // 데이터는 있지만 비어 있음
      return (
        <Typography
          text="즐겨찾는 게시글이 없습니다."
          className="text-center"
        />
      )
    }

    // 데이터가 존재
    return favoritesData.map((data, index) => (
      <div
        key={`${data.id}-${index}`}
        className="flex justify-center items-center">
        <BlogList
          onClick={() => handleRouter(data?.post_id ?? '')}
          title={data?.post_title ?? ''}
        />
      </div>
    ))
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
        {renderContent()}
      </div>
    </Layout>
  )
}

const FavoritePage = () => {
  const user = useUser(state => state.user)
  const [favoritesData, setFavoritesData] = useState<FavoriteData[] | null>(
    null,
  )

  const loadFavorites = useCallback(async () => {
    if (!user?.id) return

    try {
      // 서버에서 즐겨찾기 데이터 가져오기
      const data = await getBlogsFavorites({userId: user.id})
      setFavoritesData(data ?? [])
    } catch (error) {
      setFavoritesData([]) // 오류 시 빈 배열로 초기화
      // eslint-disable-next-line no-console
      console.error('Error fetching favorites:', error)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      loadFavorites()
    }
  }, [loadFavorites, user?.id])

  return <Page favoritesData={favoritesData} />
}

export default FavoritePage
