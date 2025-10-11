// Check if cart.js is loaded and has the required functions
if (typeof addToCart === 'undefined') {
    // Fallback implementation if cart.js is not loaded
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showSuccessMessage('تمت إضافة المنتج إلى السلة');
    }
}

if (typeof updateCartCount === 'undefined') {
    // Fallback implementation for updateCartCount
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
        }
    }
}

if (typeof showSuccessMessage === 'undefined') {
    // Fallback implementation for showSuccessMessage
    function showSuccessMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `cart-message alert alert-${type === 'error' ? 'danger' : 'success'} fixed-top text-center mt-5`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        // Auto-remove the message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the parent product card
            const productCard = button.closest('.fresh-card');
            if (!productCard) return;
            
            // Extract product details
            const productId = productCard.dataset.productId || `product-${Date.now()}`;
            const productName = productCard.querySelector('.fresh-card-title')?.textContent.trim() || 'Product';
            const priceText = productCard.querySelector('.fresh-card-text')?.textContent.trim() || '0';
            const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
            const image = productCard.querySelector('img')?.src || '';
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: price,
                image: image,
                quantity: 1
            };
            
            try {
                // Add to cart
                addToCart(product);
                
                // Update cart count
                updateCartCount();
                
                // Show success message
                showSuccessMessage('تمت إضافة المنتج إلى السلة');
            } catch (error) {
                console.error('Error adding to cart:', error);
                showSuccessMessage('حدث خطأ أثناء إضافة المنتج إلى السلة', 'error');
            }
        });
    });
    
    // Initialize cart count on page load
    updateCartCount();
});
