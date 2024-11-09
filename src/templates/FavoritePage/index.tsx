// FavoritePage.tsx
'use client'

import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'

import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'
import {mockFavorites} from '@/mock/mockData' // mock data import
import {useUser} from '@/store/user'
import FavoritePageSkeleton from '@/templates/FavoritePage/FavoritePageSkeleton'

export type FavoriteData = {
  id: string
  post_id: string
  post_title: string
  user_id: string
  created_at: string
}

interface Props {
  favoritesData: FavoriteData[]
  isLoading: boolean
}

const Page = ({favoritesData, isLoading}: Props) => {
  const router = useRouter()

  const handleRouter = useCallback(
    (id: string) => {
      router.push(`/blogDetail/${id}`)
    },
    [router],
  )

  return (
    <div>
      <Layout>
        {isLoading ? (
          Array.from({length: 5}).map((_, index) => (
            <FavoritePageSkeleton key={index} />
          ))
        ) : favoritesData.length > 0 ? (
          favoritesData.map(data => (
            <div key={data.id} className="flex justify-center items-center">
              <BlogList
                onClick={() => handleRouter(data.post_id ?? '')}
                title={data.post_title ?? ''}
              />
            </div>
          ))
        ) : (
          <Typography text="No favorites found." />
        )}
      </Layout>
    </div>
  )
}

const FavoritePage = () => {
  const user = useUser(state => state.user)

  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFavoritesData = useCallback(async () => {
    if (user?.id) {
      // Replace API call with mock data
      const data = mockFavorites.filter(
        favorite => favorite.user_id === user.id,
      )
      setFavoritesData(data)
    }
    setIsLoading(false)
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      void fetchFavoritesData()
    }
  }, [fetchFavoritesData, user?.id])

  return <Page isLoading={isLoading} favoritesData={favoritesData} />
}

export default FavoritePage
