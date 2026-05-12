const summaryItems = ['독서 리뷰', '냉장고 관리', '운동 기록', '가계부']

const shortcutCards = [
  { key: 'list', label: '독서 리뷰', desc: '기존 리뷰 목록으로 이동', tone: 'reading' },
  { key: 'write', label: '독서리뷰 작성', desc: '새 독서 리뷰 작성', tone: 'reading' },
  { key: 'fridge', label: '냉장고 관리', desc: '식재료 기록 준비중', tone: 'fridge' },
  { key: 'workout', label: '운동 기록', desc: '루틴/기록 준비중' },
  { key: 'budget', label: '가계부', desc: '지출 관리 준비중' },
  { key: 'stocks', label: '주식 일지', desc: '매매 기록 준비중' },
  { key: 'settings', label: '설정', desc: '환경 설정 준비중' },
]

export default function Home({ go, recentReviews = [] }) {
  return (
    <div className="portal-shell">
      <header className="portal-header portal-card">
        <h1>My Life Portal</h1>
        <p>나의 생활 기록을 한 곳에서 관리합니다.</p>
      </header>

      <section className="portal-card">
        <h2>Today's Summary</h2>
        <div className="summary-grid">
          {summaryItems.map((item) => (
            <div key={item} className="summary-item">{item}</div>
          ))}
        </div>
      </section>

      <section className="portal-card">
        <h2>바로가기</h2>
        <div className="launcher-grid">
          {shortcutCards.map((card) => (
            <button key={card.key} className={`launcher-card ${card.tone || ''}`} onClick={() => go(card.key)}>
              <strong>{card.label}</strong>
              <span>{card.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="portal-card">
        <h2>최근 기록</h2>
        {recentReviews.length === 0 ? (
          <p className="muted">아직 독서리뷰 데이터가 없습니다. 첫 리뷰를 작성해보세요.</p>
        ) : (
          <ul className="recent-list">
            {recentReviews.slice(0, 3).map((review, idx) => (
              <li key={`${review.id || idx}-${idx}`}>
                <strong>{review.book_title || '책 제목 없음'}</strong>
                <span>{review.created_at || '작성일 없음'}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className="bottom-nav">
        <button onClick={() => go('home')}>홈</button>
        <button onClick={() => go('list')}>독서</button>
        <button onClick={() => go('fridge')}>냉장고</button>
      </nav>
    </div>
  )
}
