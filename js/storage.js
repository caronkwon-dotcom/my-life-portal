async function saveReviewToDB(review) {
  const { error } = await supabase
    .from('book_reviews')
    .insert([{
      book_title: review.bookTitle,
      author: review.author,
      raw_text: review.rawText,
      quote: review.quote,
      reason: review.reason,
      emotion: review.emotion,
      action: review.action,
      gpt_summary: review.gptSummary
    }]);

  if (error) {
    console.error(error);
    alert("DB 저장 실패");
    return false;
  }

  return true;
}

async function getReviewsFromDB() {
  const { data, error } = await supabase
    .from('book_reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}