import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    const {data: profileData, error} = await supabase
      .from('profile')
      .select('*')

    if (error) {
      return NextResponse.json({error}, {status: 500})
    }

    return NextResponse.json({profileData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
