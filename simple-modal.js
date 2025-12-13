
// Кэшированные селекторы
const SELECTORS = {
  MODAL_TARGET: '[data-modal-target]',
  MODAL_ID: '[data-modal-id]',
  MODAL_CLOSE: '[data-modal-action="close"]',
  MODAL_OVERLAY: '.s-modal'
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
  scrollY: 0,
  closeCallback: null,
  globalCloseCallbacks: []
};

// Функция для управления блокировкой скролла
function toggleBodyScroll(enable = true) {
  if (enable) {
    // Блокируем скролл
    modalState.scrollY = window.scrollY;
    
    // Вычисляем ширину скроллбара
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    elements.body.classList.add('modal-open');
    elements.body.style.top = `-${modalState.scrollY}px`;
    
    // Компенсируем исчезновение скроллбара
    elements.body.style.paddingRight = `${scrollbarWidth}px`;
    
  } else {
    // Восстанавливаем скролл
    elements.body.classList.remove('modal-open');
    elements.body.style.top = '';
    elements.body.style.paddingRight = '';
    
    window.scrollTo(0, modalState.scrollY);
    modalState.scrollY = 0;
  }
}

// Функция для показа/скрытия элементов с анимацией
function toggleElementVisibility(element, show = true, className = '') {
  if (!element) return;
  
  if (show) {
    element.style.display = element.classList.contains('s-modal') ? 'flex' : 'block';
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
function openModal(overlay, closeCallback = null) {
  if (!overlay || modalState.isOpen) return;

  if (!overlay.classList.contains('s-modal')) {
    console.warn('Element is not a s-modal');
    return;
  }

  const modal = overlay.querySelector('[data-modal-content]') || overlay.children[0];
  if (!modal) {
    console.warn('No modal content found in s-modal');
    return;
  }

  // Обновляем состояние
  modalState.isOpen = true;
  modalState.currentModal = modal;
  modalState.currentOverlay = overlay;
  modalState.closeCallback = closeCallback;

  // Блокируем скролл
  toggleBodyScroll(true);

  // Показываем модальное окно
  toggleElementVisibility(modal, true, 'modal-content-hidden');
  toggleElementVisibility(overlay, true, 'modal-overlay-hidden');
}

// Основная функция закрытия модального окна
function closeModal(modal = modalState.currentModal, overlay = modalState.currentOverlay) {
  if (!modal || !overlay || !modalState.isOpen) return;

  // Сохраняем данные для колбеков
  const modalId = overlay.getAttribute('data-modal-id');
  const closeCallback = modalState.closeCallback;

  // Скрываем модальное окно
  toggleElementVisibility(modal, false, 'modal-content-hidden');
  toggleElementVisibility(overlay, false, 'modal-overlay-hidden');

  // Вызываем колбеки после начала анимации закрытия
  setTimeout(() => {
    // Вызываем локальный колбек, если он был передан
    if (closeCallback && typeof closeCallback === 'function') {
      try {
        closeCallback(modal, overlay, modalId);
      } catch (error) {
        console.error('Error in modal close callback:', error);
      }
    }

    // Вызываем все глобальные колбеки
    modalState.globalCloseCallbacks.forEach(callback => {
      try {
        callback(modal, overlay, modalId);
      } catch (error) {
        console.error('Error in global modal close callback:', error);
      }
    });
  }, 0);

  // Сбрасываем состояние
  modalState.isOpen = false;
  modalState.currentModal = null;
  modalState.currentOverlay = null;
  modalState.closeCallback = null;

  // Восстанавливаем скролл
  toggleBodyScroll(false);
}

// Функция открытия модального окна по ID
function openModalById(modalId, closeCallback = null) {
  const overlay = document.querySelector(`.s-modal[data-modal-id="${modalId}"]`);
  if (overlay) {
    openModal(overlay, closeCallback);
    return true;
  }
  console.warn(`Modal with ID "${modalId}" not found`);
  return false;
}

// Функция закрытия модального окна по ID
function closeModalById(modalId) {
  const overlay = document.querySelector(`.s-modal[data-modal-id="${modalId}"]`);
  if (overlay) {
    const modal = overlay.querySelector('[data-modal-content]') || overlay.children[0];
    if (modal) {
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
  if (target.matches(SELECTORS.MODAL_CLOSE) || target.closest(SELECTORS.MODAL_CLOSE)) {
    event.preventDefault();
    const closeButton = target.matches(SELECTORS.MODAL_CLOSE) 
      ? target 
      : target.closest(SELECTORS.MODAL_CLOSE);
    
    const overlay = closeButton.closest(SELECTORS.MODAL_OVERLAY);
    if (overlay) {
      const modal = overlay.querySelector('[data-modal-content]') || overlay.children[0];
      closeModal(modal, overlay);
    }
    return;
  }

  // Обработка кликов по overlay для закрытия
  if (target.matches(SELECTORS.MODAL_OVERLAY)) {

    const modal = target.querySelector('[data-modal-content]') || target.children[0];
   
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

// Функции для управления глобальными колбеками закрытия
function onClose(callback) {
  if (typeof callback === 'function') {
    modalState.globalCloseCallbacks.push(callback);
  } else {
    console.warn('onClose expects a function');
  }
}

function offClose(callback) {
  const index = modalState.globalCloseCallbacks.indexOf(callback);
  if (index > -1) {
    modalState.globalCloseCallbacks.splice(index, 1);
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
  isOpen: () => modalState.isOpen,
  onClose: onClose,
  offClose: offClose
};

// Инициализируем при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}





/*




.s-modal {
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
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  
  
  
  .s-modal > * {
       position: relative;
    margin: auto;
    z-index: 9999;
   
    transform: scale(1);
    opacity: 1;
      transition:  transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  
  .modal-content-hidden {
    transform: scale(0.95);
    opacity: 0;
  }
  
  .modal-overlay-hidden {
    opacity: 0;
  }
  

  [data-modal-id] {
    display: none;
  }
  

  [data-modal-action=close] {
    cursor: pointer;
  }
  
  body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    touch-action: none;
  }


Пример HTML структуры:
<div class="s-modal" data-modal-id="modal1">
  <div class="modal-content" data-modal-content>
    <h2>Модальное окно</h2>
    <p>Содержимое модального окна</p>
    <button data-modal-action="close">Закрыть</button>
  </div>
</div>
*/

