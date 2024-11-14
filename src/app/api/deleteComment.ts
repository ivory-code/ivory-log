import {createBrowserClient} from '@/supabase/client'

export async function deleteComment({
  userId,
  commentId,
  role,
}: {
  userId: string
  commentId: string
  role?: string
}) {
  const supabase = createBrowserClient()

  try {
    const query =
      role === 'admin'
        ? supabase.from('comments').delete().eq('id', commentId)
        : supabase
            .from('comments')
            .delete()
            .eq('user_id', userId)
            .eq('id', commentId)

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
