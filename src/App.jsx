import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Write from './pages/Write.jsx'
import List from './pages/List.jsx'
import Detail from './pages/Detail.jsx'
import Fridge from './pages/Fridge.jsx'
import Placeholder from './pages/Placeholder.jsx'
import { supabase } from './supabaseClient'

function App() {
  const [page, setPage] = useState('home')
  const [selected, setSelected] = useState(null)
  const [recentReviews, setRecentReviews] = useState([])

  useEffect(() => {
    fetchRecentReviews()
  }, [])

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

  return (
    <div>
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
