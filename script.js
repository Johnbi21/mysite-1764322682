// Main JavaScript for YAPEUR.NET

// API Configuration
const API_BASE_URL = 'https://fakestoreapi.com';

// DOM Elements
let productsGrid;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    productsGrid = document.getElementById('products-grid');
    
    // Load flash sale products
    loadFlashSaleProducts();
    
    // Initialize countdown timer
    initializeCountdown();
    
    // Add smooth scrolling
    addSmoothScrolling();
});

// Load flash sale products from API
async function loadFlashSaleProducts() {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE_URL}/products?limit=8`);
        const products = await response.json();
        
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Impossible de charger les produits. Veuillez réessayer.');
    } finally {
        hideLoading();
    }
}

// Display products in grid
function displayProducts(products) {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Re-initialize feather icons for new content
    feather.replace();
}

// Create product card element
function createProductCard(product) {
    const discount = Math.floor(Math.random() * 50) + 10; // Random discount 10-60%
    const discountedPrice = (product.price * (100 - discount) / 100).toFixed(2);
    
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg overflow-hidden animate-slide-in';
    card.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.title}" 
                 class="w-full h-48 object-cover">
            <div class="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
                -${discount}%
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2" title="${product.title}">
                ${product.title}
            </h3>
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                    <span class="discount-price text-lg font-bold">${discountedPrice} MAD</span>
                    <span class="original-price text-sm">${product.price} MAD</span>
                </div>
                <div class="flex items-center text-yellow-400">
                    <i data-feather="star" class="w-4 h-4 fill-current"></i>
                    <span class="text-sm text-gray-600 ml-1">${(Math.random() * 2 + 3).toFixed(1)}</span>
                </div>
            </div>
            <button class="btn-primary w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-300"
                    onclick="addToCart(${product.id})">
                <i data-feather="shopping-cart" class="w-4 h-4 mr-2"></i>
                Ajouter au panier
            </button>
        </div>
    `;
    
    return card;
}

// Initialize countdown timer for flash sales
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const timeLeft = endOfDay - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="bg-orange-600 text-white px-3 py-2 rounded-lg font-mono">${hours.toString().padStart(2, '0')}</div>
                <div class="bg-orange-600 text-white px-3 py-2 rounded-lg font-mono">${minutes.toString().padStart(2, '0')}</div>
                <div class="bg-orange-600 text-white px-3 py-2 rounded-lg font-mono">${seconds.toString().padStart(2, '0')}</div>
            `;
        } else {
            countdownElement.innerHTML = '<div class="text-red-600 font-bold">Terminé!</div>';
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('yapeur-cart')) || [];

function addToCart(productId) {
    // In a real app, we'd get product details from API
    const product = {
        id: productId,
        name: `Produit ${productId}`,
        price: (Math.random() * 500 + 50).toFixed(2),
        quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('yapeur-cart', JSON.stringify(cart));
    showNotification('Produit ajouté au panier!', 'success');
    updateCartCounter();
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.classList.toggle('hidden', totalItems === 0);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Loading states
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.className = 'fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        document.body.removeChild(loading);
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-50 border border-red-200 rounded-lg p-4 text-center';
    errorDiv.innerHTML = `
        <i data-feather="alert-triangle" class="w-8 h-8 text-red-500 mx-auto mb-2"></i>
        <p class="text-red-600">${message}</p>
    `;
    productsGrid.appendChild(errorDiv);
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('input[placeholder*="recherchez"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (query.trim()) {
        // In a real app, this would call a search API
        showNotification(`Recherche pour: "${query}"`, 'info');
        // You could redirect to search results page or filter products
    }
}

// Export functions for use in components
window.YapeurApp = {
    addToCart,
    updateCartCounter,
    showNotification,
    performSearch
};