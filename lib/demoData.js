export const demoStructured = {
  conducteurA: {
    nom: 'CONDUCTEUR A',
    prenom: 'DEMO',
    permis: 'A123456',
    adresse: 'Casablanca'
  },
  conducteurB: {
    nom: 'CONDUCTEUR B',
    prenom: 'DEMO',
    permis: 'B654321',
    adresse: 'Rabat'
  },
  vehiculeA: {
    immatriculation: '12345-A-6',
    marque: 'DACIA',
    modele: 'LOGAN'
  },
  vehiculeB: {
    immatriculation: '54321-B-7',
    marque: 'RENAULT',
    modele: 'CLIO'
  },
  assuranceA: {
    compagnie: 'AXA',
    police: 'POL123456'
  },
  assuranceB: {
    compagnie: 'RMA',
    police: 'POL654321'
  },
  accident: {
    date: new Date().toISOString().slice(0, 10),
    lieu: 'Casablanca',
    cases: [1, 8]
  },
  source: 'demo'
};
