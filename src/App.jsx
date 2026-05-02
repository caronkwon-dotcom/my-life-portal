import { useState } from 'react'
import Home from './pages/Home.jsx'
import Write from './pages/Write.jsx'
import List from './pages/List.jsx'
import Detail from './pages/Detail.jsx'

function App() {
  const [page, setPage] = useState('home')
  const [selected, setSelected] = useState(null)

  return (
    <div>
      {page === 'home' && <Home go={setPage} />}
      {page === 'write' && <Write go={setPage} />}
      {page === 'list' && <List go={setPage} select={setSelected} />}
      {page === 'detail' && <Detail go={setPage} data={selected} />}
    </div>
  )
}

export default App