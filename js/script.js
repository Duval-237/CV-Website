document.addEventListener('DOMContentLoaded', () => {
  // Sélection des éléments du DOM qui seront utilisés dans plusieurs parties du script.
  const revealItems = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('main section[id]');
  const toggle = document.querySelector('.toggle');
  const nav = document.querySelector('.main-nav');
  const animatedCounters = document.querySelectorAll('[data-count]');
  const storageKeys = {
    scroll: 'cv-last-scroll'
  };

  // ---------------------------------------------------------------------------
  // 1) Helpers
  //    Ce bloc contient les fonctions utilitaires utilisées par les autres
  //    parties du script, notamment la mise à jour de l'état actif du menu
  //    et la restauration du scroll après un rafraîchissement.
  // ---------------------------------------------------------------------------
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', targetId === id);
    });
  };

  // ---------------------------------------------------------------------------
  // 1) Helpers (suite)
  //    La fonction suivante restaure la position de scroll enregistrée dans
  //    sessionStorage pour garder l’utilisateur à l’endroit où il était.
  // ---------------------------------------------------------------------------
  const restoreScrollPosition = () => {
    const savedScrollY = Number(sessionStorage.getItem(storageKeys.scroll) || 0);

    if (savedScrollY > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, left: 0, behavior: 'auto' });
      });
    }
  };

  // ---------------------------------------------------------------------------
  // 2) Animation des éléments au scroll avec IntersectionObserver.
  //    Cette approche est plus légère et plus performante que des bibliothèques
  //    externes comme scroll-out.js.
  // ---------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    // Observer principal pour les éléments ayant la classe .reveal.
    // Quand un élément entre dans la zone visible, on lui ajoute la classe
    // .is-visible et on arrête de l'observer pour éviter des recalculs inutiles.
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));

    // Observer dédié à la navigation principale.
    // Il permet de savoir quelle section est actuellement visible dans le viewport
    // et d'appliquer automatiquement la classe .active au bon lien du menu.
    // On trie les entrées visibles par ratio pour garder le lien le plus pertinent
    // lorsqu'il y a plusieurs sections dans la zone visible.
    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        const id = visibleEntries[0].target.getAttribute('id');
        setActiveLink(id);
      }
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-10% 0px -35% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver.
    // Dans ce cas, on affiche directement tous les éléments révelés.
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // ---------------------------------------------------------------------------
  // 3) Animation des compteurs numériques.
  //    La valeur cible est lue depuis l'attribut data-count sur chaque élément.
  //    Exemple : data-count="5" affichera progressivement 0, 1, 2, ..., 5.
  // ---------------------------------------------------------------------------
  const animateCounter = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = target >= 10 ? '+' : '';
    let current = 0;
    const step = Math.ceil(target / 32);

    const tick = () => {
      current += step;

      if (current >= target) {
        element.textContent = `${target}${suffix}`;
        return;
      }

      element.textContent = `${current}${suffix}`;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // Le compteur est lancé uniquement lorsque l'élément devient visible.
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  animatedCounters.forEach((counter) => counterObserver.observe(counter));

  // ---------------------------------------------------------------------------
  // 4) Gestion du menu mobile.
  //    Le bouton toggle contrôle l'ouverture/fermeture de la navigation.
  //    On met aussi à jour l'attribut aria-expanded pour l'accessibilité.
  // ---------------------------------------------------------------------------
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        // Quand l'utilisateur clique sur un lien du menu, on met immédiatement
        // à jour l'état actif pour que le bon bouton reçoive la classe .active
        // et que la barre décorative sous le menu corresponde au bon item.
        const id = link.getAttribute('href')?.replace('#', '') || 'home';
        const targetSection = document.getElementById(id);

        setActiveLink(id);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // On nettoie l'URL pour éviter qu'un hash persiste et force le navigateur
        // à revenir vers la section au prochain rafraîchissement.
        history.replaceState(null, '', window.location.pathname);

        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 5) Restauration de la position après un rafraîchissement.
  //    On sauvegarde à chaque déplacement du scroll la position exacte.
  //    Au chargement de la page, on restaure cette position pour éviter que
  //    le site ne revienne automatiquement en haut.
  // ---------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    sessionStorage.setItem(storageKeys.scroll, String(window.scrollY));
  }, { passive: true });

  restoreScrollPosition();

  // ---------------------------------------------------------------------------
  // 6) Copyright dynamique.
  //    On met à jour automatiquement l'année affichée dans le footer.
  // ---------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');

  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `Copyright © ${currentYear} Duval Nzouekeu`;
  }

  // ---------------------------------------------------------------------------
  // 7) Effet 3D léger sur l'image hero.
  //    On récupère la position de la souris relative à l'image pour appliquer
  //    une rotation subtile en fonction du mouvement du curseur.
  // ---------------------------------------------------------------------------
  const heroImage = document.querySelector('.bximg');

  if (heroImage) {
    heroImage.addEventListener('pointermove', (event) => {
      const rect = heroImage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      // Rotation douce sur les axes X et Y pour donner un effet premium.
      heroImage.style.transform = `perspective(1200px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
    });

    heroImage.addEventListener('pointerleave', () => {
      // Réinitialisation de la transformation lorsque le curseur quitte l'image.
      heroImage.style.transform = '';
    });
  }
});
