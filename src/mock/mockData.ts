export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[]

// Comments 데이터 타입
export interface CommentData {
  content: string
  created_at: string
  id: string
  post_id: string | null
  updated_at: string | null
  user_id: string | null
  user_role: string
  username: string
}

// Favorites 데이터 타입
export interface FavoriteData {
  id: string
  post_id: string
  post_title: string
  user_id: string
  created_at: string
}

// Posts (Blogs) 데이터 타입
export interface BlogData {
  author_id: string | null
  content: string
  created_at: string
  id: string
  published: boolean | null
  title: string
  titleImageUrl: string
  updated_at: string | null
}

// Profiles 데이터 타입
export interface ProfileData {
  contents: string
  id: string
  imageUrl: string | null
  mainTitle: string
  role: string
  skills: Json[] | null
  subTitle: string
  tools: Json[] | null
}

// Users 데이터 타입
export interface UserData {
  created_at: string
  email: string
  id: string
  role: string
  username: string
}

// comments 데이터 예시
export const mockComments: CommentData[] = [
  {
    content: 'This is a mock comment.',
    created_at: new Date().toISOString(),
    id: '1',
    post_id: '101',
    updated_at: new Date().toISOString(),
    user_id: '1',
    user_role: 'user',
    username: 'mockuser1',
  },
  {
    content: 'Another mock comment.',
    created_at: new Date().toISOString(),
    id: '2',
    post_id: '102',
    updated_at: new Date().toISOString(),
    user_id: '2',
    user_role: 'admin',
    username: 'mockuser2',
  },
]

// favorites 데이터 예시
export const mockFavorites: FavoriteData[] = [
  {
    created_at: new Date().toISOString(),
    id: '1',
    post_id: '101',
    post_title: 'Mock Post 1',
    user_id: '1',
  },
  {
    created_at: new Date().toISOString(),
    id: '2',
    post_id: '102',
    post_title: 'Mock Post 2',
    user_id: '2',
  },
]

// posts 데이터 예시
export const mockBlogs: BlogData[] = [
  {
    author_id: '1',
    content: 'This is the content of mock post 1.',
    created_at: new Date().toISOString(),
    id: '101',
    published: true,
    title: 'Mock Post 1',
    titleImageUrl:
      'https://i.namu.wiki/i/9n2qm-_o7OVQDujnmphfhgbqRKAV6Ku2bIzbWZV7CAuyxzNhIcLpNSg5hAk4Y2keoLluWLkz-anT1mYK9k5lOw.webp',
    updated_at: new Date().toISOString(),
  },
  {
    author_id: '2',
    content: 'This is the content of mock post 2.',
    created_at: new Date().toISOString(),
    id: '102',
    published: false,
    title: 'Mock Post 2',
    titleImageUrl:
      'https://i.namu.wiki/i/9n2qm-_o7OVQDujnmphfhgbqRKAV6Ku2bIzbWZV7CAuyxzNhIcLpNSg5hAk4Y2keoLluWLkz-anT1mYK9k5lOw.webp',
    updated_at: new Date().toISOString(),
  },
]

// profile 데이터 예시
export const mockProfiles: ProfileData[] = [
  {
    contents:
      '새로 경험한 일들을 상대와 공감하고 공유하는 것을 좋아하며, 표현하는 것을 좋아합니다.\n\n경험을 통한 과정으로 사용자들에 대한 공감과 소통의 중요성이 증대되는 시대에서, 모두가 공감할 수 있는 UI/UX를 고민하고 서비스를 개발하기 위해 끊임없이 노력하는 FrontEnd 개발자입니다.\n\n사용자들의 경험을 듣고, 코드로 공감시킬 수 있는 서비스를 개발하고 싶습니다.',
    id: '1',
    imageUrl:
      'https://i.namu.wiki/i/9n2qm-_o7OVQDujnmphfhgbqRKAV6Ku2bIzbWZV7CAuyxzNhIcLpNSg5hAk4Y2keoLluWLkz-anT1mYK9k5lOw.webp',
    mainTitle: '안녕하세요!! 반갑습니다! 👋🏻',
    role: 'admin',
    skills: [
      {
        bg: 'bg-accent-6',
        name: 'javascript',
      },
      {
        bg: 'bg-accent-7',
        name: 'react',
      },
      {
        bg: 'bg-n-2',
        name: 'nextjs',
      },
      {
        bg: 'bg-accent-8',
        name: 'graphql',
      },
    ],
    subTitle: 'ivory-code, Frontend-Developer 💻',
    tools: [
      {
        bg: 'bg-n-2',
        name: 'github',
      },
      {
        bg: 'bg-accent-9',
        name: 'googleAnalytics',
      },
      {
        bg: 'bg-accent-10',
        name: 'firebase',
      },
      {
        bg: 'bg-accent-11',
        name: 'figma',
      },
    ],
  },
]

// users 데이터 예시
export const mockUsers: UserData[] = [
  {
    created_at: new Date().toISOString(),
    email: 'kyo3553@gmail.com',
    id: '1',
    role: 'admin',
    username: 'ivory-code',
  },
]
