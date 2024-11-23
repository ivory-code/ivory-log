import {createBrowserClient} from '@/supabase/client'

export async function createComment({
  username,
  userId,
  postId,
  content,
  userRole,
}: {
  username: string
  userId: string
  postId: string
  content: string
  userRole: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('comments')
      .insert([
        {
          username: username,
          user_id: userId,
          post_id: postId,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_role: userRole,
        },
      ])
      .select('*')

    if (error) {
      return null
    }
    return data[0]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
