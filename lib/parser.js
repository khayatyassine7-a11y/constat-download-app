function find(text, regex, fallback = '') {
  const match = text.match(regex);
  if (!match) return fallback;
  return (match[1] || match[0] || '').trim();
}

function detectInsurance(text) {
  const upper = text.toUpperCase();
  if (upper.includes('AXA')) return 'AXA';
  if (upper.includes('WAFA')) return 'WAFA';
  if (upper.includes('RMA')) return 'RMA';
  if (upper.includes('SANLAM')) return 'SANLAM';
  return '';
}

function normalizePlate(text) {
  const m = text.match(/\b\d{1,5}[- ]?[A-Z]?[ -]?\d{1,2}\b/);
  return m ? m[0].replace(/\s+/g, '-').replace('--', '-') : '';
}

export function buildStructuredFromTexts(textMap) {
  const cgA = [textMap.cgA_1, textMap.cgA_2].filter(Boolean).join('\n');
  const cgB = [textMap.cgB_1, textMap.cgB_2].filter(Boolean).join('\n');
  const permisA = [textMap.permisA_1, textMap.permisA_2].filter(Boolean).join('\n');
  const permisB = [textMap.permisB_1, textMap.permisB_2].filter(Boolean).join('\n');
  const assuranceA = [textMap.assuranceA_1, textMap.assuranceA_2].filter(Boolean).join('\n');
  const assuranceB = [textMap.assuranceB_1, textMap.assuranceB_2].filter(Boolean).join('\n');

  return {
    conducteurA: {
      nom: find(permisA + '\n' + cgA, /(?:Nom|NOM)\s*:?\s*([A-Z\- ]{3,})/),
      prenom: find(permisA, /(?:Prénom|PRENOM|Prenom)\s*:?\s*([A-Z\- ]{3,})/),
      permis: find(permisA, /\b[A-Z0-9]{5,}\b/),
      adresse: find(cgA + '\n' + permisA, /(?:Adresse|ADRESSE)\s*:?\s*(.{6,60})/)
    },
    conducteurB: {
      nom: find(permisB + '\n' + cgB, /(?:Nom|NOM)\s*:?\s*([A-Z\- ]{3,})/),
      prenom: find(permisB, /(?:Prénom|PRENOM|Prenom)\s*:?\s*([A-Z\- ]{3,})/),
      permis: find(permisB, /\b[A-Z0-9]{5,}\b/),
      adresse: find(cgB + '\n' + permisB, /(?:Adresse|ADRESSE)\s*:?\s*(.{6,60})/)
    },
    vehiculeA: {
      immatriculation: normalizePlate(cgA),
      marque: find(cgA, /(?:Marque|MARQUE)\s*:?\s*([A-Z0-9\- ]{2,})/),
      modele: find(cgA, /(?:Modèle|Modele|MODELE)\s*:?\s*([A-Z0-9\- ]{2,})/)
    },
    vehiculeB: {
      immatriculation: normalizePlate(cgB),
      marque: find(cgB, /(?:Marque|MARQUE)\s*:?\s*([A-Z0-9\- ]{2,})/),
      modele: find(cgB, /(?:Modèle|Modele|MODELE)\s*:?\s*([A-Z0-9\- ]{2,})/)
    },
    assuranceA: {
      compagnie: detectInsurance(assuranceA),
      police: find(assuranceA, /(?:Police|POLICE|N°|No|Numéro)\s*:?\s*([A-Z0-9\-]{5,})/)
    },
    assuranceB: {
      compagnie: detectInsurance(assuranceB),
      police: find(assuranceB, /(?:Police|POLICE|N°|No|Numéro)\s*:?\s*([A-Z0-9\-]{5,})/)
    },
    accident: {
      date: new Date().toISOString().slice(0, 10),
      lieu: 'À compléter automatiquement',
      cases: [1]
    },
    source: 'ocr'
  };
}
