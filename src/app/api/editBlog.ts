import {createBrowserClient} from '@/supabase/client'

export async function editBlog({
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
    // 블로그 글 수정
    const {data, error} = await supabase
      .from('posts')
      .update({
        title,
        content,
        titleImageUrl: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id) // 여기서 id를 사용하여 정확한 포스트를 선택
      .select('*')

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating blog:', error)
      return null
    }

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Unexpected error:', error)
  }
}
