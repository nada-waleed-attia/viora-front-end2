// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
    
    if (contactForm) {
        // Insert success message after the form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Add focus class when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus class when input loses focus
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const terms = document.getElementById('terms');
            
            let isValid = true;
            
            // Reset previous error states
            document.querySelectorAll('.error').forEach(el => el.remove());
            document.querySelectorAll('.error-highlight').forEach(el => {
                el.classList.remove('error-highlight');
            });
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (optional)
            if (phone.value.trim() && !/^\+?[\d\s-]{10,}$/.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message should be at least 10 characters long');
                isValid = false;
            }
            
            // Validate terms
            if (!terms.checked) {
                const termsError = document.createElement('div');
                termsError.className = 'error';
                termsError.textContent = 'You must agree to the privacy policy';
                termsError.style.color = '#e53e3e';
                termsError.style.fontSize = '0.75rem';
                termsError.style.marginTop = '4px';
                terms.parentNode.insertBefore(termsError, terms.nextSibling);
                terms.parentElement.classList.add('error-highlight');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = '#e53e3e';
        error.style.fontSize = '0.75rem';
        error.style.marginTop = '4px';
        error.textContent = message;
        
        formGroup.classList.add('error-highlight');
        input.style.borderColor = '#e53e3e';
        
        // Add after the input
        formGroup.appendChild(error);
    }
    
    // Initialize form fields
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input && input.value) {
            group.classList.add('focused');
        }
    });
});
