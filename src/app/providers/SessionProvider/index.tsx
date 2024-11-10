'use client'

import {useEffect, type ReactNode} from 'react'

import {mockUsers} from '@/shared/mock/mockData' // mockData에서 mockUsers를 import
import {useUser} from '@/store/user'

interface Props {
  children: ReactNode
}

export default function SessionProvider({children}: Props) {
  const setUser = useUser(state => state.setUser)

  useEffect(() => {
    const readSession = async () => {
      try {
        // mockUsers에서 첫 번째 유저 데이터를 사용
        const mockUser = mockUsers[0] // 예시로 첫 번째 유저를 사용

        setUser({
          id: mockUser.id,
          role: mockUser.role,
          email: mockUser.email,
          created_at: mockUser.created_at,
          nickname: mockUser.username,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading session:', error)
      }
    }

    readSession()
  }, [setUser])

  return <>{children}</>
}
