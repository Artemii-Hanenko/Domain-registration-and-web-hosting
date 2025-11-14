/**
 * Reveal Animations
 * Handles scroll-triggered animations for elements with reveal classes
 */
(function() {
    'use strict';
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers - show all elements immediately
        var revealElements = document.querySelectorAll('.reveal-from-top, .reveal-from-bottom, .reveal-from-side, .reveal-fade');
        revealElements.forEach(function(el) {
            el.classList.add('is-revealed');
        });
        return;
    }
    
    // Intersection Observer options
    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Element appears 100px before visibility
        threshold: 0.1
    };
    
    // Function to handle element intersection
    function handleIntersection(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var element = entry.target;
                var delay = element.getAttribute('data-reveal-delay') || 0;
                
                // Apply delay via CSS variable
                if (delay) {
                    element.style.setProperty('--delay', delay);
                }
                
                // Add class for animation
                setTimeout(function() {
                    element.classList.add('is-revealed');
                }, parseInt(delay));
                
                // Stop observing after appearance
                observer.unobserve(element);
            }
        });
    }
    
    // Create observer
    var observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Find all elements for animation
    var revealElements = document.querySelectorAll('.reveal-from-top, .reveal-from-bottom, .reveal-from-side, .reveal-fade');
    
    // Start observing each element
    revealElements.forEach(function(element) {
        observer.observe(element);
    });
    
    // Animation for hero section - show immediately on load
    var heroElements = document.querySelectorAll('.hero .reveal-from-top, .hero .reveal-from-bottom');
    heroElements.forEach(function(el) {
        setTimeout(function() {
            el.classList.add('is-revealed');
        }, 100);
    });
})();

