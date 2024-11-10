// /app/api/addFavorite.ts
import {mockFavorites} from '@/shared/mock/mockData'

export async function addFavorite({
  postId,
  postTitle,
  userId,
}: {
  postId: string
  postTitle: string
  userId: string
}) {
  const newFavorite = {
    id: `${mockFavorites.length + 1}`, // 새로 추가되는 즐겨찾기의 ID
    post_id: postId,
    post_title: postTitle,
    user_id: userId,
    created_at: new Date().toISOString(),
  }
  mockFavorites.push(newFavorite)
  return newFavorite
}
