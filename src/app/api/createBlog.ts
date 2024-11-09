import {mockBlogs} from '@/mock/mockData'

export async function createBlog({
  title,
  content,
  authorId,
}: {
  title: string
  content: string
  authorId: string
}) {
  const newBlog = {
    id: `${mockBlogs.length + 1}`,
    title,
    content,
    author_id: authorId,
    titleImageUrl: '/images/default.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: true,
  }
  mockBlogs.push(newBlog)
  return newBlog
}
