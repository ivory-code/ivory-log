import {mockProfiles} from '@/shared/mock/mockData'

export async function createProfile({
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
  const newProfile = {
    mainTitle,
    subTitle,
    role,
    contents,
    imageUrl,
    skills,
    tools,
  }
  mockProfiles.push(newProfile)
  return newProfile
}
