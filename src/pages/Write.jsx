import StepEditor from '../components/StepEditor.jsx'

export default function Write({ go }) {
  return (
    <div>
      <button onClick={() => go('home')} style={{ margin: 20 }}>
        메인으로
      </button>

      <StepEditor go={go} />
    </div>
  )
}