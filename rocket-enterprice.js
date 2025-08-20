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

// Проверяем готовность Webflow
if (window.Webflow) {
  window.Webflow.push(() => {
    waitForFontsAndAnimate();
  });
} else {
  // Fallback если Webflow API недоступен
  window.addEventListener('load', () => {
    waitForFontsAndAnimate();
  });
}

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

