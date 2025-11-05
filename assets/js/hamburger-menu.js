(function() {
  'use strict';

  // Initialize hamburger menu
  function initHamburgerMenu() {
    // Create hamburger menu HTML structure
    const hamburgerHTML = `
      <div class="hamburger-menu" id="hamburger-menu">
        <div class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div class="nav-overlay" id="nav-overlay"></div>
      
      <div class="mobile-nav-sidebar" id="mobile-nav-sidebar">
        <div class="mobile-nav-header">
          <h2 class="mobile-nav-title">🧭 Robotic Resilience</h2>
        </div>
        <nav class="mobile-nav-links" id="mobile-nav-links">
          <!-- Navigation links will be populated here -->
        </nav>
      </div>
    `;
    
    // Insert hamburger menu into body
    document.body.insertAdjacentHTML('beforeend', hamburgerHTML);
    
    // Get existing navigation links
    const existingNav = document.querySelector('.header-nav-links');
    const mobileNavLinks = document.getElementById('mobile-nav-links');
    
    if (existingNav && mobileNavLinks) {
      // Copy navigation links to mobile menu
      const links = existingNav.querySelectorAll('a');
      links.forEach(link => {
        const mobileLink = link.cloneNode(true);
        
        // Add active class to current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const linkHref = mobileLink.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
          mobileLink.classList.add('active');
        }
        
        mobileNavLinks.appendChild(mobileLink);
      });
    }
    
    // Get menu elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Toggle menu function
    function toggleMenu() {
      const isActive = hamburgerMenu.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    }
    
    function openMenu() {
      hamburgerMenu.classList.add('active');
      mobileNavSidebar.classList.add('active');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
      hamburgerMenu.classList.remove('active');
      mobileNavSidebar.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Event listeners
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', toggleMenu);
    }
    
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on navigation links
    if (mobileNavLinks) {
      mobileNavLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
          closeMenu();
        }
      });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
    
    // Close menu on window resize if it gets too wide
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1200) {
        closeMenu();
      }
    });
  }
  
  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }
})();