import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ padding: 28 }}>
        <span className="badge">Vercel Ready</span>
        <h1 className="title">Constat Auto Maroc</h1>
        <p className="subtitle">
          Application web pour générer automatiquement un constat amiable à partir de 12 images :
          carte grise, permis et assurance pour le véhicule A et le véhicule B, recto et verso.
        </p>
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="kpi">0 saisie : l'utilisateur envoie seulement les images</div>
          <div className="kpi">PDF exportable avec modèle de constat</div>
        </div>
        <Link href="/upload">
          <button className="btn btn-primary">Commencer</button>
        </Link>
      </div>
    </div>
  );
}
