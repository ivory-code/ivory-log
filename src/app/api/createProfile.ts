import {mockProfiles} from '@/mock/mockData'

export async function createProfile({
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
  const newProfile = {
    id,
    mainTitle,
    subTitle,
    role,
    contents: 'This is a mock profile content',
    imageUrl: '/images/profile.jpg',
    skills,
    tools,
  }
  mockProfiles.push(newProfile)
  return newProfile
}
