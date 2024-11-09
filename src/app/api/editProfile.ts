import {mockProfiles} from '@/mock/mockData'

export async function editProfile({
  id,
  mainTitle,
  subTitle,
  role,
  skills,
  tools,
}: {
  id: string
  mainTitle: string
  subTitle: string
  role: string
  skills: string[]
  tools: string[]
}) {
  const profile = mockProfiles.find(profile => profile.id === id)
  if (profile) {
    profile.mainTitle = mainTitle
    profile.subTitle = subTitle
    profile.role = role
    profile.skills = skills
    profile.tools = tools
    return profile
  }
  return null
}
