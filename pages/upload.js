import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import FileGroup from '../components/FileGroup';
import { fileToBase64 } from '../lib/base64';

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const count = useMemo(() => Object.values(files).filter(Boolean).length, [files]);

  async function handleSubmit() {
    setError('');
    setLoading(true);
    try {
      const payload = {};
      for (const [key, value] of Object.entries(files)) {
        if (value) payload[key] = await fileToBase64(value);
      }
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: payload })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur de traitement');
      sessionStorage.setItem('constat-structured', JSON.stringify(data));
      router.push('/result');
    } catch (e) {
      setError(e.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1 className="title" style={{ fontSize: 28 }}>Upload des documents</h1>
        <p className="subtitle">Ajoute 2 images par document : recto et verso.</p>
        <div className="kpi">Images ajoutées : {count} / 12</div>
      </div>

      <div className="grid-2">
        <div>
          <h2>Véhicule A</h2>
          <FileGroup title="Carte grise A" fieldA="cgA_1" fieldB="cgA_2" files={files} setFiles={setFiles} />
          <FileGroup title="Permis A" fieldA="permisA_1" fieldB="permisA_2" files={files} setFiles={setFiles} />
          <FileGroup title="Assurance A" fieldA="assuranceA_1" fieldB="assuranceA_2" files={files} setFiles={setFiles} />
        </div>
        <div>
          <h2>Véhicule B</h2>
          <FileGroup title="Carte grise B" fieldA="cgB_1" fieldB="cgB_2" files={files} setFiles={setFiles} />
          <FileGroup title="Permis B" fieldA="permisB_1" fieldB="permisB_2" files={files} setFiles={setFiles} />
          <FileGroup title="Assurance B" fieldA="assuranceB_1" fieldB="assuranceB_2" files={files} setFiles={setFiles} />
        </div>
      </div>

      {error ? <p style={{ color: '#b91c1c', fontWeight: 700 }}>{error}</p> : null}

      <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || count === 0}>
          {loading ? 'Analyse en cours...' : 'Analyser automatiquement'}
        </button>
      </div>
    </div>
  );
}
