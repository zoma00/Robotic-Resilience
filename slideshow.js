// Background Slideshow for Egypt Page
(function() {
    'use strict';
    
    let currentIndex = 0;
    let images = [];
    let slideInterval;
    
    function initSlideshow() {
        const slideshow = document.querySelector('.bg-slideshow');
        if (!slideshow) return;
        
        images = Array.from(slideshow.querySelectorAll('img'));
        if (images.length === 0) return;
        
        // Set first image as active
        images[0].classList.add('active');
        
        // Start slideshow
        startSlideshow();
        
        console.log(`Slideshow initialized with ${images.length} images`);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Change image every 4 seconds
    }
    
    function nextSlide() {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image (loop back to start)
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to new image
        images[currentIndex].classList.add('active');
        
        console.log(`Switched to image ${currentIndex + 1} of ${images.length}`);
    }
    
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideshow);
    } else {
        initSlideshow();
    }
    
    // Pause slideshow when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });
    
    // Export for debugging
    window.slideshowDebug = {
        currentIndex: () => currentIndex,
        totalImages: () => images.length,
        nextSlide: nextSlide,
        restart: () => {
            stopSlideshow();
            startSlideshow();
        }
    };
})();