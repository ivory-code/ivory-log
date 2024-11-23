import {createBrowserClient} from '@/supabase/client'

export async function createProfile({
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
      .insert({role, contents, mainTitle, subTitle, skills, tools, imageUrl})

    if (error) {
      return null
    }

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
