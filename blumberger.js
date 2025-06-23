const logoBoxes = document.querySelectorAll('.logo_box');
const ANIMATION_DURATION = 2.5;
const STAGGER_DELAY = 0.2;
const PAUSE_DURATION = 2000;
const EASING = "elastic.out(1,0.7)";
let animationStarted = false;

function animateRotation(targetRotation, onComplete) {
  gsap.to(logoBoxes, {
    rotationX: targetRotation,
    duration: ANIMATION_DURATION,
    stagger: STAGGER_DELAY,
    ease: EASING,
    onComplete
  });
}

function resetAndContinue() {
  gsap.set(logoBoxes, { rotationX: 0 });
  setTimeout(rotateLogoBoxes, PAUSE_DURATION);
}

function rotateLogoBoxes() {
  animateRotation(180, () => {
    setTimeout(() => {
      animateRotation(360, resetAndContinue);
    }, PAUSE_DURATION);
  });
}

// Запуск анимации, когда пользователь доскроллил до partners-section
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
      animationStarted = true;
      rotateLogoBoxes();
      observer.disconnect();
    }
  });
}

const partnersSection = document.querySelector('.partners-section');
if (partnersSection) {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.2 // Можно скорректировать порог видимости
  });
  observer.observe(partnersSection);
}
