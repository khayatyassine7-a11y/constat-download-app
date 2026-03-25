import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function draw(page, font, text, x, y, size = 9) {
  page.drawText(String(text || ''), { x, y, size, font, color: rgb(0, 0, 0) });
}

function drawCheck(page, x, y) {
  page.drawText('✔', { x, y, size: 12, color: rgb(0, 0, 0) });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body || {};
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const templatePath = path.join(process.cwd(), 'public', 'constat-template.jpg');
  if (fs.existsSync(templatePath)) {
    const imgBytes = fs.readFileSync(templatePath);
    const jpg = await pdfDoc.embedJpg(imgBytes);
    page.drawImage(jpg, { x: 0, y: 0, width: 595, height: 842 });
  } else {
    page.drawText('Constat amiable', { x: 220, y: 800, size: 18, font });
  }

  // Top info
  draw(page, font, data.accident?.date, 220, 748, 10);
  draw(page, font, data.accident?.lieu, 375, 748, 10);

  // A block
  draw(page, font, data.conducteurA?.nom, 52, 650);
  draw(page, font, data.conducteurA?.prenom, 52, 634);
  draw(page, font, data.conducteurA?.adresse, 52, 618);
  draw(page, font, data.conducteurA?.permis, 52, 602);
  draw(page, font, data.vehiculeA?.immatriculation, 52, 574);
  draw(page, font, data.vehiculeA?.marque, 52, 558);
  draw(page, font, data.vehiculeA?.modele, 52, 542);
  draw(page, font, data.assuranceA?.compagnie, 52, 514);
  draw(page, font, data.assuranceA?.police, 52, 498);

  // B block
  draw(page, font, data.conducteurB?.nom, 328, 650);
  draw(page, font, data.conducteurB?.prenom, 328, 634);
  draw(page, font, data.conducteurB?.adresse, 328, 618);
  draw(page, font, data.conducteurB?.permis, 328, 602);
  draw(page, font, data.vehiculeB?.immatriculation, 328, 574);
  draw(page, font, data.vehiculeB?.marque, 328, 558);
  draw(page, font, data.vehiculeB?.modele, 328, 542);
  draw(page, font, data.assuranceB?.compagnie, 328, 514);
  draw(page, font, data.assuranceB?.police, 328, 498);

  // Sample automatic cases on the central column
  const cases = Array.isArray(data.accident?.cases) ? data.accident.cases : [];
  const yMap = {
    1: 470,
    2: 454,
    3: 438,
    4: 422,
    5: 406,
    6: 390,
    7: 374,
    8: 358,
    9: 342,
    10: 326,
    11: 310,
    12: 294,
    13: 278,
    14: 262,
    15: 246,
    16: 230,
    17: 214
  };
  cases.forEach((n) => {
    const y = yMap[n];
    if (y) drawCheck(page, 287, y);
  });

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="constat-amiable.pdf"');
  res.status(200).send(Buffer.from(pdfBytes));
}
