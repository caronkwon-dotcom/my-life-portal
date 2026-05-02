export default function Home({ go }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>📚 My Life Portal</h1>

      <button onClick={() => go('write')}>
        독서리뷰 작성
      </button>

      <button onClick={() => go('list')}>
        독서리뷰 목록
      </button>
    </div>
  )
}