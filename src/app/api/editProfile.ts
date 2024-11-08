import {createBrowserClient} from '@/supabase/client'

export async function editProfile({
  role,
  contents,
  mainTitle,
  subTitle,
  skills,
  tools,
  imageUrl,
}: {
  role: string
  contents: string
  mainTitle: string
  subTitle: string
  skills: {
    name: string
    bg: string
  }[]
  tools: {
    name: string
    bg: string
  }[]
  imageUrl: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('profile')
      .update({role, contents, mainTitle, subTitle, skills, tools, imageUrl})
      .eq('role', role)
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
