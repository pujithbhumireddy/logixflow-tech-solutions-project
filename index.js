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
  const footerPlaceholder = document.getElementById("footer-placeholder");
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      footerPlaceholder.innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

// Call the functions to include the navbar and footer
includeNavbar();
includeFooter();