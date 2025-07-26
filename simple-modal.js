
// Кэшированные селекторы
const SELECTORS = {
  MODAL_TARGET: '[data-modal-target]',
  MODAL_ID: '[data-modal-id]',
  MODAL_CLOSE: '[data-modal-action="close"]',
  MODAL_OVERLAY: '.simple-modal-overlay'
};

// Кэшированные элементы
const elements = {
  body: document.body,
  document: document
};

// Состояние модальных окон
const modalState = {
  isOpen: false,
  currentModal: null,
  currentOverlay: null,
  scrollY: 0
};

// Функция для управления блокировкой скролла
function toggleBodyScroll(enable = true) {
  if (enable) {
    // Блокируем скролл
    modalState.scrollY = window.scrollY;
    elements.body.classList.add('modal-open');
    elements.body.style.top = `-${modalState.scrollY}px`;
  } else {
    // Восстанавливаем скролл
    elements.body.classList.remove('modal-open');
    elements.body.style.top = '';
    window.scrollTo(0, modalState.scrollY);
    modalState.scrollY = 0;
  }
}

// Функция для показа/скрытия элементов с анимацией
function toggleElementVisibility(element, show = true, className = '') {
  if (!element) return;
  
  if (show) {
    element.style.display = element.classList.contains('simple-modal-overlay') ? 'flex' : 'block';
    element.classList.add(className);
    
    // Запускаем анимацию появления
    requestAnimationFrame(() => {
      element.classList.remove(className);
    });
  } else {
    element.classList.add(className);
    
    // Ждем окончания анимации и скрываем
    setTimeout(() => {
      if (element) {
        element.style.display = 'none';
        element.classList.remove(className);
      }
    }, 300);
  }
}

// Основная функция открытия модального окна
function openModal(modal) {
  if (!modal || modalState.isOpen) return;

  const overlay = modal.closest(SELECTORS.MODAL_OVERLAY);
  if (!overlay) {
    console.warn('Modal is not inside a simple-modal-overlay');
    return;
  }

  // Обновляем состояние
  modalState.isOpen = true;
  modalState.currentModal = modal;
  modalState.currentOverlay = overlay;

  // Блокируем скролл
  toggleBodyScroll(true);

  // Показываем модальное окно
  toggleElementVisibility(modal, true, 'modal-content-hidden');
  toggleElementVisibility(overlay, true, 'modal-overlay-hidden');
}

// Основная функция закрытия модального окна
function closeModal(modal = modalState.currentModal, overlay = modalState.currentOverlay) {
  if (!modal || !overlay || !modalState.isOpen) return;

  // Скрываем модальное окно
  toggleElementVisibility(modal, false, 'modal-content-hidden');
  toggleElementVisibility(overlay, false, 'modal-overlay-hidden');

  // Сбрасываем состояние
  modalState.isOpen = false;
  modalState.currentModal = null;
  modalState.currentOverlay = null;

  // Восстанавливаем скролл
  toggleBodyScroll(false);
}

// Функция открытия модального окна по ID
function openModalById(modalId) {
  const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
  if (modal) {
    openModal(modal);
    return true;
  }
  console.warn(`Modal with ID "${modalId}" not found`);
  return false;
}

// Функция закрытия модального окна по ID
function closeModalById(modalId) {
  const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
  if (modal) {
    const overlay = modal.closest(SELECTORS.MODAL_OVERLAY);
    if (overlay) {
      closeModal(modal, overlay);
      return true;
    }
  }
  console.warn(`Modal with ID "${modalId}" not found or not open`);
  return false;
}

// Единый обработчик событий с делегированием
function handleModalEvents(event) {
  const target = event.target;

  // Обработка кликов по кнопкам открытия
  if (target.matches(SELECTORS.MODAL_TARGET)) {
    event.preventDefault();
    const modalId = target.getAttribute('data-modal-target');
    openModalById(modalId);
    return;
  }

  // Обработка кликов по кнопкам закрытия
  if (target.matches(SELECTORS.MODAL_CLOSE)) {
    event.preventDefault();
    const modal = target.closest(SELECTORS.MODAL_ID);
    if (modal) {
      const overlay = modal.closest(SELECTORS.MODAL_OVERLAY);
      closeModal(modal, overlay);
    }
    return;
  }

  // Обработка кликов по overlay для закрытия
  if (target.matches(SELECTORS.MODAL_OVERLAY)) {
    const modal = target.querySelector(SELECTORS.MODAL_ID);
    if (modal) {
      closeModal(modal, target);
    }
    return;
  }
}

// Обработчик клавиши Escape
function handleKeydown(event) {
  if (event.key === 'Escape' && modalState.isOpen) {
    closeModal();
  }
}

// Инициализация
function initModal() {
  // Добавляем обработчики событий с делегированием
  elements.document.addEventListener('click', handleModalEvents);
  elements.document.addEventListener('keydown', handleKeydown);
}

// Глобальный объект для доступа к функциям
window.SimpleModal = {
  open: openModal,
  openById: openModalById,
  close: closeModal,
  closeById: closeModalById,
  isOpen: () => modalState.isOpen
};

// Инициализируем при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}

/*
CSS для модального окна с dvh:

// Блокировка скролла при открытом модальном окне
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
  touch-action: none;
}

.simple-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: none;
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
  max-height: 90dvh;
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

Пример HTML структуры:
<div class="simple-modal-overlay">
  <div data-modal-id="modal1" class="modal-content">
    <h2>Модальное окно</h2>
    <p>Содержимое модального окна</p>
    <button data-modal-action="close">Закрыть</button>
  </div>
</div>
*/

