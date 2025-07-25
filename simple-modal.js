document.addEventListener('DOMContentLoaded', function () {
  // Function to open modal
  function openModal(modal) {
    if (!modal) return;

    // Create overlay
    let overlay = document.createElement('div');
    overlay.classList.add('simple-modal-overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = 9998;
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.overflow = 'auto';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';

    // Show modal
    modal.style.display = 'block';
    modal.style.position = 'relative';
    modal.style.margin = 'auto';
    modal.style.zIndex = 9999;

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
});
