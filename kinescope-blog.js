// Find all buttons with data-utm attribute
const utmButtons = document.querySelectorAll('[data-utm]');

// Get current page slug from URL or data attribute
const currentSlug = window.location.pathname.split('/').pop() || 'home';

// Add UTM parameters to each button's href
utmButtons.forEach((button) => {
  const href = button.getAttribute('href');
  const utmValue = button.getAttribute('data-utm');
  if (href && utmValue) {
    const utmParam = `utm_source=${utmValue}_${currentSlug}`;
    const separator = href.includes('?') ? '&' : '?';
    const newHref = `${href}${separator}${utmParam}`;
    button.setAttribute('href', newHref);
  }
});
