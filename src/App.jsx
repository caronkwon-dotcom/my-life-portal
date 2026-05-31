import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Write from './pages/Write.jsx'
import List from './pages/List.jsx'
import Detail from './pages/Detail.jsx'
import Fridge from './pages/Fridge.jsx'
import Placeholder from './pages/Placeholder.jsx'
import Auth from './pages/Auth.jsx'
import { supabase } from './supabaseClient'
import './Auth.css'

function App() {
  const [page, setPage] = useState('home')
  const [selected, setSelected] = useState(null)
  const [recentReviews, setRecentReviews] = useState([])
  const [session, setSession] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsAuthLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setPage('home')
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session) {
      fetchRecentReviews()
    } else {
      setRecentReviews([])
    }
  }, [session])

  async function fetchRecentReviews() {
    const { data } = await supabase
      .from('book_reviews')
      .select('id,book_title,created_at')
      .order('created_at', { ascending: false })
      .limit(3)

    if (data) {
      setRecentReviews(data)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (isAuthLoading) {
    return (
      <div className="portal-shell">
        <section className="portal-card">
          <p className="muted">로그인 상태를 확인하는 중입니다.</p>
        </section>
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div>
      <header className="auth-status">
        <span>로그인 상태: {session.user.email}</span>
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          로그아웃
        </button>
      </header>

      {page === 'home' && <Home go={setPage} recentReviews={recentReviews} />}
      {page === 'write' && <Write go={setPage} />}
      {page === 'list' && <List go={setPage} select={setSelected} />}
      {page === 'detail' && <Detail go={setPage} data={selected} />}
      {page === 'fridge' && <Fridge onHome={() => setPage('home')} />}
      {page === 'workout' && (
        <Placeholder title="운동 기록" description="운동 기록 기능은 현재 준비중입니다." onHome={() => setPage('home')} />
      )}
      {page === 'budget' && (
        <Placeholder title="가계부" description="가계부 기능은 현재 준비중입니다." onHome={() => setPage('home')} />
      )}
      {page === 'stocks' && (
        <Placeholder title="주식 일지" description="주식 일지 기능은 현재 준비중입니다." onHome={() => setPage('home')} />
      )}
      {page === 'settings' && (
        <Placeholder title="설정" description="설정 기능은 현재 준비중입니다." onHome={() => setPage('home')} />
      )}
    </div>
  )
}

export default App
