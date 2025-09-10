
// Константы для категорий куки
const COOKIE_CATEGORIES = {
    NECESSARY: 'necessary',    // Обязательные куки
    ANALYTICS: 'analytics',    // Аналитика
    MARKETING: 'marketing' // Маркетинг
  };
  
  function setCookie(name, value, days = 180) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }
  
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }
  
  function waitForWebflow() {
    return new Promise((resolve) => {
      if (window.Webflow && window.Webflow.require) {
        resolve();
      } else {
        const checkWebflow = () => {
          if (window.Webflow && window.Webflow.require) {
            resolve();
          } else {
            setTimeout(checkWebflow, 100);
          }
        };
        checkWebflow();
      }
    });
  }
  
  waitForWebflow().then(() => {
    const cookieBanner = document.querySelector('[data-cookie-banner]');
    const cookieSettings = document.querySelector('[data-cookie-settings]');
    const cookieForm = document.querySelector('[data-cookie-form]');
    const analyticsCheckbox = cookieForm ? cookieForm.querySelector('[name="analytics"]') : null;
    const marketingCheckbox = cookieForm ? cookieForm.querySelector('[name="marketing"]') : null;
    
    const buttons = document.querySelectorAll('[data-cookie-button]');
    
    // Проверяем, есть ли сохраненные настройки куки
    const saved = getCookie('cookie-consent');
    if (!saved) {
      cookieBanner.style.visibility = 'visible';
    } else {
      try {
        let prefs;
        if (saved === 'all') {
          prefs = {
            necessary: true,
            analytics: true,
            marketing: true
          };
        } else if (saved === 'none') {
          prefs = {
            necessary: true,
            analytics: false,
            marketing: false
          };
        } else {
          // Парсим сохраненные настройки и удаляем неиспользуемые параметры
          const savedPrefs = JSON.parse(decodeURIComponent(saved));
          prefs = {
            necessary: true, // Обязательные куки всегда true
            analytics: savedPrefs.analytics || false,
            marketing: savedPrefs.marketing || false
          };
          // Если настройки изменились, сохраняем новую структуру
          if (savedPrefs.preferences !== undefined) {
            setCookie('cookie-consent', JSON.stringify(prefs));
          }
        }
        
        // Устанавливаем состояние чекбоксов
        if (analyticsCheckbox) {
          analyticsCheckbox.checked = prefs.analytics;
        }
        if (marketingCheckbox) {
          marketingCheckbox.checked = prefs.marketing;
        }
        
        loadScripts(prefs);
      } catch (e) {
        cookieBanner.style.visibility = 'visible';
      }
    }
    const cookieMarketingModal = document.querySelector('[data-modal-id="cookie-marketing"]')
  
    buttons.forEach(button => {
      button.onclick = () => {
        const action = button.dataset.cookieButton;
        
        switch(action) {
          case 'accept':
            if (analyticsCheckbox) {
              analyticsCheckbox.checked = true;
            }
            if (marketingCheckbox) {
              marketingCheckbox.checked = true;
            }
            const acceptPrefs = {
              necessary: true,
              analytics: true,
              marketing: true
            };
            setCookie('cookie-consent', JSON.stringify(acceptPrefs));
            cookieBanner.style.visibility = 'hidden';
            loadScripts(acceptPrefs);
            break;
            
          case 'reject':
            if (analyticsCheckbox) {
              analyticsCheckbox.checked = false;
            }
            if (marketingCheckbox) {
              marketingCheckbox.checked = false;
            }
            const rejectPrefs = {
              necessary: true,
              analytics: false,
              marketing: false
            };
            setCookie('cookie-consent', JSON.stringify(rejectPrefs));
            cookieBanner.style.visibility = 'hidden';
            loadScripts(rejectPrefs);
            break;
            
          case 'settings':
            if (cookieSettings) {
              cookieSettings.style.display = 'block';
            }
            if (cookieBanner) {
              cookieBanner.style.visibility = 'hidden';
            }
            break;
            
          case 'save':
            const analytics = analyticsCheckbox ? analyticsCheckbox.checked : false;
            const marketing = marketingCheckbox ? marketingCheckbox.checked : false;
            const savePrefs = {
              necessary: true,
              analytics,
              marketing
            };
            setCookie('cookie-consent', JSON.stringify(savePrefs));
            if (cookieSettings) {
              cookieSettings.style.display = 'none';
            }
            cookieBanner.style.visibility = 'hidden';
            loadScripts(savePrefs);
            break;
        }
      };
    });
  });
  
  function loadScripts(prefs) {
    // Обязательные скрипты загружаются всегда
    loadNecessaryScripts();
  
    if (prefs.analytics) {
      loadAnalyticsScripts();
    }
    if (prefs.marketing) {
      loadMarketingScripts();
    }
  }
  
  // Функции загрузки скриптов по категориям
  function loadNecessaryScripts() {

  }
  
  function loadAnalyticsScripts() {
   
  }
  
  function loadMarketingScripts() {
    // Загрузка скриптов для маркетинга
  }


  // Альтернативный подход - ждем готовности Webflow
function initCookieScript() {
    // Убираем класс is-opened при загрузке
    document.querySelectorAll('.cookie_checkbox_wrap').forEach(function(el) {
      el.classList.remove('is-opened');
    });
  
    // Скрываем is-allowed при загрузке
    document.querySelectorAll('.is-allowed').forEach(function(el) {
      el.style.display = 'none';
    });
  
    // Добавляем обработчики событий
    document.addEventListener('click', function(event) {
      const toggle = event.target.closest('.cookie_drop_toggle');
      if (toggle) {
        const parent = toggle.closest('.cookie_checkbox_wrap');
        if (parent) {
          parent.classList.toggle('is-opened');
        }
      }
    });
  
    // // Обработчик для чекбоксов
    // document.addEventListener('change', function(event) {
    //   const checkbox = event.target;
      
    //   // Проверяем, что это чекбокс
    //   if (checkbox.type === 'checkbox') {
    //     // Ищем родителя с классом cookie_drop_checkbox_wrap
    //     const wrap = checkbox.closest('.cookie_drop_checkbox_wrap');
    //     if (wrap) {
    //       // Если чекбокс отмечен - показываем разрешенные элементы
    //       if (checkbox.checked) {
    //         // Показываем .is-allowed, скрываем .is-not-allowed
    //         wrap.querySelectorAll('.is-allowed').forEach(function(el) {
    //           el.style.display = '';
    //         });
    //         wrap.querySelectorAll('.is-not-allowed').forEach(function(el) {
    //           el.style.display = 'none';
    //         });
    //       } else {
    //         // Если чекбокс не отмечен - показываем неразрешенные элементы
    //         wrap.querySelectorAll('.is-allowed').forEach(function(el) {
    //           el.style.display = 'none';
    //         });
    //         wrap.querySelectorAll('.is-not-allowed').forEach(function(el) {
    //           el.style.display = '';
    //         });
    //       }
    //     }
    //   }
    // });
    
  }
  
  // Проверяем готовность Webflow
  if (window.Webflow && window.Webflow.push) {
    window.Webflow.push(function() {
      initCookieScript();
    });
  } else {
    // Fallback на обычную загрузку
    window.addEventListener('load', initCookieScript);
  }
  
  