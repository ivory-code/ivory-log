import {createBrowserClient} from '@/supabase/client'

export async function addFavorite({
  userId,
  blogId,
  blogTitle,
}: {
  userId: string
  blogId: string
  blogTitle: string
}) {
  const supabase = createBrowserClient()

  try {
    const {error} = await supabase.from('favorites').insert({
      user_id: userId,
      post_id: blogId,
      post_title: blogTitle,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return null
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
