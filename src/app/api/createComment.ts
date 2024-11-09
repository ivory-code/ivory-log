import {mockComments} from '@/mock/mockData'

export async function createComment({
  content,
  postId,
  userId,
  username,
}: {
  content: string
  postId: string
  userId: string
  username: string
}) {
  const newComment = {
    id: `${mockComments.length + 1}`,
    content,
    post_id: postId,
    user_id: userId,
    username,
    user_role: 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockComments.push(newComment)
  return newComment
}
