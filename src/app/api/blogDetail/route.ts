import {mockBlogs} from '@/mock/mockData'

export async function GET(req: Request) {
  // URL에서 쿼리 파라미터 추출
  const url = new URL(req.url)
  const id = url.searchParams.get('id') // 쿼리 파라미터 'id' 추출

  if (!id) {
    return new Response('ID parameter is missing', {status: 400})
  }

  // 특정 mock 데이터 찾기
  const blogDetail = mockBlogs.find(blog => blog.id === id)

  if (!blogDetail) {
    return new Response('Blog not found', {status: 404})
  }

  return new Response(JSON.stringify(blogDetail), {status: 200})
}
