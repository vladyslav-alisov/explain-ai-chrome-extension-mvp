document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const text = params.get('text');

  const responseDiv = document.getElementById('response');
  const questionDiv = document.getElementById('question');

  // Show original text at bottom
  questionDiv.textContent = `Original text: ${text}`;

  const staticPrompt =
    'Explain the following text in very simple words, using short and concise sentences. Keep the explanation brief and easy to understand:\n\n';
  const fullPrompt = staticPrompt + text;

  try {
    const explanation = await callAI(fullPrompt);
    responseDiv.textContent = explanation;
    responseDiv.classList.remove('loading');
    responseDiv.classList.add('show');
  } catch (err) {
    responseDiv.textContent = 'Error: ' + err.message;
    responseDiv.classList.remove('loading');
    responseDiv.classList.add('show');
  }
});

async function callAI(prompt) {
  const apiKey = CONFIG.API_KEY;
  const endpoint = CONFIG.ENDPOINT + apiKey;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  const resultText =
    data.candidates[0]?.content?.parts[0]?.text || 'No response';
  return resultText;
}
