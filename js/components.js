// components.js - Injection dynamique de la Navbar et du Footer

const Navbar = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="navbar-logo">
        <span>Bélier</span> d'Or
      </a>
      <button class="mobile-menu-btn" id="mobile-menu-btn">
        <i class="fas fa-bars"></i>
      </button>
      <div class="navbar-links" id="navbar-links">
        <a href="index.html">Accueil</a>
        <a href="menu.html">Menu</a>
        <a href="about.html">À propos</a>
        <a href="gallery.html">Galerie</a>
        <a href="reservation.html">contact</a>
        <a href="order.html" class="btn btn-primary" style="padding: 0.5rem 1rem; color: white;">Commander</a>
      </div>
    </div>
  </nav>
`;

const Footer = `
  <footer class="footer section-dark">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>Bélier d'Or</h3>
          <p>L'expérience culinaire africaine revisitée, au cœur de Yamoussoukro.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h3>Liens Rapides</h3>
          <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="about.html">À propos</a></li>
            <li><a href="gallery.html">Galerie</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><i class="fas fa-map-marker-alt"></i> Yamoussoukro, Côte d'Ivoire</li>
            <li><i class="fas fa-phone-alt"></i> +225 00 00 00 00 00</li>
            <li><i class="fas fa-envelope"></i> contact@belierdor.ci</li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Horaires</h3>
          <ul>
            <li>Lun - Ven : 11h00 - 22h00</li>
            <li>Sam - Dim : 12h00 - 23h30</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Bélier d'Or. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
`;

function injectComponents() {
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');

  if (headerContainer) headerContainer.innerHTML = Navbar;
  if (footerContainer) footerContainer.innerHTML = Footer;

  // Surligner le lien actif
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar-links a');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Event listener pour le menu mobile
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('navbar-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
}

// Initialisation dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', injectComponents);
