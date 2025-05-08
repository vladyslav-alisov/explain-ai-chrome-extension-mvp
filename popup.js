document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const text = params.get('text');
  const input = document.getElementById('input');
  input.value = text;

  const responseDiv = document.getElementById('response');

  const staticPrompt =
    'Explain the following text in very simple words, using short and concise sentences. Keep the explanation brief and easy to understand:\n\n';
  const fullPrompt = staticPrompt + text;

  responseDiv.innerHTML = 'Loading...';

  try {
    const explanation = await callAI(fullPrompt);
    responseDiv.innerHTML = explanation;
  } catch (err) {
    responseDiv.innerHTML = 'Error: ' + err.message;
  }
});

async function callAI(prompt) {
  const apiKey = CONFIG.API_KEY;
  const endpoint = CONFIG.ENDPOINT + apiKey;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  // Extract first text response
  const resultText =
    data.candidates[0]?.content?.parts[0]?.text || 'No response';
  return resultText;
}
