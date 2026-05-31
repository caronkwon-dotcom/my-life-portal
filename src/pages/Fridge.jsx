import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Fridge({ onHome }) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchFridgeItems() {
      const { data, error } = await supabase
        .from('fridge_items')
        .select('item_name, quantity, unit, storage_location, expiry_date')
        .eq('status', 'active')
        .order('expiry_date', { ascending: true })

      if (!isMounted) return

      if (error) {
        setErrorMessage(error.message)
        setItems([])
      } else {
        setErrorMessage('')
        setItems(data ?? [])
      }

      setIsLoading(false)
    }

    fetchFridgeItems()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="portal-shell">
      <section className="portal-card fridge-screen">
        <p className="placeholder-badge fridge-badge">냉장고 재고</p>
        <h1 className="fridge-title">재고 목록</h1>
        <p className="fridge-subtitle">현재 등록된 식재료를 확인해보세요.</p>

        {isLoading && <p className="fridge-subtitle">냉장고 재료를 불러오는 중입니다.</p>}
        {errorMessage && <p className="fridge-subtitle">재료 조회 실패: {errorMessage}</p>}
        {!isLoading && !errorMessage && items.length === 0 && (
          <p className="fridge-subtitle">등록된 냉장고 재료가 없습니다.</p>
        )}

        {!isLoading && !errorMessage && items.length > 0 && (
          <ul className="fridge-inventory-list" aria-label="냉장고 재고 목록">
            {items.map((item, index) => (
              <li
                key={`${item.item_name}-${item.expiry_date}-${index}`}
                className="fridge-item-card"
              >
                <div className="fridge-item-top">
                  <strong>{item.item_name}</strong>
                  <span className="fridge-quantity">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="fridge-item-meta">
                  <span className="fridge-chip refrigerator">
                    {item.storage_location}
                  </span>
                  <span className="fridge-expiry">소비기한 {item.expiry_date}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button type="button" className="btn-secondary" onClick={onHome}>
          홈으로 돌아가기
        </button>
      </section>

      <button type="button" className="fab" aria-label="식재료 추가">＋</button>
    </div>
  )
}
