import { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'


const steps = [
  {
    key: 'bookTitle',
    title: '책 제목',
    guide: '리뷰할 책 제목을 입력해줘.',
    label: '책 제목'
  },
  {
    key: 'author',
    title: '저자',
    guide: '저자 이름을 입력해줘. 모르면 비워도 된다.',
    label: '저자'
  },
  {
    key: 'quote',
    title: '인상 깊은 문장',
    guide: '오늘 읽은 부분에서 마음에 남은 문장을 적어줘.',
    label: '1. 인상 깊은 문장'
  },
  {
    key: 'reason',
    title: '이 문장이 끌린 이유',
    guide: '왜 이 문장이 눈에 들어왔는지 편하게 적어줘.',
    label: '2. 이 문장이 끌린 이유'
  },
  {
    key: 'emotion',
    title: '오늘 내 감정',
    guide: '이 문장을 읽고 든 감정이나 지금 내 상태를 적어줘.',
    label: '3. 오늘 내 감정'
  },
  {
    key: 'action',
    title: '내일 해볼 작은 행동',
    guide: '내일 바로 해볼 수 있는 작은 행동 하나를 적어줘.',
    label: '4. 내일 해볼 작은 행동'
  }
]

const initialDraft = {
  bookTitle: '',
  author: '',
  quote: '',
  reason: '',
  emotion: '',
  action: ''
}



export default function StepEditor({ go }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [draft, setDraft] = useState(initialDraft)
  const [gptSummary, setGptSummary] = useState('')

  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef(null)

  const step = steps[stepIndex]

  function updateValue(value) {
    setDraft({
      ...draft,
      [step.key]: value
    })
  }

  function nextStep() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setMessage('작성 단계가 끝났다. 아래 전체 글을 복사해서 GPT에게 보내면 된다.')
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  function buildCombinedText() {
    return `책 제목: ${draft.bookTitle}

저자: ${draft.author}

1. 인상 깊은 문장
${draft.quote}

2. 이 문장이 끌린 이유
${draft.reason}

3. 오늘 내 감정
${draft.emotion}

4. 내일 해볼 작은 행동
${draft.action}

위 내용을 바탕으로 블로그에 올릴 수 있게 자연스럽게 정리해줘.
내가 쓴 원문 느낌은 살리고, 과장하지 말고 담백하게 정리해줘.`
  }

  async function copyText() {
    await navigator.clipboard.writeText(buildCombinedText())
  setMessage('전체 글을 복사했다. ChatGPT에 붙여넣으면 된다.')
  }

  async function saveToDB() {
  setIsSaving(true)
  setMessage('저장 중...')

  const { error } = await supabase
    .from('book_reviews')
    .insert([{
      book_title: draft.bookTitle,
      author: draft.author,
      raw_text: buildCombinedText(),
      quote: draft.quote,
      reason: draft.reason,
      emotion: draft.emotion,
      action: draft.action,
      gpt_summary: gptSummary
    }])

  if (error) {
    setMessage('저장 실패: ' + error.message)
    setIsSaving(false)
    return
  }

  setMessage('저장 완료. 목록으로 이동한다.')
  setDraft(initialDraft)
  setGptSummary('')
  setStepIndex(0)
  setIsSaving(false)
  go('list')
}

useEffect(() => {
  inputRef.current?.focus()
}, [stepIndex])


  return (
    
    
    <div style={{ padding: 20 }}>
        {message && (
      <div className="toast-message">
        {message}
      </div>
    )}

      <div style={{ marginBottom: 16 }}>
        <strong>{stepIndex + 1} / {steps.length}</strong>
      </div>

      <h2>{step.title}</h2>
      <p>{step.guide}</p>

      <textarea
      ref={inputRef}
        value={draft[step.key]}
        onChange={(e) => updateValue(e.target.value)}
        placeholder="여기에 입력"
        style={{
          width: '100%',
          minHeight: 240,
          padding: 12,
          fontSize: 16,
          lineHeight: 1.6
        }}
      />

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button onClick={prevStep} disabled={stepIndex === 0}>
          이전
        </button>
        <button onClick={nextStep}>
          다음
        </button>
      </div>

      <hr style={{ margin: '24px 0' }} />

      <h3>GPT에게 보낼 전체 글</h3>
      <pre style={{
        whiteSpace: 'pre-wrap',
        background: '#f3f3f3',
        padding: 12,
        borderRadius: 8
      }}>
        {buildCombinedText()}
      </pre>

      <button onClick={copyText}>
        전체 글 복사
      </button>

      {message && (
  <div className="toast-message">
    {message}
  </div>
)}

      <hr style={{ margin: '24px 0' }} />

<h3>GPT 정리본 붙여넣기</h3>
<textarea

  value={gptSummary}
  onChange={(e) => setGptSummary(e.target.value)}
  placeholder="ChatGPT가 정리해준 글을 여기에 붙여넣기"
  style={{
    width: '100%',
    minHeight: 220,
    padding: 12,
    fontSize: 16,
    lineHeight: 1.6
  }}
/>

<button onClick={saveToDB} disabled={isSaving}>
  {isSaving ? '저장 중...' : '최종 저장'}
</button>
{message && (
  <div className="toast-message">
    {message}
  </div>
)}
    </div>

    
  )
}





