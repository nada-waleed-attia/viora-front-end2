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
        messageDiv.className = `cart-message alert alert-${type === 'error' ? 'danger' : 'success'} fixed-top text-center mt-5`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        // Auto-remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // Function to update cart count in navbar
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            
            // Update all cart count elements
            document.querySelectorAll('.cart-count').forEach(element => {
                element.textContent = cartCount;
                element.style.display = cartCount > 0 ? 'inline-block' : 'none';
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
