
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,
  slidesPerView: 5,
  centeredSlides: true,
  allowTouchMove: false,
  // loopAdditionalSlides: 5,
  speed: 800, // Сделали переключение медленнее (по умолчанию 300)
  autoplay: {
    delay: 1000,
    // disableOnInteraction: false,
  },
});

// Скрываем все .our-projects_card кроме первых трёх
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.our-projects_card');
  const showMoreBtn = document.querySelector('.our-projects_card_button');
  if (cards.length > 3) {
    for (let i = 3; i < cards.length; i++) {
      cards[i].style.display = 'none';
    }
    if (showMoreBtn) {
      showMoreBtn.style.display = '';
      showMoreBtn.addEventListener('click', function() {
        for (let i = 3; i < cards.length; i++) {
          cards[i].style.display = '';
        }
        showMoreBtn.style.display = 'none';
      });
    } 
  } else if (showMoreBtn) {
    showMoreBtn.style.display = 'none';
  }
});



// #region Tabs
const links = document.querySelectorAll('.ecosystem_tabs_link');
const panes = document.querySelectorAll('.ecosystem_tabs_pane');
const tabBoxes = document.querySelectorAll('.ecosystem_tabs_box');

let currentTab = 0;
const tabCount = Math.min(links.length, panes.length);

function fadeOut(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
  return new Promise(resolve => {
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
}

function fadeIn(element, duration = 300) {
  element.style.display = '';
  // Force reflow to apply transition
  void element.offsetWidth;
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 10);
}

function showTab(idx) {
  // Remove 'is-active' from all .ecosystem_tabs_title
  document.querySelectorAll('.ecosystem_tabs_title').forEach(title => {
    title.classList.remove('is-active');
  });

  // Fade out current pane, fade in new pane
  if (panes[currentTab] && panes[currentTab] !== panes[idx]) {
    fadeOut(panes[currentTab]).then(() => {
      if (panes[idx]) {
        panes[idx].style.opacity = 0;
        fadeIn(panes[idx]);
      }
    });
  } else if (panes[idx]) {
    // On first load or if same tab, just show
    panes.forEach((pane, i) => {
      pane.style.display = (i === idx) ? '' : 'none';
      pane.style.opacity = (i === idx) ? 1 : 0;
    });
  }

  if (links[idx]) {
    const title = links[idx].querySelector('.ecosystem_tabs_title');
    if (title) {
      title.classList.add('is-active');
    }
  }
  currentTab = idx;
}

// Инициализация: показать первую вкладку
if (tabCount > 0) {
  panes.forEach((pane, i) => {
    pane.style.opacity = (i === 0) ? 1 : 0;
    pane.style.display = (i === 0) ? '' : 'none';
    pane.style.transition = 'opacity 300ms';
  });
  showTab(0);
}

// Переключение вкладок по клику на .ecosystem_tabs_box
if (tabBoxes.length > 0 && tabCount > 1) {
  tabBoxes.forEach((box, idx) => {
    box.addEventListener('click', () => {
      if (idx !== currentTab) {
        showTab(idx);
      }
    });
  });
}
