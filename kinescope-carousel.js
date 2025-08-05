
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

let currentTab = 0;
const tabCount = Math.min(links.length, panes.length);
const tabInterval = 2000; // 2 секунды, можно изменить

let tabTimer = null;
let isPaused = false;
let isVisible = false; // Флаг видимости

function showTab(idx) {
  // Remove 'is-active' from all .ecosystem_tabs_title
  document.querySelectorAll('.ecosystem_tabs_title').forEach(title => {
    title.classList.remove('is-active');
  });

  // Hide all panes
  panes.forEach(pane => {
    pane.style.display = 'none';
  });

  // Show the pane and activate the tab
  if (panes[idx]) {
    panes[idx].style.display = '';
  }
  if (links[idx]) {
    const title = links[idx].querySelector('.ecosystem_tabs_title');
    if (title) {
      title.classList.add('is-active');
    }
  }
}

function startTabInterval() {
  if (tabTimer) clearInterval(tabTimer);
  if (isPaused || !isVisible) return;
  tabTimer = setInterval(() => {
    if (!isPaused && isVisible) {
      currentTab = (currentTab + 1) % tabCount;
      showTab(currentTab);
    }
  }, tabInterval);
}

function stopTabInterval() {
  if (tabTimer) {
    clearInterval(tabTimer);
    tabTimer = null;
  }
}

// Инициализация: показать первую вкладку
if (tabCount > 0) {
  showTab(0);
}

// Автоматическое переключение вкладок по таймеру с поддержкой паузы при наведении
if (tabCount > 1) {
  // Навесим обработчики на все контейнеры вкладок
  panes.forEach(pane => {
    pane.addEventListener('mouseenter', () => {
      isPaused = true;
      stopTabInterval();
    });
    pane.addEventListener('mouseleave', () => {
      isPaused = false;
      startTabInterval();
    });
  });

  // Определяем контейнер для всех вкладок (например, общий родитель)
  // Если у всех panes один родитель, используем его
  let tabsContainer = null;
  if (panes.length > 0) {
    tabsContainer = panes[0].parentElement;
    // Проверим, что все panes действительно в одном контейнере
    if (![...panes].every(p => p.parentElement === tabsContainer)) {
      tabsContainer = null;
    }
  }

  // Если не нашли общий контейнер, используем первый pane как наблюдаемый элемент
  const observedElement = tabsContainer || panes[0];

  // Создаём Intersection Observer
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          startTabInterval();
        } else {
          isVisible = false;
          stopTabInterval();
        }
      });
    },
    {
      threshold: 0.1 // Считаем видимым, если хотя бы 10% видно
    }
  );

  if (observedElement) {
    observer.observe(observedElement);
  }
}
