class CustomNavigation extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    width: 100%;
                    z-index: 1000;
                }
                
                .nav-container {
                    background: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                }
                
                .nav-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .logo {
                    color: #2563eb;
                    font-weight: 700;
                    font-size: 1.5rem;
                    text-decoration: none;
                }
                
                .nav-link {
                    color: #374151;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                
                .nav-link:hover {
                    color: #2563eb;
                    background-color: #f3f4f6;
                }
                
                .mobile-menu {
                    display: none;
                    background: white;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .mobile-menu.open {
                    display: block;
                }
                
                .cart-badge {
                    background-color: #dc2626;
                    color: white;
                    font-size: 0.75rem;
                    padding: 0.125rem 0.375rem;
                    border-radius: 9999px;
                    position: absolute;
                    top: -0.5rem;
                    right: -0.5rem;
                }
                
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none;
                    }
                    
                    .mobile-toggle {
                        display: block;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-toggle {
                        display: none;
                    }
                }
            </style>
            <nav class="nav-container">
                <div class="nav-content">
                    <div class="flex items-center justify-between py-4">
                        <!-- Logo -->
                        <a href="/" class="logo">
                            YAPEUR.NET
                        </a>
                        
                        <!-- Desktop Navigation -->
                        <div class="desktop-nav flex items-center space-x-6">
                            <a href="/" class="nav-link">Accueil</a>
                            <a href="/categories" class="nav-link">Catégories</a>
                            <a href="/flash-sales" class="nav-link text-orange-600 font-semibold">Ventes Flash</a>
                            <a href="/nouveautes" class="nav-link">Nouveautés</a>
                            
                            <!-- User Actions -->
                            <div class="flex items-center space-x-4">
                                <a href="/wishlist" class="nav-link">
                                    <i data-feather="heart"></i>
                                </a>
                                
                                <a href="/cart" class="nav-link relative">
                                    <i data-feather="shopping-cart"></i>
                                    <span class="cart-badge hidden" id="cart-counter">0</span>
                                </a>
                                
                                <a href="/account" class="nav-link">
                                    <i data-feather="user"></i>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Mobile Toggle -->
                        <button class="mobile-toggle text-gray-600">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu -->
                    <div class="mobile-menu">
                        <div class="py-2 space-y-1">
                            <a href="/" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Accueil</a>
                            <a href="/categories" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Catégories</a>
                            <a href="/flash-sales" class="block px-4 py-2 text-orange-600 font-semibold">Ventes Flash</a>
                            <a href="/nouveautes" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Nouveautés</a>
                            <a href="/wishlist" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Liste de souhaits</a>
                            <a href="/cart" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Panier</a>
                            <a href="/account" class="block px-4 py-2 text-gray-800 hover:bg-blue-50">Mon Compte</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        // Add mobile menu toggle functionality
        this.initializeMobileMenu();
        
        // Initialize cart counter
        this.updateCartCounter();
    }
    
    initializeMobileMenu() {
        const toggleButton = this.shadowRoot.querySelector('.mobile-toggle');
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        
        if (toggleButton && mobileMenu) {
            toggleButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                // Update icon
                const icon = toggleButton.querySelector('i');
                if (mobileMenu.classList.contains('open')) {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace();
            });
        }
    }
    
    updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('yapeur-cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const counter = this.shadowRoot.getElementById('cart-counter');
        
        if (counter) {
            counter.textContent = totalItems;
            counter.classList.toggle('hidden', totalItems === 0);
        }
    }
}

customElements.define('custom-navigation', CustomNavigation);