async function renderReviews() {
  const list = document.getElementById('reviewList');
  const reviews = await getReviewsFromDB();

  if (reviews.length === 0) {
    list.innerHTML = '<div class="empty">데이터 없음</div>';
    return;
  }

  list.innerHTML = reviews.map(review => `
    <div class="review">
      <div class="review-title">${review.book_title}</div>
      <div class="review-date">${review.created_at}</div>

      <div class="review-block">
        <b>내 글</b><br>
        ${review.raw_text || ''}
      </div>

      ${review.gpt_summary ? `
        <div class="review-block">
          <b>GPT</b><br>
          ${review.gpt_summary}
        </div>
      ` : ''}
    </div>
  `).join('');
}