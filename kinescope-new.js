const navToggleSlider = document.querySelector('.nav__l-toggle');
const firstNavBtn = document.querySelector('.nav__l-btn'); // первая кнопка
const secondNavBtn = document.querySelectorAll('.nav__l-btn')[1]; // вторая кнопка

if (secondNavBtn && navToggleSlider) {
  // При загрузке страницы задаём ширину слайдера как у второй кнопки
  const btn2Rect = secondNavBtn.getBoundingClientRect();
  navToggleSlider.style.width = `${btn2Rect.width}px`;
}

if (firstNavBtn && navToggleSlider) {
  firstNavBtn.addEventListener('mouseenter', function() {
    const btnRect = firstNavBtn.getBoundingClientRect();
    const parentRect = firstNavBtn.parentElement.getBoundingClientRect();
    // Располагаем slider по правой стороне кнопки
    const right = parentRect.right - btnRect.right;
    navToggleSlider.style.right = `${right}px`;
    navToggleSlider.style.left = 'auto';
    navToggleSlider.style.width = `${btnRect.width}px`;
    navToggleSlider.classList.add('active');
  });

  firstNavBtn.addEventListener('mouseleave', function() {
    // Возврат slider на место при уводе мыши
    navToggleSlider.classList.remove('active');

    // По желанию, можно сбросить стили slider на исходные значения
    navToggleSlider.style.right = '';
    navToggleSlider.style.left = '';

    // После mouseleave возвращаем ширину как у второй кнопки (если есть)
    if (secondNavBtn) {
      const btn2Rect = secondNavBtn.getBoundingClientRect();
      navToggleSlider.style.width = `${btn2Rect.width}px`;
    } else {
      navToggleSlider.style.width = '';
    }
  });
}


window.intercomSettings = {
    app_id: "kjgg1p33",
    custom_launcher_selector:'.open-intercom'
  };