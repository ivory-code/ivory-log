import {createBrowserClient} from '@/supabase/client'

export async function createComment({
  username,
  userId,
  blogId,
  content,
  role,
}: {
  username: string
  userId: string
  blogId: string
  content: string
  role: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('comments')
      .insert([
        {
          username: username,
          user_id: userId,
          post_id: blogId,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_role: role,
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
