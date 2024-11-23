import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export const runtime = 'edge'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    // comments 데이터를 가져옴
    const {data: commentsData, error: commentsError} = await supabase
      .from('comments')
      .select('*') // 필요 시 제한 조건 추가 가능

    // 오류가 발생하면 오류 메시지와 함께 응답
    if (commentsError) {
      return NextResponse.json({error: commentsError.message}, {status: 500})
    }

    // 성공 시 comments 데이터를 반환
    return NextResponse.json({comments: commentsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching comments data'},
      {status: 500},
    )
  }
}
