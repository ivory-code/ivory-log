import {createBrowserClient} from '@/supabase/client'

export async function getBlogsFavorites({userId}: {userId: string}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export async function getBlogFavorite({blogId}: {blogId: string}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('favorites')
      .select('*')
      .eq('post_id', blogId)

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
