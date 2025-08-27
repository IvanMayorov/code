(function() {
  function initNavbarBlur() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const blurBlock = navbar.querySelector('.navbar_blur');
    if (!blurBlock) return;

    function updateNavbarBlur() {
      if (window.scrollY === 0) {
        blurBlock.classList.remove('is-visible');
        navbar.classList.remove('is-blurred');
      } else {
        blurBlock.classList.add('is-visible');
        navbar.classList.add('is-blurred');
      }
    }

    // Initial check
    updateNavbarBlur();

    window.addEventListener('scroll', updateNavbarBlur, { passive: true });
  }

  if (window.Webflow) {
    window.Webflow.push(initNavbarBlur);
  } else {
    window.addEventListener('DOMContentLoaded', initNavbarBlur);
  }
})();
