// GSAP Animations

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Line Drawing Animation
function animateLines() {
  // Анимация для всех элементов с классом line-w
  gsap.utils.toArray('.line-w').forEach(line => {
    // Начальное состояние
    gsap.set(line, {
      width: "0%",
      opacity: 1
    });

    // Анимация
    gsap.to(line, {
      width: "100%",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// Navigation Animation
function animateNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  gsap.from(navLinks, {
    opacity: 0,
    y: -20,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });
}

// Hero Section Animation
function animateHero() {
  const tl = gsap.timeline();
  
  tl.from('.h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
  })
  .from('.button', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.5");
}

// Numbers Animation
function animateNumbers() {
  // Animate first number (12)
  gsap.from('.number1', {
    textContent: 0,
    duration: 2,
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: '.number1',
      start: 'top 80%',
    },
    ease: "power1.out"
  });
}

// Paragraph Animation
function animateParagraph() {
  gsap.from('.paragraph', {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: '.paragraph',
      start: 'top 80%',
    },
    ease: "power2.out"
  });
}

// Button Hover Animation
function initButtonHover() {
  const button = document.querySelector('.button');
  
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
}

// Split Text Animation for H1
function splitTextAnimation() {
  // Split text into characters
  const h1Text = document.querySelector('.h1').textContent;
  const h1Element = document.querySelector('.h1');
  
  // Clear the original text
  h1Element.textContent = '';
  
  // Create spans for each character
  const chars = h1Text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    h1Element.appendChild(span);
    return span;
  });
  
  // Animate each character
  gsap.from(chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.05,
    duration: 1,
    ease: "back.out(1.7)"
  });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  // Initial animations
  animateNavigation();
  // Wait a bit before starting hero animations
  setTimeout(() => {
    splitTextAnimation();
  }, 500);
  
  // Other animations
  animateNumbers();
  animateParagraph();
  initButtonHover();
  animateLines(); // Add line animations
  
  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (target !== '#') {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut"
        });
      }
    });
  });
});
