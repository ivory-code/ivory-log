export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[]

export interface BlogData {
  author_id: string | null
  content: string
  created_at: string
  id: string
  title: string
  titleImageUrl: string
  updated_at: string | null
}

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

export interface FavoriteData {
  id: string
  post_id: string
  post_title: string
  user_id: string
  created_at: string
}

export interface ProfileData {
  contents: string
  imageUrl: string | null
  mainTitle: string
  role: string
  skills: Json[] | null
  subTitle: string
  tools: Json[] | null
}

export interface UserData {
  created_at: string
  email: string
  id: string
  role: string
  username: string
}
