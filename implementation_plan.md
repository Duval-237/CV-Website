# Redesign Cinématographique Complet du CV Website

Transformation radicale du site CV en une expérience immersive, cinématographique et ultra-professionnelle. Le site actuel ne sera plus reconnaissable.

## Concept de Design

**Direction artistique** : "Dark Cinematic Portfolio" — un site sombre, élégant, avec des animations fluides rappelant les génériques de films. Inspiré des portfolios d'agences de design haut de gamme.

**Palette de couleurs** :
- Fond principal : Noir profond (`#050505`) → gris très sombre (`#0a0a0a`)
- Accent : Bleu électrique (`#00a8ff`) + Violet (`#7b2ff7`)
- Texte : Blanc pur (`#ffffff`) + gris clair (`#a0a0a0`)
- Effets de lumière : gradients subtils avec glow

**Typographie** :
- Titres : **"Space Grotesk"** (géométrique, moderne, cinématographique)
- Texte courant : **"Inter"** (lisible, professionnel)

## Changements Majeurs Proposés

### 🎬 Structure & Layout (index.php)

1. **Header** : Navigation minimaliste flottante avec effet glassmorphism noir, logo texte simple "DN.", liens de navigation avec indicateur actif animé
2. **Section Hero** : Plein écran avec :
   - Animation de texte "reveal" cinématographique (le texte apparaît lettre par lettre)
   - Titre géant avec dégradé bleu-violet animé
   - Particules flottantes subtiles en arrière-plan (CSS pur)
   - Photo avec masque circulaire lumineux et effet "glow"
   - Bouton CTA avec effet "pulse" lumineux
3. **Section Profil** : Redesign en layout horizontal avec stats animées (compteurs) et texte avec effet de révélation au scroll
4. **Section Qualifikation** : Timeline verticale cinématographique avec points lumineux connectés par une ligne "laser"
5. **Section Weiterbildung** : Grille de cartes avec effet "tilt 3D" au hover et glow sur les bords
6. **Section Projekte** : Cartes de projet avec fond glassmorphism, numérotation géante en arrière-plan, et animation d'apparition staggered
7. **Section Kompetenzen** : Barres de progression circulaires animées (ou barres avec effet "remplissage lumineux")
8. **Section Sprachen** : Barres de progression avec effet néon/glow
9. **Section Hobbys** : Icônes avec effet de rebond et glow au hover
10. **Footer** : Minimaliste, centré, avec liens sociaux animés

### 🎨 CSS (style.css) — Réécriture Complète

- **Thème** : 100% dark mode par défaut (plus de mode clair)
- **Animations** : Utilisation intensive de `@keyframes`, `animation-timeline: scroll()` (scroll-driven animations), et transitions CSS
- **Effets visuels** :
  - Glassmorphism (`backdrop-filter: blur()`)
  - Effets "glow" avec `box-shadow` et `text-shadow`
  - Gradients animés
  - Grain cinématographique en overlay (bruit CSS)
  - Lignes de scan subtiles (inspiration rétro-futuriste)
- **Layout** : CSS Grid et Flexbox modernes, `clamp()` pour la typographie responsive
- **Scroll animations** : Chaque section se révèle avec un effet unique au scroll

### ⚡ JavaScript (script.js) — Réécriture Complète

- **Intersection Observer** : Remplace scroll-out.js par un système natif plus performant
- **Texte typing effect** : Animation de machine à écrire pour le titre principal
- **Compteurs animés** : Chiffres qui s'incrémentent quand visibles
- **Parallax subtil** : Effet de profondeur sur le hero
- **Navigation active** : Surlignage automatique du lien de nav selon la section visible
- **Smooth scroll** : Scroll fluide natif
- **Cursor custom** : Un curseur personnalisé lumineux (optionnel)

### 📁 Fichiers

#### [MODIFY] [index.php](file:///c:/xampp/htdocs/CV-Website/index.php)
- Restructuration complète du HTML sémantique
- Nouveau header avec navigation redesignée
- Sections réorganisées avec nouvelles classes et structure
- Suppression du SVG complexe du logo → remplacement par texte stylisé
- Ajout de `<canvas>` ou éléments pour les effets de particules CSS
- Footer redesigné

#### [MODIFY] [style.css](file:///c:/xampp/htdocs/CV-Website/style.css)
- Réécriture intégrale
- Nouveau système de design tokens (variables CSS)
- Toutes les animations et effets visuels
- Responsive design modernisé

#### [MODIFY] [script.js](file:///c:/xampp/htdocs/CV-Website/js/script.js)
- Réécriture intégrale
- Intersection Observer API
- Animations JavaScript
- Navigation dynamique

#### [DELETE] [scroll-out.js](file:///c:/xampp/htdocs/CV-Website/js/scroll-out.js)
- Remplacé par Intersection Observer natif (plus léger, plus performant)

## Verification Plan

### Manual Verification
- Ouvrir le site dans le navigateur via `localhost` et vérifier :
  - Toutes les animations se déclenchent correctement
  - Le responsive fonctionne sur mobile/tablette/desktop
  - La navigation est fonctionnelle
  - Toutes les informations du CV sont préservées
  - Le site charge rapidement sans dépendances externes lourdes

> [!IMPORTANT]
> Toutes les informations personnelles (nom, dates, expériences, projets, etc.) seront préservées exactement telles quelles. Seule la présentation visuelle change.

> [!NOTE]
> La bibliothèque `scroll-out.js` sera supprimée et remplacée par l'API native `IntersectionObserver`, plus performante et sans dépendance externe.
