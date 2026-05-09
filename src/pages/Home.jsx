import titleImage from '../assets/my-life-portal-title.svg'

export default function Home({ go }) {
  return (
    <div style={{ padding: 20 }}>
      <img className="home-title-image" src={titleImage} alt="MY LIFE PORTAL" />

      <button onClick={() => go('write')}>
        독서리뷰 작성
      </button>

      <button onClick={() => go('list')}>
        독서리뷰 목록
      </button>
    </div>
  )
}
