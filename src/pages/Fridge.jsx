const mockInventory = [
  {
    id: 1,
    name: '우유',
    category: '냉장',
    quantity: '900ml',
    expiresAt: '2026-05-14',
  },
  {
    id: 2,
    name: '계란',
    category: '냉장',
    quantity: '10개',
    expiresAt: '2026-05-18',
  },
  {
    id: 3,
    name: '브로콜리',
    category: '냉장',
    quantity: '1송이',
    expiresAt: '2026-05-13',
  },
  {
    id: 4,
    name: '만두',
    category: '냉동',
    quantity: '1봉',
    expiresAt: '2026-08-02',
  },
  {
    id: 5,
    name: '파스타면',
    category: '실온',
    quantity: '500g',
    expiresAt: '2027-01-20',
  },
]

const categoryClassMap = {
  냉장: 'refrigerator',
  냉동: 'freezer',
  실온: 'pantry',
}

export default function Fridge({ onHome }) {
  return (
    <div className="portal-shell">
      <section className="portal-card fridge-screen">
        <p className="placeholder-badge fridge-badge">냉장고 재고</p>
        <h1 className="fridge-title">재고 목록</h1>
        <p className="fridge-subtitle">현재 등록된 식재료를 확인해보세요.</p>

        <ul className="fridge-inventory-list" aria-label="냉장고 재고 목록">
          {mockInventory.map((item) => (
            <li key={item.id} className="fridge-item-card">
              <div className="fridge-item-top">
                <strong>{item.name}</strong>
                <span className="fridge-quantity">{item.quantity}</span>
              </div>
              <div className="fridge-item-meta">
                <span className={`fridge-chip ${categoryClassMap[item.category]}`}>
                  {item.category}
                </span>
                <span className="fridge-expiry">소비기한 {item.expiresAt}</span>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" className="btn-secondary" onClick={onHome}>
          홈으로 돌아가기
        </button>
      </section>

      <button type="button" className="fab" aria-label="식재료 추가">＋</button>
    </div>
  )
}
