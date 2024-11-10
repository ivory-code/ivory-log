import {mockComments} from '@/shared/mock/mockData'

export async function deleteComment({
  userId,
  commentId,
  role,
}: {
  userId: string
  commentId: string
  role?: string
}) {
  const index = mockComments.findIndex(comment => comment.id === commentId)
  if (index !== -1) {
    return mockComments.splice(index, 1)[0]
  }
  return null
}
