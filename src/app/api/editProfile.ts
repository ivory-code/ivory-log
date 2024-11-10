import {mockProfiles} from '@/shared/mock/mockData'

export async function editProfile({
  contents,
  imageUrl,
  mainTitle,
  subTitle,
  role,
  skills,
  tools,
}: {
  contents: string
  imageUrl: string
  mainTitle: string
  subTitle: string
  role: string
  skills: {
    name: string
    bg: string
  }[]
  tools: {
    name: string
    bg: string
  }[]
}) {
  const profile = mockProfiles[0]

  profile.contents = contents
  profile.imageUrl = imageUrl
  profile.mainTitle = mainTitle
  profile.subTitle = subTitle
  profile.role = role
  profile.skills = skills
  profile.tools = tools

  return profile
}
