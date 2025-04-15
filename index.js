    document.addEventListener("DOMContentLoaded", function () {

        // Function to include the navbar HTML
        function includeNavbar() {
            const navbarPlaceholder = document.getElementById("navbar-placeholder");
            fetch("navbar.html")
                .then(response => response.text())
                .then(data => {
                    navbarPlaceholder.innerHTML = data;
                })
                .catch(error => console.error("Error loading navbar:", error));
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
    });
    function toggleMenu() {
        const menu = document.getElementById("nav-menu");
        const isActive = menu.classList.toggle("active");
        document.getElementById("mobile-menu").setAttribute("aria-expanded", isActive);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optionally unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Lazy load images
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    });
    
    function toggleDetails(card) {
        const details = card.querySelector(".job-details");
        const toggleButton = card.querySelector(".toggle-button");
        details.classList.toggle("active");
        card.classList.toggle("active");
    }