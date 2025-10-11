// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Form validation
    const form = document.getElementById('registrationForm');
    if (form) {
        // Custom validation for password match
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        function validatePassword() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity("كلمات المرور غير متطابقة");
            } else {
                confirmPassword.setCustomValidity('');
            }
        }
        
        password.onchange = validatePassword;
        confirmPassword.onkeyup = validatePassword;
        
        // Form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: password.value
            };
            
            // Here you would typically send the data to your server
            console.log('Registration data:', formData);
            
            // Show success message and redirect
            alert('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول.');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, false);
    }
    
    // Update cart count in navbar
    updateCartCount();
});

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
