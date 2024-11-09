import {mockBlogs} from '@/mock/mockData'

export async function GET() {
  return new Response(JSON.stringify(mockBlogs), {status: 200})
}

export async function POST(req: Request) {
  const newBlog = await req.json()

  mockBlogs.push({id: `${mockBlogs.length + 1}`, ...newBlog})

  return new Response(JSON.stringify(newBlog), {status: 201})
}
