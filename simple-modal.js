
// Function to prevent body scroll
function preventBodyScroll() {
  const scrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.body.style.touchAction = 'none';
  
  // Store scroll position for restoration
  document.body.dataset.scrollY = scrollY;
}

// Function to restore body scroll
function restoreBodyScroll() {
  const scrollY = document.body.dataset.scrollY || 0;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.touchAction = '';
  
  // Restore scroll position
  window.scrollTo(0, parseInt(scrollY));
  
  // Clean up
  delete document.body.dataset.scrollY;
}

// Function to open modal
function openModal(modal) {
  if (!modal) return;

  // Prevent body scroll
  preventBodyScroll();

  // Create overlay
  let overlay = document.createElement('div');
  overlay.classList.add('simple-modal-overlay');

  // Show modal
  modal.style.display = 'block';

  // Append modal to overlay, then overlay to body
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close modal on overlay click (but not on modal content)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeModal(modal, overlay);
    }
  });

  // Optional: close modal on [data-modal-close] click inside modal
  const closeBtn = modal.querySelector('[data-modal-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', function handler() {
      closeModal(modal, overlay);
      closeBtn.removeEventListener('click', handler);
    });
  }
}

// Function to close modal
function closeModal(modal, overlay) {
  if (modal) {
    modal.style.display = 'none';
    // Move modal back to its original position in the DOM
    if (modal.parentNode === overlay) {
      document.body.appendChild(modal);
    }
  }
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  
  // Restore body scroll
  restoreBodyScroll();
}

// Attach click listeners to all modal triggers
document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.querySelector('[data-modal-id="' + modalId + '"]');
    openModal(modal);
  });
});

