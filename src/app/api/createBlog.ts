import {createBrowserClient} from '@/supabase/client'

export async function createBlog({
  id,
  title,
  imageUrl,
  content,
}: {
  id: string
  title: string
  imageUrl: string
  content: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('posts').insert({
      author_id: id,
      title,
      content,
      created_at: new Date().toISOString(),
      published: true,
      titleImageUrl: imageUrl,
    })

    if (error) {
      return null
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
