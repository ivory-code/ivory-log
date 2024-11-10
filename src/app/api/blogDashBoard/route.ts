import {NextResponse} from 'next/server'

import {mockBlogs} from '@/shared/mock/mockData'

export const runtime = 'edge'

export async function GET() {
  try {
    // mockBlogs에서 모든 데이터를 반환
    return NextResponse.json({blogsData: mockBlogs}, {status: 200})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching blog data:', error)
    return NextResponse.json({error: 'Error fetching blog data'}, {status: 500})
  }
}

// DELETE 요청 처리 - 블로그 삭제
export async function DELETE(req: Request) {
  try {
    const {id} = await req.json() // 삭제할 블로그의 ID

    // mockBlogs에서 해당 블로그 찾기
    const blogIndex = mockBlogs.findIndex(blog => blog.id === id)
    if (blogIndex === -1) {
      return NextResponse.json({error: 'Blog not found'}, {status: 404})
    }

    // mock 데이터에서 해당 블로그 삭제
    mockBlogs.splice(blogIndex, 1)

    return NextResponse.json({message: 'Blog deleted'}, {status: 200})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting blog:', error)
    return NextResponse.json({error: 'Error deleting blog'}, {status: 500})
  }
}
