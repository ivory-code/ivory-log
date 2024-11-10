'use client'

import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'

import BlogList from '@/features/blog/components/BlogList'
import FavoritePageSkeleton from '@/pages/FavoritePage/ui/FavoritePageSkeleton'
import Typography from '@/shared/components/Typography'
import {type FavoriteData} from '@/shared/types'
import {useUser} from '@/store/user'
import Layout from '@/widgets/Layout/components'

interface Props {
  isLoading: boolean
  favoritesData: FavoriteData[]
}

const Page = ({isLoading, favoritesData}: Props) => {
  const router = useRouter()

  const handleRouter = useCallback(
    (id: string) => {
      router.push(`/blogDetail/${id}`)
    },
    [router],
  )

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
        {isLoading && !favoritesData.length ? (
          Array.from({length: 5}).map((_, index) => (
            <FavoritePageSkeleton key={`${index}`} />
          ))
        ) : favoritesData.length > 0 ? (
          favoritesData.map((data, index) => (
            <div
              key={`${data.id}-${index}`}
              className="flex justify-center items-center">
              <BlogList
                onClick={() => handleRouter(data.post_id)}
                title={data.post_title}
              />
            </div>
          ))
        ) : (
          <Typography text="No favorites found." />
        )}
      </div>
    </Layout>
  )
}

const FavoritePage = () => {
  const user = useUser(state => state.user)
  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([]) // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(false)

  const loadFavorites = useCallback(async () => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      // 서버에서 모든 데이터를 가져오기
      const response = await fetch(`/api/favorite`) // 변경된 부분: userId를 쿼리에서 제거
      const data = await response.json()

      if (data.favoritesData) {
        // 필터링: 현재 로그인된 유저의 favorites만 필터링하여 보여줌
        const filteredFavorites = data.favoritesData.filter(
          (favorite: FavoriteData) => favorite.user_id === user.id,
        )
        setFavoritesData(filteredFavorites)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      loadFavorites()
    }
  }, [loadFavorites, user?.id])

  return <Page isLoading={isLoading} favoritesData={favoritesData} />
}

export default FavoritePage
