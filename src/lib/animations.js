import { gsap } from "gsap";

// Initialize GSAP animations
export function setupScrollAnimations() {
  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
    gsap.fromTo(section.children, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Hero section animations
export function animateHeroElements(heroRef) {
  if (!heroRef) return;

  const tl = gsap.timeline();
  
  tl.from('.hero-title', { 
    y: 50, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power2.out' 
  })
  .from('.hero-subtitle', { 
    y: 30, 
    opacity: 0, 
    duration: 0.6, 
    ease: 'power2.out' 
  }, '-=0.4')
  .from('.hero-cta', { 
    y: 20, 
    opacity: 0, 
    duration: 0.4, 
    ease: 'back.out(1.7)' 
  }, '-=0.2');

  // Animate floating elements
  gsap.to('.floating-element', {
    y: -20,
    duration: 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.5
  });
}

// Product card animations
export function animateProductCards() {
  gsap.fromTo('.product-card', 
    { scale: 0.8, opacity: 0 },
    { 
      scale: 1, 
      opacity: 1, 
      duration: 0.4, 
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }
  );
}

// Cart animation
export function animateCartBadge() {
  gsap.to('.cart-badge', {
    scale: 1.3,
    duration: 0.2,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out'
  });
}

// Smooth scroll utility
export function smoothScrollTo(target, offset = 0) {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: offset
    },
    ease: 'power2.inOut'
  });
}

// Page transition animation
export function animatePageTransition() {
  const tl = gsap.timeline();
  
  tl.to('body', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.inOut'
  })
  .to('body', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.inOut'
  });
  
  return tl;
}

// Modal animations
export function animateModalIn(element) {
  gsap.fromTo(element,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
  );
}

export function animateModalOut(element, onComplete) {
  gsap.to(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.inOut',
    onComplete
  });
}

// Filter animation
export function animateFilterChange() {
  gsap.fromTo('.product-card', 
    { y: 30, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }
  );
}

// Loading animation
export function createLoadingAnimation(element) {
  return gsap.to(element, {
    rotation: 360,
    duration: 1,
    ease: 'none',
    repeat: -1
  });
}

// Button hover animations
export function setupButtonAnimations() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}
