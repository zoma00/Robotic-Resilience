// Background Slideshow Functionality
(function() {
  'use strict';
  
  let currentSlide = 0;
  let slideInterval;
  const SLIDE_DURATION = 4000; // 4 seconds per slide
  
  function initializeSlideshow() {
    const slideshow = document.querySelector('.bg-slideshow');
    const slides = slideshow ? slideshow.querySelectorAll('img') : [];
    
    if (slides.length === 0) return;
    
    // Set first slide as active
    slides[0].classList.add('active');
    currentSlide = 0;
    
    // Start automatic slideshow
    startSlideshow(slides);
    
    // Add visibility change handler to pause/resume
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopSlideshow();
      } else {
        startSlideshow(slides);
      }
    });
  }
  
  function startSlideshow(slides) {
    if (slides.length <= 1) return; // No need for slideshow with 1 or 0 images
    
    stopSlideshow(); // Clear any existing interval
    
    slideInterval = setInterval(function() {
      nextSlide(slides);
    }, SLIDE_DURATION);
  }
  
  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }
  
  function nextSlide(slides) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlideshow);
  } else {
    initializeSlideshow();
  }
  
})();