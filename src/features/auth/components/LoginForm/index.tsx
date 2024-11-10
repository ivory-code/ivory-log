import {type FormEvent} from 'react'

import Button from '@/shared/components/Button'
import Profile from '@/shared/components/Profile'
import Typography from '@/shared/components/Typography'
import {mockUsers} from '@/shared/mock/mockData' // mockData에서 mockUsers를 import
import {useUser} from '@/store/user'

interface Props {
  className?: string
}

const LoginForm = ({className}: Props) => {
  const user = useUser(state => state.user)
  const setUser = useUser(state => state.setUser)

  const isLogin = user !== null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (isLogin) {
      // 로그아웃 처리
      setUser(null)
    } else {
      // mockUser 데이터 사용하여 로그인 처리
      const mockUser = mockUsers[0] // 예시로 첫 번째 mockUser를 사용
      setUser({
        id: mockUser.id,
        role: mockUser.role,
        email: mockUser.email,
        created_at: mockUser.created_at,
        nickname: mockUser.username,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Profile
        position="right"
        isLogin={isLogin}
        nickname={user?.nickname || ''}
      />
      <Button type="submit">
        <Typography text={isLogin ? 'Logout' : 'Login'} className="base2" />
      </Button>
    </form>
  )
}

export default LoginForm
