document.addEventListener("DOMContentLoaded", () => {

    const stylesheets = [
        '../Stylesheet/Navbar.css',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart'
    ];

    stylesheets.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = `
    <nav class="navbar">
      <div class="logo">LOGO</div>
      <div class="navLinks">
        <a href="index.html" data-page="index.html">Home</a>
        <a href="Shop.html" data-page="Shop.html">Shop</a>
        <a href="Checkout.html" data-page="Checkout.html">Checkout</a>
        <a href="About.html" data-page="About.html">About</a>
        <a href="Review.html" data-page="Review.html">Reviews</a>
      </div>
      <div class="nav-icons">
        <a href="Cart.html" data-page="Cart.html">
          <span class="material-symbols-outlined">shopping_cart</span>
        </a>
      </div>
    </nav>
  `;

    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
        const activeLink = document.querySelector(`.navLinks [data-page="${currentPage}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
});