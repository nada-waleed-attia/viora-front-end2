// cart.js - Shared cart functionality for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Update cart count on page load
    updateCartCount();
    
    // Function to add item to cart
    function addToCart(product) {
        try {
            if (!product || !product.id || !product.name || product.price === undefined) {
                console.error('Invalid product data:', product);
                return;
            }
            
            let cart = [];
            try {
                const cartData = localStorage.getItem('cart');
                cart = cartData ? JSON.parse(cartData) : [];
                if (!Array.isArray(cart)) cart = [];
            } catch (e) {
                console.error('Error loading cart:', e);
                cart = [];
            }
            
            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item => item && item.id === product.id);
            
            if (existingItemIndex !== -1) {
                // Update quantity if item exists
                cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
            } else {
                // Add new item to cart
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || '',
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showSuccessMessage('تمت إضافة المنتج إلى السلة');
            
        } catch (error) {
            console.error('Error in addToCart:', error);
            showSuccessMessage('حدث خطأ أثناء إضافة المنتج', 'error');
        }
    }
    
    // Show success/error message
    function showSuccessMessage(message, type = 'success') {
        // Remove any existing messages
        const existingMessage = document.querySelector('.cart-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `cart-message`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: ${type === 'error' ? '#dc3545' : '#28a745'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-size: 1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
        icon.style.fontSize = '1.2rem';
        messageDiv.appendChild(icon);
        
        // Add text
        const text = document.createElement('span');
        text.textContent = message;
        messageDiv.appendChild(text);
        
        document.body.appendChild(messageDiv);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('#cart-message-style')) {
            style.id = 'cart-message-style';
            document.head.appendChild(style);
        }
        
        // Auto-remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }
    
    // Function to update cart count in navbar
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            
            // Update all cart count elements
            document.querySelectorAll('.cart-count').forEach(element => {
                const oldCount = parseInt(element.textContent) || 0;
                element.textContent = cartCount;
                element.style.display = cartCount > 0 ? 'flex' : 'none';
                
                // Add bounce animation when count increases
                if (cartCount > oldCount) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = 'bounce 0.5s ease';
                    }, 10);
                }
            });
        } catch (e) {
            console.error('Error updating cart count:', e);
        }
    }
    
    // Make addToCart function available globally
    window.addToCart = addToCart;
    window.updateCartCount = updateCartCount;
    window.showSuccessMessage = showSuccessMessage;
});
