// Константы для категорий куки
const COOKIE_CATEGORIES = {
    NECESSARY: 'necessary',    // Обязательные куки
    ANALYTICS: 'analytics',    // Аналитика
    PREFERENCES: 'preferences' // Предпочтения
  };
  
  function setCookie(name, value, days = 180) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }
  
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('[data-cookie-banner]');
    const cookieSettings = document.querySelector('[data-cookie-settings]');
    const cookieForm = document.querySelector('[data-cookie-form]');
    const analyticsCheckbox = cookieForm ? cookieForm.querySelector('[name="analytics"]') : null;
    const preferencesCheckbox = cookieForm ? cookieForm.querySelector('[name="preferences"]') : null;
    
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
            preferences: true
          };
        } else if (saved === 'none') {
          prefs = {
            necessary: true,
            analytics: false,
            preferences: false
          };
        } else {
          // Парсим сохраненные настройки и удаляем неиспользуемые параметры
          const savedPrefs = JSON.parse(decodeURIComponent(saved));
          prefs = {
            necessary: true, // Обязательные куки всегда true
            analytics: savedPrefs.analytics || false,
            preferences: savedPrefs.preferences || false
          };
          // Если настройки изменились, сохраняем новую структуру
          if (savedPrefs.marketing !== undefined) {
            setCookie('cookie-consent', JSON.stringify(prefs));
          }
        }
        
        // Устанавливаем состояние чекбоксов
        if (analyticsCheckbox) {
          analyticsCheckbox.checked = prefs.analytics;
        }
        if (preferencesCheckbox) {
          preferencesCheckbox.checked = prefs.preferences;
        }
        
        loadScripts(prefs);
      } catch (e) {
        cookieBanner.style.visibility = 'visible';
      }
    }
    const cookiePreferencesModal = $('[data-remodal-id="cookie-preferences"]').remodal();
  
    buttons.forEach(button => {
      button.onclick = () => {
        const action = button.dataset.cookieButton;
        
        switch(action) {
          case 'accept':
            if (analyticsCheckbox) {
              analyticsCheckbox.checked = true;
            }
            if (preferencesCheckbox) {
              preferencesCheckbox.checked = true;
            }
            const acceptPrefs = {
              necessary: true,
              analytics: true,
              preferences: true
            };
            setCookie('cookie-consent', JSON.stringify(acceptPrefs));
            cookieBanner.style.visibility = 'hidden';
            cookiePreferencesModal.close();
            loadScripts(acceptPrefs);
            break;
            
          case 'reject':
            if (analyticsCheckbox) {
              analyticsCheckbox.checked = false;
            }
            if (preferencesCheckbox) {
              preferencesCheckbox.checked = false;
            }
            const rejectPrefs = {
              necessary: true,
              analytics: false,
              preferences: false
            };
            setCookie('cookie-consent', JSON.stringify(rejectPrefs));
            cookieBanner.style.visibility = 'hidden';
            cookiePreferencesModal.close();
            loadScripts(rejectPrefs);
            break;
            
          case 'save':
            const analytics = analyticsCheckbox ? analyticsCheckbox.checked : false;
            const preferences = preferencesCheckbox ? preferencesCheckbox.checked : false;
            const savePrefs = {
              necessary: true,
              analytics,
              preferences
            };
            setCookie('cookie-consent', JSON.stringify(savePrefs));
            cookiePreferencesModal.close();
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
    if (prefs.preferences) {
      loadPreferencesScripts();
    }
  }
  
  // Функции загрузки скриптов по категориям
  function loadNecessaryScripts() {
    // Загрузка обязательных скриптов
    // Например: базовые функции сайта, безопасность
  }
  
  function loadAnalyticsScripts() {
    // Яндекс.Метрика
    if (!window.ym) {
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(61546957, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        trackHash:true,
        ecommerce:"dataLayer"
      });
    }
    // <noscript>...</noscript> для Яндекс.Метрики рекомендуется добавить в HTML-код страницы.
  }
  
  function loadPreferencesScripts() {
    // Загрузка скриптов для предпочтений пользователя
  }