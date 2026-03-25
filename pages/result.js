import { useEffect, useState } from 'react';

export default function ResultPage() {
  const [data, setData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('constat-structured');
    if (raw) setData(JSON.parse(raw));
  }, []);

  async function downloadPdf() {
    setDownloading(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'constat-amiable.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  if (!data) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title" style={{ fontSize: 28 }}>Aucune donnée</h1>
          <p className="subtitle">Retourne à l'étape upload pour analyser les images.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <span className="badge">Traitement terminé</span>
        <h1 className="title" style={{ fontSize: 28 }}>Résultat automatique</h1>
        <p className="subtitle">Résumé structuré avant export du PDF.</p>
        <button className="btn btn-primary" onClick={downloadPdf} disabled={downloading}>
          {downloading ? 'Génération PDF...' : 'Télécharger le PDF'}
        </button>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Conducteur / Véhicule A</h3>
          <pre className="json">{JSON.stringify({ conducteurA: data.conducteurA, vehiculeA: data.vehiculeA, assuranceA: data.assuranceA }, null, 2)}</pre>
        </div>
        <div className="card">
          <h3>Conducteur / Véhicule B</h3>
          <pre className="json">{JSON.stringify({ conducteurB: data.conducteurB, vehiculeB: data.vehiculeB, assuranceB: data.assuranceB }, null, 2)}</pre>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Bloc accident</h3>
        <pre className="json">{JSON.stringify(data.accident, null, 2)}</pre>
        <p style={{ marginTop: 10, color: '#475569' }}>Source : {data.source || 'inconnue'}</p>
      </div>
    </div>
  );
}
