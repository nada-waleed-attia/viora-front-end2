document.addEventListener('DOMContentLoaded', function() {
    // Check if shared cart functions are available
    const useSharedCart = typeof window.addToCart === 'function' && 
                         typeof window.showSuccessMessage === 'function' && 
                         typeof window.updateCartCount === 'function';
    
    // Fallback cart functions if shared ones aren't available
    if (!useSharedCart) {
        console.warn('Shared cart functions not found. Using fallback implementation.');
        
        // Initialize cart in localStorage if it doesn't exist
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        
        // Fallback addToCart function
        window.addToCart = function(product) {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existingItemIndex = cart.findIndex(item => item.id === product.id);
                
                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
                } else {
                    cart.push({...product, quantity: 1});
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                window.updateCartCount();
                window.showSuccessMessage('تمت إضافة المنتج إلى السلة');
            } catch (error) {
                console.error('Error adding to cart:', error);
                window.showSuccessMessage('حدث خطأ أثناء إضافة المنتج إلى السلة', 'error');
            }
        };
        
        // Fallback updateCartCount function
        window.updateCartCount = function() {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                const cartCountElement = document.querySelector('.cart-count');
                
                if (cartCountElement) {
                    cartCountElement.textContent = totalItems;
                    cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
                }
            } catch (error) {
                console.error('Error updating cart count:', error);
            }
        };
        
        // Fallback showSuccessMessage function
        window.showSuccessMessage = function(message, type = 'success') {
            // Remove any existing messages
            document.querySelectorAll('.cart-message').forEach(el => el.remove());
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `cart-message alert alert-${type === 'error' ? 'danger' : 'success'} fixed-top text-center mt-5`;
            messageDiv.textContent = message;
            document.body.appendChild(messageDiv);
            
            // Auto-remove after 3 seconds
            setTimeout(() => messageDiv.remove(), 3000);
        };
    }
    
    // Update cart count on page load
    window.updateCartCount();
    
    // Add click event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.fresh-card');
            if (!card) return;
            
            // Get product ID from data attribute or generate one
            const productId = card.getAttribute('data-product-id') || 
                             'wprod_' + Date.now() + Math.floor(Math.random() * 1000);
            
            const titleElement = card.querySelector('.fresh-card-title');
            const priceElement = card.querySelector('.fresh-card-text');
            const imageElement = card.querySelector('.fresh-card-img');
            
            if (!titleElement || !priceElement || !imageElement) {
                console.error('Missing product information');
                window.showSuccessMessage('خطأ في معلومات المنتج', 'error');
                return;
            }
            
            // Extract price and clean it
            let priceText = priceElement.textContent.trim();
            let price = 0;
            
            try {
                // Remove any non-numeric characters except decimal point
                price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                if (isNaN(price)) throw new Error('Invalid price');
            } catch (error) {
                console.error('Error parsing price:', error);
                window.showSuccessMessage('خطأ في سعر المنتج', 'error');
                return;
            }
            
            const product = {
                id: productId,
                name: titleElement.textContent.trim(),
                price: price,
                image: imageElement.src,
                quantity: 1
            };
            
            // Use shared or fallback addToCart function
            window.addToCart(product);
        });
    });
});
