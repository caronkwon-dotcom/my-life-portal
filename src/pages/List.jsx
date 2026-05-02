import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function List({ go, select }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('book_reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      alert(error.message)
      return
    }

    setReviews(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>독서리뷰 목록</h2>

      {reviews.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            padding: 12,
            marginBottom: 10,
            borderRadius: 8
          }}
          onClick={() => {
            select(item)
            go('detail')
          }}
        >
          <b>{item.book_title}</b>
          <div style={{ fontSize: 12 }}>{item.created_at}</div>
        </div>
      ))}

      <button onClick={() => go('home')}>메인으로</button>
    </div>
  )
}