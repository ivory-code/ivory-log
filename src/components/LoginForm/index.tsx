import {type FormEvent} from 'react'

import Button from '@/components/Button'
import Profile from '@/components/Profile'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

interface Props {
  className?: string
}

const LoginForm = ({className}: Props) => {
  const user = useUser(state => state.user)
  const setUser = useUser(state => state.setUser)

  const supabase = createBrowserClient()
  const isLogin = user !== null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (isLogin) {
      await supabase.auth.signOut()
      setUser(null)

      return
    }
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {redirectTo: location.origin},
    })
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
