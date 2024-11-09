import {mockBlogs} from '@/mock/mockData'

export async function GET() {
  // 블로그 관리 대시보드에 필요한 데이터를 mock 데이터로 반환
  return new Response(JSON.stringify(mockBlogs), {status: 200})
}

export async function DELETE(req: Request) {
  const {id} = await req.json()

  const blogIndex = mockBlogs.findIndex(blog => blog.id === id)
  if (blogIndex === -1) {
    return new Response('Blog not found', {status: 404})
  }

  // mock 데이터에서 해당 블로그 삭제
  mockBlogs.splice(blogIndex, 1)
  return new Response(JSON.stringify({message: 'Blog deleted'}), {status: 200})
}
