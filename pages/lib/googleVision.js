// lib/googleVision.js
export async function detectText(imageUrl) {
  const res = await fetch('/api/vision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'API request failed');
  }

  return await res.json();
}
