import {mockFavorites} from '@/shared/mock/mockData'

// DELETE 요청 처리 - 즐겨찾기 삭제
export async function deleteFavorite({
  postId,
  userId,
}: {
  postId: string
  userId: string
}) {
  // postId, userId 검증
  if (!postId || !userId) {
    throw new Error('postId and userId are required')
  }

  // mockFavorites 배열에서 해당 postId와 userId를 가진 항목을 찾음
  const index = mockFavorites.findIndex(
    favorite => favorite.post_id === postId && favorite.user_id === userId,
  )

  // 해당 항목이 존재하면 삭제
  if (index !== -1) {
    const deletedFavorite = mockFavorites.splice(index, 1)[0]
    return deletedFavorite // 삭제된 항목 반환
  }

  // 항목이 없으면 null 반환
  return null
}
