document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Update cart count on page load
    updateCartCount();
    
    // Add event listeners to all Add to Cart buttons
    document.querySelectorAll('.shop-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.offer-card');
            if (!card) return;
            
            const titleElement = card.querySelector('h3');
            const priceElement = card.querySelector('.current-price');
            const imageElement = card.querySelector('.product-image');
            
            if (!titleElement || !priceElement || !imageElement) return;
            
            const product = {
                id: card.dataset.productId || 'offer_' + Date.now(),
                name: titleElement.textContent.trim(),
                price: parseFloat(priceElement.textContent.replace(/[^0-9.]/g, '')),
                image: imageElement.src,
                quantity: 1
            };
            
            addToCart(product);
            showSuccessMessage('تمت إضافة المنتج إلى السلة');
        });
    });
    
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
                    image: product.image,
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
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
            
            // Update cart count in navbar if it exists
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                cartCountElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
            }
        } catch (e) {
            console.error('Error updating cart count:', e);
        }
    }
});