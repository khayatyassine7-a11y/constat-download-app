import { extractTextFromBase64 } from '../../lib/googleVision';
import { buildStructuredFromTexts } from '../../lib/parser';
import { demoStructured } from '../../lib/demoData';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { images } = req.body || {};
    if (!images || typeof images !== 'object') {
      return res.status(400).json({ error: 'Images manquantes' });
    }

    const textMap = {};
    for (const [key, base64] of Object.entries(images)) {
      if (!base64) continue;
      const text = await extractTextFromBase64(base64);
      textMap[key] = text;
    }

    const hasAnyText = Object.values(textMap).some(Boolean);
    if (!hasAnyText) {
       return res.status(200).json(demoStructured);
    }

    const structured = buildStructuredFromTexts(textMap);
    return res.status(200).json(structured);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erreur serveur' });
  }
}
