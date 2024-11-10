import {mockBlogs} from '@/shared/mock/mockData'

export const runtime = 'edge'

export async function GET(req: Request) {
  // URL 파라미터로부터 from과 to를 받아옵니다.
  const url = new URL(req.url)
  const from = parseInt(url.searchParams.get('from') || '0', 10)
  const to = parseInt(url.searchParams.get('to') || '1', 10)

  // 요청 범위에 맞는 데이터 반환
  const data = mockBlogs.slice(from, to + 1)

  return new Response(JSON.stringify({blogData: data}), {status: 200})
}

export async function POST(req: Request) {
  const newBlog = await req.json()
  mockBlogs.push({id: `${mockBlogs.length + 1}`, ...newBlog})
  return new Response(JSON.stringify(newBlog), {status: 201})
}
