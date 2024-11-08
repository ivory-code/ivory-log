import {create} from 'zustand'

export interface User {
  created_at: string
  email: string
  id: string
  role: string
  nickname: string
}

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUser = create<UserState>()(set => ({
  user: null,
  setUser: (user: User | null) => set(() => ({user})),
}))
