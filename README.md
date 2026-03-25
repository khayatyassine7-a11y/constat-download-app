# Constat Auto Maroc

Application web Next.js prête à déployer sur Vercel.

## Ce que fait ce projet
- Upload de 12 images : carte grise, permis, assurance pour A et B (recto/verso)
- OCR Google Vision **si configuré**
- Fallback démo si les clés ne sont pas encore configurées
- Structuration automatique des données
- Génération d'un PDF sur le modèle de constat marocain
- Compatible Vercel

## Important
Le PDF sera **exact visuellement** uniquement si l'image du modèle se trouve ici :
- `public/constat-template.jpg`

Ce projet inclut déjà une image de base. Tu peux la remplacer par ta propre image si besoin.

## Lancer en local
```bash
npm install
npm run dev
```

## Déployer sur Vercel
1. Créer un projet sur Vercel
2. Importer ce dossier ou le mettre sur GitHub
3. Ajouter la variable d'environnement `GOOGLE_CREDENTIALS` si tu veux le vrai OCR
4. Déployer

## Google OCR sur Vercel
Dans Vercel > Settings > Environment Variables :
- Nom : `GOOGLE_CREDENTIALS`
- Valeur : le contenu JSON complet du service account Google

## Flux utilisateur
1. Aller sur `/`
2. Upload des 12 images
3. Cliquer sur **Analyser automatiquement**
4. Vérifier le résumé
5. Télécharger le PDF
