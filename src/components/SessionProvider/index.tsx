'use client'

import {useEffect, type ReactNode} from 'react'

import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

interface Props {
  children: ReactNode
}

const supabase = createBrowserClient()

export default function SessionProvider({children}: Props) {
  const setUser = useUser(state => state.setUser)

  useEffect(() => {
    const readSession = async () => {
      try {
        const {data: userSession} = await supabase.auth.getSession()

        if (userSession.session) {
          const {data} = await supabase
            .from('users')
            .select('*')
            .eq('id', userSession.session.user.id)
            .single()

          setUser({
            ...data,
            id: data?.id ?? '',
            role: data?.role ?? '',
            email: data?.email ?? '',
            created_at: data?.created_at ?? new Date().toISOString(),
            nickname: data?.username ?? '',
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading session:', error)
      }
    }

    readSession()
  }, [setUser])

  return <>{children}</>
}
