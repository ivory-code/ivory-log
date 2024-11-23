import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    const {data: blogsData, error} = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {ascending: false})

    // 오류 발생 시 오류 메시지 응답
    if (error) {
      return NextResponse.json({error: error.message}, {status: 500})
    }

    // 성공 시 blogsData 반환
    return NextResponse.json({blogsData})
  } catch {
    return NextResponse.json({error: 'Error fetching blog data'}, {status: 500})
  }
}
