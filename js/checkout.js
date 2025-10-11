// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    loadCartItems();
    
    // Update order summary
    updateOrderSummary();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (!orderItemsContainer) return;
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p class="text-muted text-center py-3">لا توجد عناصر في السلة</p>';
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}">
            <div class="order-item-details">
                <div class="order-item-title">${item.name}</div>
                <div class="order-item-quantity">الكمية: ${item.quantity || 1}</div>
                <div class="order-item-price">${(item.price * (item.quantity || 1)).toFixed(2)} ج.م</div>
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
}

// Update order summary with totals
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
    
    // Default shipping cost
    const shipping = 50;
    const total = subtotal + shipping;
    
    // Update the DOM
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const grandTotalElement = document.getElementById('grandTotal');
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)} ج.م`;
    if (shippingElement) shippingElement.textContent = `${shipping.toFixed(2)} ج.م`;
    if (grandTotalElement) grandTotalElement.textContent = `${total.toFixed(2)} ج.م`;
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone1: document.getElementById('phone1').value,
        phone2: document.getElementById('phone2').value,
        governorate: document.getElementById('governorate').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value,
        orderItems: JSON.parse(localStorage.getItem('cart')) || [],
        orderTotal: document.getElementById('grandTotal').textContent,
        orderDate: new Date().toISOString(),
        orderStatus: 'pending'
    };
    
    // Here you would typically send this data to your server
    console.log('Order submitted:', formData);
    
    // Show success message
    alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً لتأكيد التفاصيل.');
    
    // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Redirect to thank you page or home
    window.location.href = 'thank-you.html';
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        if (cartCount > 0) {
            element.textContent = cartCount;
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Initialize cart count on page load
updateCartCount();
