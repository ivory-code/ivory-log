import {NextResponse} from 'next/server'

import {mockFavorites} from '@/shared/mock/mockData'

export const runtime = 'edge'

// GET 요청 처리 - 모든 즐겨찾기 반환
export async function GET() {
  try {
    return NextResponse.json({favoritesData: mockFavorites}, {status: 200})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching favorites:', error)
    return NextResponse.json({error: 'Error fetching favorites'}, {status: 500})
  }
}

// POST 요청 처리 - 즐겨찾기 추가
export async function POST(req: Request) {
  try {
    const {postId, postTitle, userId} = await req.json() // 데이터 추출
    const newFavorite = {
      id: `${mockFavorites.length + 1}`,
      post_id: postId,
      post_title: postTitle,
      user_id: userId,
      created_at: new Date().toISOString(),
    }
    mockFavorites.push(newFavorite)
    return NextResponse.json(newFavorite, {status: 201})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding favorite:', error)
    return NextResponse.json({error: 'Error adding favorite'}, {status: 500})
  }
}

// DELETE 요청 처리 - 즐겨찾기 삭제
export async function DELETE(req: Request) {
  try {
    const {favoriteId} = await req.json() // DELETE 요청에서 favoriteId 가져오기

    if (!favoriteId) {
      return NextResponse.json({error: 'favoriteId is required'}, {status: 400})
    }

    // favoriteId로 해당 즐겨찾기 항목을 찾아 삭제
    const favoriteIndex = mockFavorites.findIndex(
      favorite => favorite.id === favoriteId,
    )

    if (favoriteIndex === -1) {
      return NextResponse.json({error: 'Favorite not found'}, {status: 404})
    }

    // mockFavorites 배열에서 해당 아이템 제거
    mockFavorites.splice(favoriteIndex, 1)

    return NextResponse.json(
      {message: 'Favorite deleted successfully'},
      {status: 200},
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting favorite:', error)
    return NextResponse.json({error: 'Error deleting favorite'}, {status: 500})
  }
}
