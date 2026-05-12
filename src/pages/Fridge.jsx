import { useMemo, useState } from 'react'

const today = new Date().toISOString().slice(0, 10)

const initialInventory = [
  { id: 1, name: '우유', remainingQty: 2, receivedAt: '2026-05-10', expiresAt: '2026-05-14', note: '저지방' },
  { id: 2, name: '계란', remainingQty: 10, receivedAt: '2026-05-09', expiresAt: '2026-05-18', note: '대란' },
]

export default function Fridge({ onHome }) {
  const [inventory, setInventory] = useState(initialInventory)
  const [inboundForm, setInboundForm] = useState({
    receivedAt: today,
    expiresAt: '',
    name: '',
    quantity: 1,
    note: '',
  })
  const [outboundForm, setOutboundForm] = useState({
    shippedAt: today,
    itemId: '',
    quantity: 1,
    note: '',
  })

  const selectedItem = useMemo(
    () => inventory.find((item) => String(item.id) === outboundForm.itemId),
    [inventory, outboundForm.itemId],
  )

  const remainingAfterOutbound = selectedItem
    ? Math.max(0, selectedItem.remainingQty - Number(outboundForm.quantity || 0))
    : 0

  const sortedInventory = useMemo(
    () => [...inventory].sort((a, b) => a.expiresAt.localeCompare(b.expiresAt)),
    [inventory],
  )

  const handleInboundChange = ({ target: { name, value } }) => {
    setInboundForm((prev) => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }))
  }

  const handleOutboundChange = ({ target: { name, value } }) => {
    setOutboundForm((prev) => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }))
  }

  const handleInboundSubmit = (event) => {
    event.preventDefault()
    if (!inboundForm.name.trim() || !inboundForm.expiresAt) return

    const newItem = {
      id: Date.now(),
      name: inboundForm.name.trim(),
      remainingQty: Number(inboundForm.quantity) || 1,
      receivedAt: inboundForm.receivedAt,
      expiresAt: inboundForm.expiresAt,
      note: inboundForm.note.trim(),
    }
    setInventory((prev) => [...prev, newItem])
    setInboundForm({ receivedAt: today, expiresAt: '', name: '', quantity: 1, note: '' })
  }

  const handleOutboundSubmit = (event) => {
    event.preventDefault()
    if (!selectedItem) return

    setInventory((prev) => prev.map((item) => {
      if (item.id !== selectedItem.id) return item
      return {
        ...item,
        remainingQty: Math.max(0, item.remainingQty - (Number(outboundForm.quantity) || 0)),
        note: outboundForm.note.trim() ? `${item.note} | 출고메모: ${outboundForm.note.trim()}` : item.note,
      }
    }))

    setOutboundForm({ shippedAt: today, itemId: '', quantity: 1, note: '' })
  }

  return (
    <div className="portal-shell">
      <section className="portal-card fridge-screen">
        <p className="placeholder-badge fridge-badge">냉장고 재고</p>
        <h1 className="fridge-title">입출고 관리</h1>

        <form className="fridge-form" onSubmit={handleInboundSubmit}>
          <h2>입고 등록</h2>
          <input type="date" name="receivedAt" value={inboundForm.receivedAt} onChange={handleInboundChange} />
          <input type="date" name="expiresAt" value={inboundForm.expiresAt} onChange={handleInboundChange} />
          <input name="name" placeholder="품목명" value={inboundForm.name} onChange={handleInboundChange} />
          <input type="number" min="1" name="quantity" value={inboundForm.quantity} onChange={handleInboundChange} />
          <input name="note" placeholder="메모" value={inboundForm.note} onChange={handleInboundChange} />
          <button type="submit" className="btn-primary">입고 저장</button>
        </form>

        <form className="fridge-form" onSubmit={handleOutboundSubmit}>
          <h2>출고 등록</h2>
          <input type="date" name="shippedAt" value={outboundForm.shippedAt} onChange={handleOutboundChange} />
          <select name="itemId" value={outboundForm.itemId} onChange={handleOutboundChange}>
            <option value="">기존 품목 선택</option>
            {inventory.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          <input type="number" min="1" name="quantity" value={outboundForm.quantity} onChange={handleOutboundChange} />
          <p className="fridge-subtitle">남은 수량: {remainingAfterOutbound}</p>
          <input name="note" placeholder="메모" value={outboundForm.note} onChange={handleOutboundChange} />
          <button type="submit" className="btn-secondary">출고 저장</button>
        </form>

        <ul className="fridge-inventory-list" aria-label="냉장고 재고 목록">
          {sortedInventory.map((item) => (
            <li key={item.id} className={`fridge-item-card ${item.remainingQty === 0 ? 'is-empty' : ''}`}>
              <div className="fridge-item-top">
                <strong>{item.name}</strong>
                <span className="fridge-quantity">남은 수량 {item.remainingQty}</span>
              </div>
              <div className="fridge-item-meta">
                <span className="fridge-expiry">입고일 {item.receivedAt}</span>
                <span className="fridge-expiry">유통기한 {item.expiresAt}</span>
              </div>
              <p className="fridge-note">메모: {item.note || '-'}</p>
            </li>
          ))}
        </ul>

        <button type="button" className="btn-secondary" onClick={onHome}>홈으로 돌아가기</button>
      </section>
    </div>
  )
}
