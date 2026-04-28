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
    guide: '오늘 읽은 부분에서 마음에 남은 문장을 그대로 적어줘.',
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
];

let currentStepIndex = 0;

let draft = {
  bookTitle: '',
  author: '',
  quote: '',
  reason: '',
  emotion: '',
  action: ''
};

function renderStep() {
  const step = steps[currentStepIndex];

  document.getElementById('progressText').innerText = `${currentStepIndex + 1} / ${steps.length}`;
  document.getElementById('stepTitle').innerText = step.title;
  document.getElementById('stepGuide').innerText = step.guide;
  document.getElementById('stepInput').value = draft[step.key] || '';

  updateCombinedPreview();
}

function saveCurrentStep() {
  const step = steps[currentStepIndex];
  draft[step.key] = document.getElementById('stepInput').value.trim();
}

function nextStep() {
  saveCurrentStep();

  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    renderStep();
    return;
  }

  alert('작성 단계가 끝났다. 아래 전체 글을 복사해서 GPT에게 보내면 된다.');
  updateCombinedPreview();
}

function prevStep() {
  saveCurrentStep();

  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  }
}

function buildCombinedText() {
  return `책 제목: ${draft.bookTitle || ''}

저자: ${draft.author || ''}

${steps[2].label}
${draft.quote || ''}

${steps[3].label}
${draft.reason || ''}

${steps[4].label}
${draft.emotion || ''}

${steps[5].label}
${draft.action || ''}

위 내용을 바탕으로 블로그에 올릴 수 있게 자연스럽게 정리해줘.
내가 쓴 원문 느낌은 살리고, 과장하지 말고 담백하게 정리해줘.`;
}

function updateCombinedPreview() {
  saveCurrentStep();
  document.getElementById('combinedPreview').innerText = buildCombinedText();
}

async function copyCombinedText() {
  saveCurrentStep();
  const text = buildCombinedText();

  try {
    await navigator.clipboard.writeText(text);
    alert('전체 글을 복사했다. 이제 ChatGPT에 붙여넣으면 된다.');
  } catch (error) {
    alert('복사가 안 됐다. 전체 글 영역을 길게 눌러 직접 복사해줘.');
  }
}

async function publishReview() {
  try {
    saveCurrentStep();

    if (!draft.bookTitle) {
      alert('책 제목은 꼭 입력해줘.');
      currentStepIndex = 0;
      renderStep();
      return;
    }

    const gptSummary = document.getElementById('gptSummary').value.trim();

    const review = {
      bookTitle: draft.bookTitle,
      author: draft.author,
      rawText: buildCombinedText(),
      quote: draft.quote,
      reason: draft.reason,
      emotion: draft.emotion,
      action: draft.action,
      gptSummary
    };

    alert('DB 저장 시도 중');

    const success = await saveReviewToDB(review);

    if (!success) {
      alert('DB 저장 실패');
      return;
    }

    resetDraft();
    renderStep();
    await renderReviews();

    alert('DB 저장 완료');

  } catch (error) {
    alert('오류 발생: ' + error.message);
    console.error(error);
  }
}

function resetDraft() {
  draft = {
    bookTitle: '',
    author: '',
    quote: '',
    reason: '',
    emotion: '',
    action: ''
  };

  currentStepIndex = 0;
  document.getElementById('gptSummary').value = '';
}

function deleteReview(id) {
  const reviews = getReviews().filter(review => review.id !== id);
  saveReviews(reviews);
  renderReviews();
}