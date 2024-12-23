document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropbtn');
        
        dropdownBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            navbarMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbarMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});