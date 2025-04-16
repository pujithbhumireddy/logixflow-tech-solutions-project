    document.addEventListener("DOMContentLoaded", function () {
        // Function to include the navbar HTML
        function includeNavbar() {
            const navbarPlaceholder = document.getElementById("navbar-placeholder");
            fetch("navbar.html")
                .then(response => response.text())
                .then(data => {
                    navbarPlaceholder.innerHTML = data;
                    // Initialize navbar events after loading
                    initNavbarEvents();
                })
                .catch(error => console.error("Error loading navbar:", error));
        }
        
        // Function to initialize navbar events
        function initNavbarEvents() {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            const dropdownItems = document.querySelectorAll('.nav-item-dropdown-custom');
            
            if (mobileMenu && navMenu) {
                // Remove existing event listeners if any
                mobileMenu.removeEventListener('click', toggleMobileMenu);
                
                // Add fresh event listener
                mobileMenu.addEventListener('click', toggleMobileMenu);
                
                // Define toggle function within closure to access navMenu
                function toggleMobileMenu() {
                    mobileMenu.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    mobileMenu.setAttribute("aria-expanded", navMenu.classList.contains("active"));
                }
            }
            
            // Handle dropdown menus in mobile view
            dropdownItems.forEach(item => {
                const dropdownTrigger = item.querySelector('.dropdown-trigger');
                
                if (dropdownTrigger) {
                    dropdownTrigger.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            item.classList.toggle('active');
                        }
                    });
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (navMenu && !navMenu.contains(e.target) && mobileMenu && !mobileMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    dropdownItems.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
        }
        
        // Function to include the footer HTML
        function includeFooter() {
            fetch('footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-placeholder').innerHTML = data;
                })
                .catch(error => console.error("Error loading footer:", error));
        }
        
        // Call the functions to include the navbar and footer
        includeNavbar();
        includeFooter();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const navMenu = document.getElementById('nav-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const dropdownItems = document.querySelectorAll('.nav-item-dropdown-custom');
            
            if (window.innerWidth > 768) {
                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
        
        // Global toggle function for inline HTML onclick attributes
        window.toggleMenu = function() {
            const menu = document.getElementById("nav-menu");
            const mobileMenu = document.getElementById("mobile-menu");
            
            // Toggle both elements
            if (menu) menu.classList.toggle("active");
            if (mobileMenu) mobileMenu.classList.toggle("active");
            
            // Set aria-expanded for accessibility
            if (mobileMenu) mobileMenu.setAttribute("aria-expanded", menu.classList.contains("active"));
        };
        
        // Intersection Observer for animations
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => {
            observer.observe(el);
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Lazy load images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    });
    
    // For job details toggle or other expandable content
    function toggleDetails(card) {
        if (!card) return;
        
        const details = card.querySelector(".job-details");
        const toggleButton = card.querySelector(".toggle-button");
        
        if (details) details.classList.toggle("active");
        card.classList.toggle("active");
    }