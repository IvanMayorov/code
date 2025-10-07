// Глобальная переменная для хранения SplitText
let enterpriseTitleSplit = null;

// Функция для изначального скрытия всех анимируемых элементов
function hideAnimatedElements() {
  // Скрываем основные анимируемые элементы через gsap.set
  // Заголовок не скрываем здесь, так как он будет обработан после создания SplitText
  const elementsToHide = [
    '.enterprise_logo',
    '.enterprise_btn',
    'nav > *',
    '[data-stagger] *'
  ];
  
  elementsToHide.forEach(selector => {
    gsap.set(selector, {
      opacity: 0,
      y: 50
    });
  });
}

// Ждем готовности Webflow и загрузки шрифтов, потом создаем SplitText и запускаем анимацию
// Скрываем элементы сразу при загрузке DOM
hideAnimatedElements();
waitForFontsAndAnimate();


// Функция ожидания шрифтов, создания SplitText и запуска анимации
function waitForFontsAndAnimate() {
  // Ждем загрузки шрифтов
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      createSplitTextAndAnimate();
    });
  } else {
    // Fallback если Font Loading API не поддерживается
    setTimeout(() => {
      createSplitTextAndAnimate();
    }, 100);
  }
}

// Функция создания SplitText и запуска анимации
function createSplitTextAndAnimate() {
  console.log('=== createSplitTextAndAnimate запущена ===');
  
  // Скрываем заголовок изначально
  const enterpriseTitle = document.querySelector('.enterprise_title');
  console.log('Найден заголовок:', enterpriseTitle);
  
  
  // Создаем SplitText
  if (typeof SplitText !== 'undefined' && enterpriseTitle) {
    console.log('SplitText доступен, создаем...');
    enterpriseTitleSplit = new SplitText(enterpriseTitle, { type: 'lines' });
    console.log('SplitText создан:', enterpriseTitleSplit);
    
    // Скрываем строки SplitText после их создания
    if (enterpriseTitleSplit && enterpriseTitleSplit.lines) {
      console.log('Найдено строк SplitText:', enterpriseTitleSplit.lines.length);
      gsap.set(enterpriseTitleSplit.lines, {
        opacity: 0,
        y: 40
      });
      console.log('Строки SplitText скрыты');
    } else {
      console.log('Строки SplitText не найдены');
    }
  } else {
    console.log('SplitText недоступен или заголовок не найден');
  }
  
  // Запускаем анимацию
  console.log('Запускаем анимацию...');
  animateEnterpriseElements();
  
  // Инициализируем ScrollTrigger анимации для элементов с data-stagger
  initStaggerScrollAnimations();
}

// GSAP анимация выезжания элементов снизу из прозрачности при загрузке
// Функция для анимации элементов
function animateEnterpriseElements() {
  // Создаем timeline для последовательной анимации
  const tl = gsap.timeline();

  // 1. Анимация enterprise_logo
  const enterpriseLogo = document.querySelector('.enterprise_logo');
  if (enterpriseLogo) {
    tl.fromTo(enterpriseLogo, 
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  }

  // 2. Анимация строк enterprise_title
  const enterpriseTitle = document.querySelector('.enterprise_title');
  if (enterpriseTitle) {
    // Проверяем есть ли уже созданный SplitText
    if (enterpriseTitleSplit && enterpriseTitleSplit.lines) {
      console.log('Анимируем строки SplitText:', enterpriseTitleSplit.lines.length, 'строк');
      console.log('Строки SplitText:', enterpriseTitleSplit.lines);
      
      // Анимируем строки SplitText
      tl.fromTo(enterpriseTitleSplit.lines,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          onComplete: () => {
            console.log('Анимация строк завершена');
          },
          onStart: () => {
            console.log('Анимация строк началась');
          }
        },
        '-=0.2'
      );
    } else {
      console.log('Анимируем обычный заголовок (fallback)');
      // Fallback если SplitText еще не создан
      tl.fromTo(enterpriseTitle,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out'
        },
        '-=0.2'
      );
    }
  }

  // 3. Анимация enterprise_btn
  const enterpriseBtn = document.querySelector('.enterprise_btn');
  if (enterpriseBtn) {
    tl.fromTo(enterpriseBtn,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.3'
    );
  }

  // 4. Анимация потомков nav с стаггером
  const navChildren = document.querySelectorAll('nav > *');
  if (navChildren.length > 0) {
    tl.fromTo(navChildren,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.4' // Начинаем немного раньше предыдущей анимации
    );
  }
}

// Функция инициализации ScrollTrigger анимаций для элементов с data-stagger
function initStaggerScrollAnimations() {
  // Регистрируем ScrollTrigger плагин
  gsap.registerPlugin(ScrollTrigger);
  
  // Находим все элементы с data-stagger
  const staggerElements = document.querySelectorAll('[data-stagger]');
  
  staggerElements.forEach(element => {
    // Получаем настройки стаггера из data-атрибутов
    const staggerDelay = element.getAttribute('data-stagger-delay') || 0.05;
    const staggerDuration = element.getAttribute('data-stagger-duration') || 0.6;
    const staggerY = element.getAttribute('data-stagger-y') || 30;
    const triggerElement = element.getAttribute('data-stagger-trigger') || element;
    
    // Находим дочерние элементы для анимации
    const children = element.querySelectorAll('*');
    
    if (children.length > 0) {
      // Флаг для отслеживания того, была ли анимация уже воспроизведена
      let hasAnimated = false;
      
      // Создаем ScrollTrigger для элемента
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none', // Анимация только один раз
        onEnter: () => {
          // Проверяем, была ли анимация уже воспроизведена
          if (hasAnimated) return;
          hasAnimated = true;
          
          // Останавливаем все предыдущие анимации для этих элементов
          gsap.killTweensOf(children);
          
          // Анимация выезжания снизу из прозрачности с стаггером
          gsap.fromTo(children,
            {
              y: staggerY,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: staggerDuration,
              stagger: staggerDelay,
              ease: 'power2.out'
            }
          );
        }
      });
    }
  });
}

// Хук на отправку формы с id="email-form"
const emailForm = document.getElementById('email-form');

if (emailForm) {
  // Полностью отключаем Webflow от обработки формы
  emailForm.setAttribute('data-wf-form', 'false');
  emailForm.setAttribute('data-wf-validate', 'false');
  
  // Дополнительно отключаем все Webflow обработчики
  emailForm.removeAttribute('data-wf-form');
  emailForm.removeAttribute('data-wf-validate');
  
  // Убираем все Webflow классы, которые могут влиять на форму
  emailForm.classList.remove('w-form');
  
  // Отключаем все дочерние элементы от Webflow
  const webflowElements = emailForm.querySelectorAll('[data-wf-form], [data-wf-validate]');
  webflowElements.forEach(el => {
    el.removeAttribute('data-wf-form');
    el.removeAttribute('data-wf-validate');
  });
  
  // Инициализируем обработчик формы сначала
  initFormHandler();
  
  // Добавляем Inputmask для поля телефона после инициализации формы
  const phoneInput = emailForm.querySelector('input[type="tel"], input[name*="phone"], input[name*="Phone"]');

  if (phoneInput && typeof Inputmask !== 'undefined') {
    // Применяем маску с большей задержкой, чтобы не конфликтовать с валидацией
    setTimeout(() => {
      try {
        const mask = new Inputmask('+7 (999) 999-99-99', {
          placeholder: '+7 (___) ___-__-__',
          showMaskOnHover: false,
          showMaskOnFocus: false,
          clearMaskOnLostFocus: false,
          // Отключаем автоматическую валидацию маски
          autoUnmask: false,
          // Сохраняем совместимость с HTML5 валидацией
          removeMaskOnSubmit: false
        });
        mask.mask(phoneInput);
        
        // Убираем атрибут pattern если он есть, чтобы не конфликтовать с маской
        phoneInput.removeAttribute('pattern');
        
        console.log('Маска применена успешно к полю:', phoneInput);
      } catch (error) {
        console.error('Ошибка при применении маски:', error);
      }
    }, 300);
  }
}

function initFormHandler() {
  const emailForm = document.getElementById('email-form');
  if (!emailForm) return;
  
  // Флаг для предотвращения повторных отправок
  let isSubmitting = false;
  
  emailForm.addEventListener('submit', function (e) {
    // Проверяем, не отправляется ли форма уже
    if (isSubmitting) {
      console.log('Форма уже отправляется, игнорируем повторный клик');
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    isSubmitting = true;
    console.log('Форма отправлена, предотвращаем стандартную отправку');

    // Находим кнопку отправки и меняем текст
    const submitButton = emailForm.querySelector('input[type="submit"]');
    const originalText = submitButton ? submitButton.value : '';
    const waitText = submitButton ? submitButton.getAttribute('data-wait') : 'Подождите..';
    if (submitButton) {
      submitButton.value = waitText;
      submitButton.disabled = true;
    }

    // Собираем данные формы
    const formData = new FormData(emailForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Данные формы:', data);

    // Функция для восстановления формы при ошибке валидации
    const resetForm = () => {
      isSubmitting = false;
      if (submitButton) {
        submitButton.value = originalText;
        submitButton.disabled = false;
      }
    };

    // Проверяем HTML валидацию и пустые поля перед отправкой
    if (!emailForm.checkValidity()) {
      emailForm.reportValidity(); // Показывает стандартные сообщения браузера
      resetForm();
      return;
    }
    
    // Дополнительная проверка пустых обязательных полей
    const requiredFields = emailForm.querySelectorAll('input[required], textarea[required]');
    let hasEmptyFields = false;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        hasEmptyFields = true;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '';
      }
    });

    if (hasEmptyFields) {
      console.log('Есть незаполненные поля, форма не отправляется');
      resetForm();
      return; // Прерываем отправку
    }

    // Отправляем данные на указанный вебхук
    console.log('Отправляем запрос на вебхук...');
    
    // Создаем AbortController для таймаута
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут
    
    fetch('https://n8n.item.team/webhook/7ffe1370-043c-44be-a35b-c4f4a51f22cd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId); // Очищаем таймаут при успешном ответе
      console.log('Получен ответ от вебхука:', response.status);
      
      if (response.ok) {
        console.log('Форма успешно отправлена');
        // Скрываем форму
        emailForm.style.display = 'none';
        
        // Ищем блок w-form-done в разных местах
        let doneBlock = emailForm.parentElement.querySelector('.w-form-done');
        if (!doneBlock) {
          // если не нашли среди соседей, ищем в документе
          doneBlock = document.querySelector('.w-form-done');
        }
        if (!doneBlock) {
          // ищем в том же контейнере что и форма
          const formContainer = emailForm.closest('.w-form');
          if (formContainer) {
            doneBlock = formContainer.querySelector('.w-form-done');
          }
        }
        
        console.log('Найден блок w-form-done:', doneBlock);
        
        if (doneBlock) {
          // Принудительно показываем блок
          doneBlock.style.display = 'block';
          doneBlock.style.visibility = 'visible';
          doneBlock.style.opacity = '1';
          doneBlock.classList.add('is-visible');
          doneBlock.classList.remove('w--hidden');
          console.log('Блок w-form-done показан');
        } else {
          console.warn('Блок w-form-done не найден');
          // Fallback - показываем alert если блок не найден
          alert('Форма успешно отправлена!');
        }
        
        // Скрываем блок w-form-fail если он есть
        const failBlock = emailForm.parentElement.querySelector('.w-form-fail') || 
                          document.querySelector('.w-form-fail');
        if (failBlock) {
          failBlock.style.display = 'none';
          failBlock.classList.add('w--hidden');
          console.log('Блок w-form-fail скрыт');
        }
        
        // Успешная отправка - НЕ сбрасываем isSubmitting, так как форма уже скрыта
      } else {
        // Обработка ошибки HTTP
        console.error('Ошибка HTTP:', response.status, response.statusText);
        isSubmitting = false; // Сбрасываем флаг при ошибке
        // Восстанавливаем кнопку
        if (submitButton) {
          submitButton.value = originalText;
          submitButton.disabled = false;
        }
        // Можно показать сообщение об ошибке
        alert('Ошибка при отправке формы. Попробуйте еще раз.');
      }
    })
    .catch(error => {
      clearTimeout(timeoutId); // Очищаем таймаут при ошибке
      isSubmitting = false; // Сбрасываем флаг при ошибке
      
      // Обработка разных типов ошибок
      if (error.name === 'AbortError') {
        console.error('Таймаут запроса (10 секунд)');
        alert('Превышено время ожидания. Попробуйте еще раз.');
      } else {
        console.error('Ошибка сети:', error);
        alert('Ошибка сети. Проверьте подключение к интернету и попробуйте еще раз.');
      }
      
      // Восстанавливаем кнопку
      if (submitButton) {
        submitButton.value = originalText;
        submitButton.disabled = false;
      }
    });
  });
}

// Инициализация эффекта масштабирования для clients_card при наведении
function initClientsCardHoverEffect() {
  const clientsCards = document.querySelectorAll('.clients_card');
  
  clientsCards.forEach(card => {
    // Устанавливаем начальное состояние
    gsap.set(card, {
      scale: 1,
      transformOrigin: 'center center',
      zIndex: 1
    });
    
    // Эффект при наведении
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.1,
        zIndex: 10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    // Возврат к исходному состоянию при уходе курсора
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Инициализируем эффект после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  initClientsCardHoverEffect();
});

// Также инициализируем при загрузке страницы (fallback)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClientsCardHoverEffect);
} else {
  initClientsCardHoverEffect();
}

