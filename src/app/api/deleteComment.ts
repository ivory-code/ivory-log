import {mockComments} from '@/mock/mockData'

export async function deleteComment({commentId}: {commentId: string}) {
  const index = mockComments.findIndex(comment => comment.id === commentId)
  if (index !== -1) {
    return mockComments.splice(index, 1)[0]
  }
  return null
}
