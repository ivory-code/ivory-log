import {NextResponse} from 'next/server'

import {mockBlogs} from '@/shared/mock/mockData'

export const runtime = 'edge'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id') // 쿼리 파라미터로 id 추출

  if (!id) {
    return NextResponse.json({error: 'ID parameter is missing'}, {status: 400})
  }

  // mockBlogs에서 해당 id에 맞는 블로그를 찾음
  const blogDetail = mockBlogs.find(blog => blog.id === id)

  if (!blogDetail) {
    return NextResponse.json({error: 'Blog not found'}, {status: 404})
  }

  return NextResponse.json(blogDetail, {status: 200})
}
