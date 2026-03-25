// pages/api/vision.js
import { ImageAnnotatorClient } from '@google-cloud/vision';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image URL provided' });
    }

    const client = new ImageAnnotatorClient();

    // Détecte le texte (ou change selon ce que tu veux)
    const [result] = await client.textDetection(imageUrl);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
