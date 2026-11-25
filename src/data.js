// Photos Unsplash, licence gratuite Unsplash, servies depuis leur CDN.
export const photo = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=74`
export const srcSet = (id) => [480, 800, 1200, 1800, 2400].map((w) => `${photo(id, w)} ${w}w`).join(', ')

export const PH = {
  vase: { id: '1633000117256-f8d7e244ca70', by: 'Kasia Sikorska' },
  atelier: { id: '1531058240690-006c446962d8', by: 'Ellicia' },
  coupe: { id: '1782038522398-a0bcd5993bdc', by: 'Volodymyr Lymariev' },
  papier: { id: '1581078000759-ea6753bc3e13', by: 'micheile henderson' },
  panier: { id: '1782061932586-c8a425a67e3f', by: 'Diana Shchurova' },
  lin: { id: '1523694576729-dc99e9c0f9b4', by: 'jessie daniella' },
  sousbois: { id: '1768861012915-8d16f1fe4f2e', by: 'SarahCreates' },
  chloro: { id: '1742767515117-1ded1a135d8a', by: 'ANASTASIIA' },
  pre: { id: '1648993880071-188101660605', by: 'Marina Podrez' },
  tulipes: { id: '1620753328825-ff7389d45df0', by: 'Moon Moons' },
  nuage: { id: '1632097150299-61e3df2c062d', by: 'Ramiro Pianarosa' },
  seche: { id: '1575932197052-25969c9bdc7f', by: 'Laurice Manaligod' },
  quotidien: { id: '1652346064068-1ae0d97502c3', by: 'Arjun Lama' },
  epis: { id: '1614378719646-ce1c2961b91c', by: 'Ksenia Mostovaya' },
  hellebore: { id: '1768241825965-f6713d28a1d6', by: 'Marina Marcato' },
}

export const NAV = [
  { id: '#bouquets', label: 'Bouquets' },
  { id: '#services', label: 'Services' },
  { id: '#ateliers', label: 'Ateliers' },
  { id: '#commander', label: 'Commander' },
]

export const BOUQUETS = [
  { nom: 'Lin blanc', notes: 'Roses blanches, lisianthus, eucalyptus', prix: 48, p: PH.lin },
  { nom: 'Sous-bois', notes: 'Dahlias, hortensia vert, fougère', prix: 62, p: PH.sousbois },
  { nom: 'Chlorophylle', notes: 'Œillets verts et blancs, feuillage', prix: 39, p: PH.chloro },
  { nom: 'Pré salé', notes: 'Renoncules, mimosa, petit vase grès', prix: 54, p: PH.pre },
]

export const SERVICES = [
  { titre: 'Bouquets du quotidien', texte: 'Composés à la minute à l’atelier, avec les fleurs arrivées le matin même. Retrait en boutique ou livraison à vélo dans Bordeaux, le jour même pour toute commande passée avant 14h.', info: 'Dès 35 €', p: PH.quotidien },
  { titre: 'Abonnement floral', texte: 'Un bouquet de saison livré chaque semaine, tous les quinze jours ou chaque mois, chez vous ou au bureau. Vase prêté le premier mois, sans engagement.', info: 'Dès 32 € la livraison', p: PH.tulipes },
  { titre: 'Mariages & événements', texte: 'Bouquet de mariée, boutonnières, arches et centres de table. Un premier rendez-vous à l’atelier pour choisir ensemble les fleurs de votre saison.', info: 'Sur devis', p: PH.nuage },
  { titre: 'Fleurs séchées', texte: 'Compositions durables en fleurs et graminées séchées dans notre jardin. Elles traversent l’hiver sans perdre leur tenue.', info: 'Dès 28 €', p: PH.seche },
]

export const ETAPES = [
  { n: '01', titre: 'Choisir', texte: 'Chaque mardi et vendredi, nous rapportons les fleurs de trois producteurs de Gironde. Rien qui ait pris l’avion.', p: PH.panier },
  { n: '02', titre: 'Composer', texte: 'Tiges recoupées, feuillage trié, eau changée : un bouquet Ombelle tient en moyenne dix jours.', p: PH.coupe },
  { n: '03', titre: 'Emballer', texte: 'Papier recyclé, ficelle de coton, zéro plastique. Livraison à vélo dans tout Bordeaux.', p: PH.papier },
]

export const ATELIERS = [
  { jour: 'Sam', date: '29.11', titre: 'Couronne de l’Avent', duree: '2 h', prix: 65, places: 0 },
  { jour: 'Mer', date: '03.12', titre: 'Centre de table de fête', duree: '2 h 30', prix: 75, places: 3 },
  { jour: 'Sam', date: '06.12', titre: 'Couronne de l’Avent', duree: '2 h', prix: 65, places: 5 },
  { jour: 'Sam', date: '13.12', titre: 'Bouquet d’hiver séché', duree: '2 h', prix: 55, places: 6 },
  { jour: 'Sam', date: '10.01', titre: 'Initiation à l’ikebana', duree: '3 h', prix: 70, places: 8 },
]

export const AVIS = [
  { texte: 'Le bouquet de notre mariage ressemblait exactement à ce que j’imaginais, en plus juste.', auteur: 'Camille', detail: 'Mariée en juin' },
  { texte: 'Mon abonnement du jeudi est devenu le meilleur moment de la semaine au bureau.', auteur: 'Julien', detail: 'Abonné depuis 2022' },
  { texte: 'Des fleurs qui tiennent dix jours et pas un gramme de plastique. Je ne vais plus ailleurs.', auteur: 'Inès', detail: 'Cliente du quartier' },
]

// Fleurs de saison, mois par mois (0 = janvier).
export const SAISON = [
  ['Anémones', 'Renoncules', 'Mimosa', 'Hellébores', 'Tulipes', 'Eucalyptus'],
  ['Mimosa', 'Renoncules', 'Anémones', 'Tulipes', 'Jacinthes', 'Narcisses'],
  ['Tulipes', 'Renoncules', 'Narcisses', 'Anémones', 'Fritillaires', 'Saule'],
  ['Lilas', 'Tulipes', 'Renoncules', 'Viornes', 'Fritillaires', 'Cerisier'],
  ['Pivoines', 'Muguet', 'Lilas', 'Viornes', 'Ancolies', 'Alchémille'],
  ['Pivoines', 'Roses de jardin', 'Pois de senteur', 'Delphiniums', 'Alchémille', 'Camomille'],
  ['Roses de jardin', 'Cosmos', 'Carotte sauvage', 'Lavande', 'Zinnias', 'Pois de senteur'],
  ['Dahlias', 'Cosmos', 'Zinnias', 'Tournesols', 'Amarantes', 'Ammi'],
  ['Dahlias', 'Cosmos', 'Amarantes', 'Hortensias', 'Rudbeckias', 'Graminées'],
  ['Dahlias', 'Hortensias', 'Chrysanthèmes', 'Roses d’automne', 'Physalis', 'Graminées'],
  ['Chrysanthèmes', 'Hellébores', 'Eucalyptus', 'Amaryllis', 'Baies d’hiver', 'Hortensias séchés'],
  ['Amaryllis', 'Hellébores', 'Branches de pin', 'Eucalyptus', 'Houx', 'Anémones'],
]
export const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
