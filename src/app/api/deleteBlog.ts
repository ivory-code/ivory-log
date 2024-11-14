import {createBrowserClient} from '@/supabase/client'

export async function deleteBlog({
  userId,
  blogId,
  role,
}: {
  userId: string
  blogId: string
  role: string
}) {
  const supabase = createBrowserClient()

  try {
    const query =
      role === 'admin'
        ? supabase.from('posts').delete().eq('id', blogId)
        : supabase
            .from('comments')
            .delete()
            .eq('user_id', userId)
            .eq('user_role', role)

    const {data, error} = await query

    if (error) {
      return null
    }

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return null
  }
}
