import {mockFavorites} from '@/mock/mockData'

export async function deleteFavorite({favoriteId}: {favoriteId: string}) {
  const index = mockFavorites.findIndex(favorite => favorite.id === favoriteId)
  if (index !== -1) {
    return mockFavorites.splice(index, 1)[0]
  }
  return null
}
