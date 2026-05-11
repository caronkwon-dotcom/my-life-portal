export default function Placeholder({ title, description, goHomeLabel = '홈으로 돌아가기', onHome }) {
  return (
    <div className="portal-shell">
      <section className="portal-card placeholder-screen">
        <p className="placeholder-badge">준비중</p>
        <h1>{title}</h1>
        <p>{description || '해당 기능은 현재 준비중입니다.'}</p>
        <button className="btn-primary" onClick={onHome}>{goHomeLabel}</button>
      </section>
    </div>
  )
}
