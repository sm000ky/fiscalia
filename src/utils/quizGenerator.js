/**
 * Quiz Generator — calls same-origin /api/quiz proxy.
 * API key lives ONLY in the Vercel serverless function (ELF_API_KEY env),
 * never in this browser bundle. For local dev use `vercel dev`.
 */

async function callProxy() {
  const controller = new AbortController();
  // Server butuh ~40s, beri margin 60s agar gak timeout duluan
  const timer = setTimeout(() => controller.abort(), 60000);
  try {
    const res = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Quiz proxy: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.questions) || data.questions.length < 10) {
      throw new Error('Quiz proxy returned too few questions');
    }
    data.questions.forEach((q, i) => {
      if (!validateQuizQuestion(q)) throw new Error(`Bad question at ${i}`);
    });
    return data;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch auto-generated quiz questions (3 attempts, then throw).
 * @returns {Promise<Array>} Array of 10 quiz questions
 */
export async function fetchAutoQuiz() {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const data = await callProxy();
      console.log(`✓ Fresh quiz from ${data.source} (attempt ${attempt})`);
      console.log('📋 Sample Q1:', data.questions[0].question.substring(0, 60) + '...');
      return data.questions.slice(0, 10);
    } catch (err) {
      lastErr = err;
      console.warn(`⚠ Quiz proxy attempt ${attempt} failed: ${err.message}`);
    }
  }
  throw lastErr || new Error('Quiz unavailable');
}

/**
 * Validate quiz question structure
 * @param {Object} question
 * @returns {boolean}
 */
export function validateQuizQuestion(question) {
  return (
    question &&
    typeof question.question === 'string' &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    typeof question.answerIndex === 'number' &&
    question.answerIndex >= 0 &&
    question.answerIndex < 4 &&
    typeof question.explanation === 'string'
  );
}
