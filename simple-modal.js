
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
  overlay.classList.add('simple-modal-overlay', 'modal-overlay-hidden');

  // Show modal
  modal.style.display = 'block';
  modal.classList.add('modal-content-hidden');

  // Append modal to overlay, then overlay to body
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Trigger animation after a small delay
  requestAnimationFrame(() => {
    overlay.classList.remove('modal-overlay-hidden');
    modal.classList.remove('modal-content-hidden');
  });

  // Close modal on overlay click (but not on modal content)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeModal(modal, overlay);
    }
  });

  // Close modal on ESC key press
  const escHandler = function (e) {
    if (e.key === 'Escape') {
      closeModal(modal, overlay);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Optional: close modal on [data-modal-close] click inside modal
  const closeBtn = modal.querySelector('[data-modal-action="close"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', function handler() {
      closeModal(modal, overlay);
      closeBtn.removeEventListener('click', handler);
      document.removeEventListener('keydown', escHandler);
    });
  }
}

// Function to open modal by ID
function openModalById(modalId) {
  const modal = document.querySelector('[data-modal-id="' + modalId + '"]');
  if (modal) {
    openModal(modal);
    return true;
  }
  console.warn('Modal with ID "' + modalId + '" not found');
  return false;
}

// Function to close modal by ID
function closeModalById(modalId) {
  const modal = document.querySelector('[data-modal-id="' + modalId + '"]');
  if (modal) {
    const overlay = modal.closest('.simple-modal-overlay');
    if (overlay) {
      closeModal(modal, overlay);
      return true;
    }
  }
  console.warn('Modal with ID "' + modalId + '" not found or not open');
  return false;
}

// Function to close modal
function closeModal(modal, overlay) {
  if (!modal || !overlay) return;

  // Start closing animation
  overlay.classList.add('modal-overlay-hidden');
  modal.classList.add('modal-content-hidden');

  // Wait for animation to complete, then remove elements
  setTimeout(() => {
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('modal-content-hidden');
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
  }, 300); // Match this with CSS transition duration
}

// Global SimpleModal object for easy access
window.SimpleModal = {
  open: openModal,
  openById: openModalById,
  close: closeModal,
  closeById: closeModalById
};

// Attach click listeners to all modal triggers
document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.querySelector('[data-modal-id="' + modalId + '"]');
    openModal(modal);
  });
});

/*
CSS для модального окна с dvh:

.simple-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh; // Используем dvh вместо vh для лучшей поддержки мобильных устройств
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.modal-overlay-hidden {
  opacity: 0;
}

.simple-modal-overlay > * {
  position: relative;
  margin: auto;
  z-index: 9999;
  max-height: 90dvh; // Также используем dvh для максимальной высоты
  max-width: 90vw;
  overflow: auto;
  
  transform: scale(1);
  opacity: 1;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.modal-content-hidden {
  transform: scale(0.8);
  opacity: 0;
}

[data-modal-id] {
  display: none;
}

[data-modal-close] {
  cursor: pointer;
}
*/

