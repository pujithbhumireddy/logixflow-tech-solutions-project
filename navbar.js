// Function to handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown-custom');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle dropdown menus in mobile view
    dropdownItems.forEach(item => {
        const dropdownTrigger = item.querySelector('.dropdown-trigger');
        
        dropdownTrigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Reset mobile menu state on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    function toggleMenu() {
        const menu = document.querySelector('.nav-menu-custom');
        const toggle = document.querySelector('.navbar-toggle-custom');
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
});