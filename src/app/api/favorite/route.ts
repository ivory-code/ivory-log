import {mockFavorites} from '@/mock/mockData'

export async function GET() {
  return new Response(JSON.stringify(mockFavorites), {status: 200})
}
