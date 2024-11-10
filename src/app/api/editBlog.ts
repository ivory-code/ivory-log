import {mockBlogs} from '@/shared/mock/mockData'

export async function editBlog({
  blogId,
  title,
  content,
}: {
  blogId: string
  title: string
  content: string
}) {
  const blog = mockBlogs.find(blog => blog.id === blogId)
  if (blog) {
    blog.title = title
    blog.content = content
    blog.updated_at = new Date().toISOString()
    return blog
  }
  return null
}
