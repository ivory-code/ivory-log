import {mockBlogs} from '@/shared/mock/mockData'

export async function createBlog({
  authorId,
  title,
  content,
  imageUrl,
}: {
  authorId: string
  title: string
  content: string
  imageUrl: string
}) {
  const newBlog = {
    id: `${mockBlogs.length + 1}`,
    title,
    content,
    author_id: authorId,
    titleImageUrl: imageUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: true,
  }
  mockBlogs.push(newBlog)
  return newBlog
}
