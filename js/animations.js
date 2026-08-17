// js/animations.js - GSAP Animations pour Bélier d'Or

document.addEventListener("DOMContentLoaded", (event) => {
  // Enregistrement du plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Configuration globale pour respecter l'accessibilité (prefers-reduced-motion)
  let mm = gsap.matchMedia();

  mm.add("(min-width: 320px)", () => {
    // 1. Scroll Reveal classique (subtle fade & slide up)
    // On cible tous les éléments avec la classe .fade-in, sauf s'ils font partie d'une grille (pour le stagger)
    const fadeElements = gsap.utils.toArray('.fade-in:not(.menu-category):not(.specialities-grid .fade-in)');
    
    fadeElements.forEach((el) => {
      // Pour éviter les conflits avec la CSS existante, on force l'état initial avec set
      gsap.set(el, { opacity: 0, y: 30 });
      
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Déclenchement quand l'élément est à 85% du viewport
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // 2. Stagger Animations (Grilles, Menus, Spécialités)
    // Spécialités sur la page d'accueil
    const specCards = gsap.utils.toArray('.speciality-card');
    if (specCards.length > 0) {
      gsap.set(specCards, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.specialities-grid',
        start: 'top 80%',
        animation: gsap.to(specCards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }),
        toggleActions: "play none none reverse"
      });
    }

    // Grille de Menu
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
      const items = category.querySelectorAll('.menu-item');
      if(items.length > 0) {
        gsap.set(items, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: category,
          start: 'top 85%',
          animation: gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power1.out"
          }),
          toggleActions: "play none none none" // Joue une seule fois
        });
      }
    });

    // Grille de Galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
      gsap.set(galleryItems, { opacity: 0, scale: 0.95 });
      ScrollTrigger.create({
        trigger: '.gallery-grid',
        start: 'top 85%',
        animation: gsap.to(galleryItems, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.2)"
        }),
        toggleActions: "play none none reverse"
      });
    }
  });

  // Pour les utilisateurs ayant activé "Réduire les animations"
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set('.fade-in, .speciality-card, .menu-item, .gallery-item', { opacity: 1, y: 0, scale: 1 });
  });
});
