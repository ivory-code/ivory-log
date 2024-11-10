import {mockBlogs} from '@/shared/mock/mockData'

export async function deleteBlog({blogId}: {blogId: string}) {
  const index = mockBlogs.findIndex(blog => blog.id === blogId)
  if (index !== -1) {
    return mockBlogs.splice(index, 1)[0]
  }
  return null
}
