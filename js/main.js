// main.js - Logique globale (animations, interactions)

document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animation au scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animation une seule fois
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // Logic Carrousel Hero
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let currentIdx = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIdx = index;
  }

  window.currentSlide = function(index) {
    clearInterval(slideInterval);
    showSlide(index);
    startAutoSlide();
  };

  function nextSlide() {
    let next = (currentIdx + 1) % slides.length;
    showSlide(next);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length > 0) {
    startAutoSlide();
  }
});
