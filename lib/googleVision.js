let vision = null;

function getClient() {
  // ❌ Bloque côté navigateur
  if (typeof window !== 'undefined') {
    return null;
  }

  // ✅ Import dynamique (clé du fix)
  if (!vision) {
    vision = require('@google-cloud/vision');
  }

  const raw = process.env.GOOGLE_CREDENTIALS;

  if (!raw || raw.trim() === '' || raw.trim() === '{}') {
    return null;
  }

  const credentials = JSON.parse(raw);

  return new vision.ImageAnnotatorClient({ credentials });
}

export async function extractTextFromBase64(base64) {
  const client = getClient();
  if (!client) return '';

  const [result] = await client.textDetection({
    image: { content: base64 }
  });

  return result?.textAnnotations?.[0]?.description || '';
}
