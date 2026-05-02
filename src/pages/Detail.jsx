import { supabase } from '../supabaseClient'

export default function Detail({ go, data }) {
  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        <p>선택된 리뷰가 없다.</p>
        <button onClick={() => go('list')}>목록으로</button>
      </div>
    )
  }

  async function copyText() {
    const text = `책 제목: ${data.book_title}

[내가 쓴 원문]
${data.raw_text || ''}

[GPT 정리본]
${data.gpt_summary || ''}`

    await navigator.clipboard.writeText(text)
    alert('복사 완료')
  }

  async function deleteReview() {
    const ok = confirm('정말 삭제할까?')

    if (!ok) return

    const { error } = await supabase
      .from('book_reviews')
      .delete()
      .eq('id', data.id)

    if (error) {
      alert('삭제 실패: ' + error.message)
      return
    }

    alert('삭제 완료')
    go('list')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{data.book_title}</h2>
      <p style={{ color: '#777' }}>
        {data.author || '저자 미입력'} · {data.created_at}
      </p>

      <section style={{ marginTop: 20 }}>
        <h3>내가 쓴 원문</h3>
        <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {data.raw_text}
        </pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>GPT 정리본</h3>
        <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {data.gpt_summary || '아직 GPT 정리본이 없다.'}
        </pre>
      </section>

      <button onClick={copyText}>전체 복사</button>
      <button onClick={deleteReview}>삭제</button>
      <button onClick={() => go('list')}>목록으로</button>
    </div>
  )
}