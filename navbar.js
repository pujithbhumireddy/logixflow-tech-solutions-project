document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insert the navbar HTML
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Initialize mobile menu elements AFTER the navbar is loaded
            initializeNavbar();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
});

function initializeNavbar() {
    // Get elements after navbar is loaded
    const mobileMenu = document.querySelector('.navbar-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

    // Make sure elements exist before adding listeners
    if (mobileMenu && navMenu) {
        // Toggle mobile menu
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Handle dropdowns in mobile view
        dropdownItems.forEach(item => {
            const dropdownTrigger = item.querySelector('.dropdown-trigger');
            
            if (dropdownTrigger) {
                dropdownTrigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        item.classList.toggle('active');
                    }
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInside = navMenu.contains(e.target) || mobileMenu.contains(e.target);
            
            if (!isClickInside) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                dropdownItems.forEach(item => item.classList.remove('active'));
            }
        });

        // Reset on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    dropdownItems.forEach(item => item.classList.remove('active'));
                }
            }, 250);
        });
    }
}