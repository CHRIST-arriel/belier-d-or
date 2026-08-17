// cart.js - Logique du panier de commande

let cart = [];

const products = [
  { id: 1, name: "Attiéké Poisson Braisé", price: 8500, category: "plats", img: "assets/images/repas/758690933_1109988191353872_913737348228278992_n.jpg", desc: "Poisson braisé, attiéké, légumes." },
  { id: 2, name: "Foutou Sauce Graine", price: 7000, category: "plats", img: "assets/images/repas/Gemini_Generated_Image_z7e9lez7e9lez7e9.jpg", desc: "Foutou banane, sauce graine." },
  { id: 3, name: "Alloco & Poulet DG", price: 9000, category: "plats", img: "assets/images/repas/731068411_1080514020967956_2629651091572354681_n.jpg", desc: "Plantains frites, poulet mijoté." },
  { id: 4, name: "Crevettes Sautées", price: 10500, category: "plats", img: "assets/images/repas/730140448_1080513914301300_3156922798997355370_n.jpg", desc: "Crevettes fraîches sautées aux épices." },
  { id: 5, name: "Pastels de Poisson", price: 3500, category: "entrees", img: "assets/images/repas/748278502_1099263969092961_6052986551045844083_n.jpg", desc: "6 chaussons farcis, sauce maison." },
  { id: 6, name: "Spaghetti Bolognaise", price: 6000, category: "plats", img: "assets/images/repas/Gemini_Generated_Image_2q9eij2q9eij2q9e.jpg", desc: "Spaghetti, viande hachée, fromage." },
  { id: 7, name: "Jus de Bissap", price: 1500, category: "boissons", img: "assets/images/repas/731834833_1080514477634577_5061267289370442657_n.jpg", desc: "Fleur d'hibiscus, menthe fraîche." },
  { id: 8, name: "Jus de Gingembre", price: 1500, category: "boissons", img: "assets/images/repas/Gemini_Generated_Image_fmswmtfmswmtfmsw.jpg", desc: "Gingembre frais, citron, miel." }
];

function initOrderPage() {
  renderProducts('all');
  updateCartUI();

  // Filtres
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.category);
    });
  });

  // Toggle cart mobile
  const toggleBtn = document.getElementById('cart-toggle');
  const cartSidebar = document.querySelector('.cart-sidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      cartSidebar.classList.toggle('open');
    });
  }
}

function renderProducts(category) {
  const grid = document.getElementById('order-grid');
  if (!grid) return;

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(p => `
    <div class="order-item fade-in visible">
      <div class="order-item-img" style="background-image: url('${p.img}')"></div>
      <div class="order-item-content">
        <h3 class="order-item-title">${p.name}</h3>
        <p class="order-item-price">${p.price.toLocaleString()} FCFA</p>
        <p class="order-item-desc">${p.desc}</p>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Ajouter</button>
      </div>
    </div>
  `).join('');
}

window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  // Notification visuelle
  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = 'Ajouté !';
  btn.classList.replace('btn-primary', 'btn-whatsapp');
  setTimeout(() => {
    btn.innerText = originalText;
    btn.classList.replace('btn-whatsapp', 'btn-primary');
  }, 1000);
};

window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  updateCartUI();
};

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const cartCountEl = document.getElementById('cart-count');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">Votre panier est vide.</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div style="font-weight:600;">${item.name}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div style="font-weight:700;">${(item.price * item.quantity).toLocaleString()} FCFA</div>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 1500 : 0;
  
  subtotalEl.innerText = `${subtotal.toLocaleString()} FCFA`;
  totalEl.innerText = `${(subtotal + delivery).toLocaleString()} FCFA`;
  
  if (cartCountEl) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.innerText = totalQty;
    cartCountEl.style.display = totalQty > 0 ? 'flex' : 'none';
  }
}

window.simulateCheckout = function() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  const total = document.getElementById('total').innerText;
  alert(`Commande simulée avec succès !\nMontant total : ${total}\nMerci de votre confiance !`);
  cart = [];
  updateCartUI();
  document.querySelector('.cart-sidebar').classList.remove('open');
};

document.addEventListener('DOMContentLoaded', initOrderPage);
