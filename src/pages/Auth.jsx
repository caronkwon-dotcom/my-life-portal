import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLogin = mode === 'login'

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
    } else if (!isLogin) {
      setMessage('회원가입이 완료되었습니다. 이메일 확인이 필요한 경우 메일을 확인해주세요.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="portal-shell auth-shell">
      <section className="portal-card auth-card">
        <p className="placeholder-badge">Supabase Auth</p>
        <h1 className="auth-title">{isLogin ? '로그인' : '회원가입'}</h1>
        <p className="auth-subtitle">이메일과 비밀번호로 My Life Portal에 접속합니다.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            이메일
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        <button
          type="button"
          className="auth-toggle"
          onClick={() => {
            setMode(isLogin ? 'signup' : 'login')
            setMessage('')
          }}
        >
          {isLogin ? '계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
        </button>
      </section>
    </div>
  )
}
