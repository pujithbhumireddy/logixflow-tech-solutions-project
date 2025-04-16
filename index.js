document.addEventListener("DOMContentLoaded", function () {
    // Debounce function to prevent rapid toggling
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize navbar events
    function initNavbarEvents() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const dropdownItems = document.querySelectorAll('.nav-item-dropdown-custom');

        if (!mobileMenu || !navMenu) {
            console.warn('Navbar elements not found; retrying in 100ms');
            setTimeout(initNavbarEvents, 100);
            return;
        }

        const toggleMenu = debounce(() => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        }, 100);

        mobileMenu.addEventListener('click', toggleMenu);
        mobileMenu.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Handle dropdown menus in mobile view
        dropdownItems.forEach(item => {
            const dropdownTrigger = item.querySelector('.dropdown-trigger');
            if (dropdownTrigger) {
                const toggleDropdown = (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('active');
                        dropdownTrigger.setAttribute('aria-expanded', item.classList.contains('active'));
                        // Reset styles to prevent alignment shifts
                        const dropdownMenu = item.querySelector('.dropdown-menu-custom');
                        if (dropdownMenu) {
                            dropdownMenu.style.margin = '0';
                            dropdownMenu.style.padding = '0';
                            dropdownMenu.style.display = item.classList.contains('active') ? 'flex' : 'none';
                        }
                    }
                };
                dropdownTrigger.addEventListener('click', toggleDropdown);
                dropdownTrigger.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    toggleDropdown(e);
                });
            }
        });

        // Close menu when clicking/tapping outside
        const closeMenuOnOutside = (e) => {
            if (navMenu && !navMenu.contains(e.target) && mobileMenu && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                    const trigger = item.querySelector('.dropdown-trigger');
                    if (trigger) trigger.setAttribute('aria-expanded', 'false');
                });
            }
        };
        document.addEventListener('click', closeMenuOnOutside);
        document.addEventListener('touchstart', closeMenuOnOutside);
    }

    // Include navbar HTML
    function includeNavbar() {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) {
            console.error('Navbar placeholder not found');
            return;
        }
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error ${response.status}: Failed to load navbar.html`);
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initNavbarEvents();
            })
            .catch(error => console.error('Error loading navbar:', error.message));
    }

    // Include footer HTML
    function includeFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Call initialization functions
    includeNavbar();
    includeFooter();

    // Handle window resize
    window.addEventListener('resize', function () {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const dropdownItems = document.querySelectorAll('.nav-item-dropdown-custom');

        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const trigger = item.querySelector('.dropdown-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        }
    });

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
    elements.forEach((el) => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
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