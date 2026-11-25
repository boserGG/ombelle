# Ombelle — site vitrine d’un atelier floral fictif

> **Projet fictif.** Ombelle n’existe pas. Ce site est une page de présentation réalisée pour montrer ce qui peut être créé pour un commerce de proximité. Le nom, l’adresse, les prix, les avis, les ateliers et le formulaire de commande sont inventés. Le formulaire n’envoie aucune donnée.

Site vitrine pour un fleuriste imaginaire de Bordeaux, dans une palette crème, sauge et kaki. Il est minimaliste, avec des animations discrètes :

- titre qui apparaît mot par mot et photo en arche qui se dévoile à l’ouverture ;
- badge circulaire qui tourne lentement ;
- bandeau des fleurs de saison, qui change automatiquement selon le mois ;
- tige dessinée qui « pousse » au fil du défilement ;
- images révélées de haut en bas, photo de l’atelier qui passe de l’arche au plein écran ;
- services en accordéon, avis clients en fondu, horaires avec le jour actuel mis en avant ;
- bouton « Commander ce bouquet » qui pré-remplit le formulaire ;
- statut « Ouvert / Fermé » calculé à l’heure de Paris ;
- version mobile dédiée, et prise en compte du réglage « réduire les animations ».

## Technologies

[React](https://react.dev) · [Vite](https://vite.dev) · [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · [Lenis](https://lenis.darkroom.engineering) · CSS natif

## Lancer le projet

Node.js 20.19+ ou 22.12+ est requis.

```bash
npm install
npm run dev      # http://ombelle-fleurs.localhost:5192
npm run build    # version de production dans dist/
npm run preview  # prévisualise le build
npm test         # vérifie le calcul des horaires d’ouverture
```

## Mise en ligne

- **GitHub Pages** : le fichier `.github/workflows/deploy.yml` construit et publie le site à chaque envoi sur `main`. Dans le dépôt, choisir **Settings → Pages → Source : GitHub Actions**.
- **Netlify** : le fichier `netlify.toml` contient déjà la configuration. Il suffit d’importer le dépôt.

## Structure

```
src/
  App.jsx       sections du site et animations
  data.js       contenus (bouquets, services, ateliers, fleurs de saison, photos)
  status.js     horaires d’ouverture (heure de Paris)
  styles.css    styles
public/         favicon
```

## Crédits

### Photographies

Photos publiées sur [Unsplash](https://unsplash.com) sous la [licence Unsplash](https://unsplash.com/license), gratuite. Elles sont chargées depuis le CDN d’Unsplash et ne sont pas incluses dans ce dépôt. Les personnes visibles sur les photos n’ont aucun lien avec ce projet.

Kasia Sikorska, Ellicia, Volodymyr Lymariev, micheile henderson, Diana Shchurova, jessie daniella, SarahCreates, ANASTASIIA, Marina Podrez, Moon Moons, Ramiro Pianarosa, Laurice Manaligod, Arjun Lama, Ksenia Mostovaya, Marina Marcato.

### Polices

Polices distribuées via [Fontsource](https://fontsource.org), sous licence [SIL Open Font License 1.1](https://openfontlicense.org) :

- [Fraunces](https://github.com/undercasetype/Fraunces), © The Fraunces Project Authors
- [Hanken Grotesk](https://github.com/marcologous/hanken-grotesk), © The Hanken Grotesk Project Authors

Les textes complets des licences se trouvent dans `node_modules/@fontsource-variable/*/LICENSE` après `npm install`.

### Bibliothèques

- React, React DOM, Vite, Lenis : licence MIT
- GSAP et @gsap/react : [licence standard gratuite de GSAP](https://gsap.com/standard-license)

## Licence

Le code source de ce projet est publié sous [licence MIT](LICENSE). Elle ne s’applique pas aux photographies, aux polices ni aux bibliothèques tierces, qui gardent leur propre licence.
