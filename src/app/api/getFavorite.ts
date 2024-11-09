import {mockFavorites} from '@/mock/mockData'

export async function getFavorite({userId}: {userId: string}) {
  return mockFavorites.filter(favorite => favorite.user_id === userId)
}
