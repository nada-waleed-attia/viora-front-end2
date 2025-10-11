document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    let lastScroll = 0;
    const navbarHeight = navbar.offsetHeight;
    let ticking = false;
    
    // Add padding to body to prevent content from jumping
    body.style.paddingTop = navbarHeight + 'px';
    navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';

    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 10) {
            // At the top of the page
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(30, 35, 38, 0.95)';
            body.style.paddingTop = navbarHeight + 'px';
        } else if (currentScroll > lastScroll && currentScroll > navbarHeight) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
            body.style.paddingTop = '0';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            navbar.style.backgroundColor = 'rgba(30, 35, 38, 0.98)';
            body.style.paddingTop = navbarHeight + 'px';
        }
        
        // Subtle background parallax effect
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        parallax.style.backgroundPositionY = -(scrolled * 0.1) + 'px';
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // Handle mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Show navbar before scrolling
                    navbar.style.transform = 'translateY(0)';
                    navbar.style.opacity = '1';
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
