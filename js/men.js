// Initialize cart functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sliders
    initSliders();
    
    // Initialize Add to Cart functionality
    initAddToCart();
    
    function initSliders() {
        // Fresh Vibes Slider
        initSlider('fresh');
        // Summer Vibes Slider
        initSlider('summer');
        // Night Vibes Slider
        initSlider('night');
        // Winter Vibes Slider
        initSlider('winter');
    }
    
    function initSlider(type) {
        const track = document.querySelector(`.${type}-cards-slider .${type}-cards-track`);
        if (!track) return;
        
        const slider = track.closest(`.${type}-cards-slider`);
        const nextBtn = slider.querySelector(`#${type}SliderNext`);
        const prevBtn = slider.querySelector(`#${type}SliderPrev`);
        const cards = track.querySelectorAll('.fresh-card');
        
        // If no cards found, exit
        if (cards.length === 0) return;
        
        const card = cards[0];
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth + 
                         parseInt(cardStyle.marginLeft) + 
                         parseInt(cardStyle.marginRight);
        
        let currentPosition = 0;
        let visibleCards = 4; // Default number of visible cards
        
        // Adjust visible cards based on screen size
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 992) {
            visibleCards = 2;
        } else if (window.innerWidth < 1200) {
            visibleCards = 3;
        }
        
        // Calculate the maximum scroll position
        const maxPosition = Math.max(0, (cards.length - visibleCards) * cardWidth);
        
        // Function to update button states
        function updateButtonStates() {
            if (prevBtn) {
                prevBtn.disabled = currentPosition >= 0;
                prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            }
            if (nextBtn) {
                nextBtn.disabled = currentPosition <= -maxPosition || maxPosition <= 0;
                nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
            }
        }
        
        // Next button click handler
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Calculate the next position
                currentPosition -= cardWidth * visibleCards;
                
                // Don't go beyond the last card
                if (currentPosition < -maxPosition) {
                    currentPosition = -maxPosition;
                }
                
                // Apply the transform
                track.style.transform = `translateX(${currentPosition}px)`;
                updateButtonStates();
            });
        }
        
        // Previous button click handler
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Calculate the previous position
                currentPosition += cardWidth * visibleCards;
                
                // Don't go before the first card
                if (currentPosition > 0) {
                    currentPosition = 0;
                }
                
                // Apply the transform
                track.style.transform = `translateX(${currentPosition}px)`;
                updateButtonStates();
            });
        }
        
        
        // Initial button state
        updateButtonStates();
        
        // Function to handle responsive behavior
        function handleResize() {
            // Update visible cards count based on screen size
            if (window.innerWidth < 768) {
                visibleCards = 1;
            } else if (window.innerWidth < 992) {
                visibleCards = 2;
            } else if (window.innerWidth < 1200) {
                visibleCards = 3;
            } else {
                visibleCards = 4;
            }
            
            // Recalculate card width
            const card = cards[0];
            if (!card) return;
            
            const cardStyle = window.getComputedStyle(card);
            const newCardWidth = card.offsetWidth + 
                               parseInt(cardStyle.marginLeft) + 
                               parseInt(cardStyle.marginRight);
            
            // Recalculate max position
            const newMaxPosition = Math.max(0, (cards.length - visibleCards) * newCardWidth);
            
            // Reset position if needed
            if (Math.abs(currentPosition) > newMaxPosition) {
                currentPosition = -newMaxPosition;
            }
            
            // Apply the transform
            track.style.transform = `translateX(${currentPosition}px)`;
            
            // Update button states
            updateButtonStates();
        }
        
        // Initial setup
        handleResize();
        
        // Handle window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 250);
        });
    }
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Function to initialize Add to Cart functionality
    function initAddToCart() {
        // Add click event listener to all Add to Cart buttons
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-cart-btn')) {
                event.preventDefault();
                event.stopPropagation();
                
                // Find the closest product card
                const card = event.target.closest('.fresh-card');
                if (!card) return;
                
                // Get product details
                const productName = card.querySelector('.fresh-card-title')?.textContent || 'Product';
                const priceText = card.querySelector('.fresh-card-text')?.textContent || '0';
                const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
                const image = card.querySelector('.fresh-card-img')?.src || '';
                const productId = card.getAttribute('data-product-id') || `prod_${Date.now()}`;
                
                // Create product object
                const product = {
                    id: productId,
                    name: productName,
                    price: price,
                    image: image,
                    quantity: 1
                };
                
                // Add to cart
                if (typeof addToCart === 'function') {
                    addToCart(product);
                } else {
                    console.error('addToCart function is not defined');
                }
            }
        });
    }

    // Update cart count on page load
    updateCartCount();

    // Add event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                const card = this.closest('.fresh-card');
                if (!card) {
                    console.error('Could not find parent card element');
                    showSuccessMessage('حدث خطأ في إضافة المنتج', 'error');
                    return;
                }
                
                const titleElement = card.querySelector('.fresh-card-title');
                const priceElement = card.querySelector('.fresh-card-text');
                const imageElement = card.querySelector('.fresh-card-img');
                
                if (!titleElement || !priceElement || !imageElement) {
                    console.error('Could not find required product elements');
                    showSuccessMessage('حدث خطأ في بيانات المنتج', 'error');
                    return;
                }
                
                // Extract price, handling different formats
                const priceText = priceElement.textContent.trim();
                const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
                
                const product = {
                    id: card.dataset.productId || 'prod_' + Date.now() + Math.floor(Math.random() * 1000),
                    name: titleElement.textContent.trim(),
                    price: price,
                    image: imageElement.src,
                    quantity: 1
                };
                
                // Add to cart using the shared cart functionality
                if (typeof addToCart === 'function') {
                    addToCart(product);
                } else {
                    console.error('addToCart function not found. Make sure cart.js is loaded.');
                    // Fallback to direct cart update if cart.js is not available
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    const existingItemIndex = cart.findIndex(item => item.id === product.id);
                    
                    if (existingItemIndex !== -1) {
                        cart[existingItemIndex].quantity += 1;
                    } else {
                        cart.push(product);
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    showSuccessMessage('تمت إضافة المنتج إلى السلة');
                }
                
            } catch (error) {
                console.error('Error adding to cart:', error);
                if (typeof showSuccessMessage === 'function') {
                    showSuccessMessage('حدث خطأ أثناء إضافة المنتج', 'error');
                }
            }
        });
    });
});

function showSuccessMessage(message, type = 'success') {
    const existingMessage = document.querySelector('.cart-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `cart-message alert alert-${type === 'error' ? 'danger' : 'success'} fixed-top text-center mt-5`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
        }
    } catch (e) {
        console.error('Error updating cart count:', e);
    }
}
