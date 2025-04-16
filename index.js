document.addEventListener('DOMContentLoaded', () => {
    // Function to load navbar.html into the placeholder
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
                initializeNavbar();
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Function to load footer.html into the placeholder
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // Function to initialize navbar functionality
    function initializeNavbar() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        if (window.innerWidth <= 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const dropbtn = dropdown.querySelector('.dropbtn');
                if (dropbtn) {
                    dropbtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    });
                }
            });
        }
    }

    // Function to toggle job details
    window.toggleDetails = function(element) {
        const jobDetails = element.querySelector('.job-details');
        const toggleButton = element.querySelector('.toggle-button');
        if (jobDetails && toggleButton) {
            jobDetails.classList.toggle('active');
            element.classList.toggle('active');
        }
    };

    // Intersection Observer for animate-on-scroll
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});