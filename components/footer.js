class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    background: #1e293b;
                    color: white;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .footer-section h3 {
                    color: #3b82f6;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                
                .footer-link {
                    color: #cbd5e1;
                    text-decoration: none;
                    display: block;
                    padding: 0.25rem 0;
                    transition: color 0.3s ease;
                }
                
                .footer-link:hover {
                    color: #3b82f6;
                }
                
                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: #374151;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .social-link:hover {
                    background: #3b82f6;
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            </style>
            <footer class="py-12">
                <div class="footer-content">
                    <div class="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Company Info -->
                        <div class="footer-section">
                            <h3 class="text-xl font-bold">YAPEUR.NET</h3>
                            <p class="text-gray-400 mb-4">Votre boutique en ligne de confiance pour tous vos besoins quotidiens.</p>
                            <div class="flex space-x-3">
                                <a href="#" class="social-link">
                                    <i data-feather="facebook"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="instagram"></i>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Customer Service -->
                        <div class="footer-section">
                            <h3>Service Client</h3>
                            <a href="/contact" class="footer-link">Contactez-nous</a>
                            <a href="/shipping" class="footer-link">Livraison</a>
                            <a href="/returns" class="footer-link">Retours</a>
                            <a href="/faq" class="footer-link">FAQ</a>
                            <a href="/track-order" class="footer-link">Suivi de Commande</a>
                        </div>
                        
                        <!-- About -->
                        <div class="footer-section">
                            <h3>À Propos</h3>
                            <a href="/about" class="footer-link">Qui sommes-nous</a>
                            <a href="/careers" class="footer-link">Carrières</a>
                            <a href="/press" class="footer-link">Presse</a>
                            <a href="/terms" class="footer-link">Conditions d'utilisation</a>
                            <a href="/privacy" class="footer-link">Politique de confidentialité</a>
                        </div>
                        
                        <!-- Payment Methods -->
                        <div class="footer-section">
                            <h3>Paiements Sécurisés</h3>
                            <p class="text-gray-400 mb-4">Nous acceptons toutes les principales méthodes de paiement.</p>
                            <div class="flex flex-wrap gap-2">
                                <div class="bg-white rounded p-1">
                                    <i data-feather="credit-card" class="text-blue-600"></i>
                                </div>
                                <div class="bg-white rounded p-1">
                                    <i data-feather="dollar-sign" class="text-green-600"></i>
                                </div>
                                <div class="bg-white rounded p-1">
                                    <i data-feather="shield" class="text-orange-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Bar -->
                    <div class="border-t border-gray-600 mt-8 pt-8 text-center">
                        <p class="text-gray-400">&copy; 2024 YAPEUR.NET. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);