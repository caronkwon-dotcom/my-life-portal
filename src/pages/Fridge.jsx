const upcomingFeatures = [
  '식재료 등록',
  '유통기한 임박 표시',
  '냉장/냉동/실온 구분',
  '추천 레시피',
]

export default function Fridge({ onHome }) {
  return (
    <div className="portal-shell">
      <section className="portal-card fridge-screen">
        <p className="placeholder-badge fridge-badge">냉장고 관리</p>
        <h1>냉장고 관리 준비중</h1>
        <p>다음 단계에서 실제 등록/수정 기능이 추가될 예정입니다.</p>
        <ul className="feature-list">
          {upcomingFeatures.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="btn-secondary" onClick={onHome}>홈으로 돌아가기</button>
      </section>
      <button className="fab" aria-label="식재료 등록 준비중">＋</button>
    </div>
  )
}
