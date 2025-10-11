document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const navbarHeight = navbar.offsetHeight;
    
    // Set initial styles without adding padding to body
    navbar.style.transition = 'transform 0.3s ease-in-out';
    navbar.style.transform = 'translateY(0)';
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.right = '0';
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // At the top of the page
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        // Scrolling down
        if (currentScroll > lastScroll && currentScroll > navbarHeight) {
            navbar.style.transform = 'translateY(-100%)';
        } 
        // Scrolling up
        else if (currentScroll < lastScroll) {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Handle mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbar.style.transform = 'translateY(0)';
        });
    }
});
