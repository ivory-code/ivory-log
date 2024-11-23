import {type NextRequest, NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const supabase = createBrowserClient()
  const {searchParams} = new URL(req.url)
  const blogId = searchParams.get('id')

  if (!blogId) {
    return NextResponse.json({error: 'Blog ID is required'}, {status: 400})
  }

  try {
    const {data: postData, error: postError} = await supabase
      .from('posts')
      .select('*')
      .eq('id', blogId)
      .single()

    const {data: commentsData, error: commentsError} = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', blogId)

    if (postError || commentsError) {
      const errorMessage = postError?.message || commentsError?.message
      return NextResponse.json({error: errorMessage}, {status: 500})
    }

    return NextResponse.json({post: postData, comments: commentsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
