// Константы для категорий куки
const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',    // Обязательные куки
  ANALYTICS: 'analytics',    // Аналитика
  MARKETING: 'marketing',    // Маркетинг
  PREFERENCES: 'preferences' // Предпочтения
};

// Инициализация Google Consent Mode
function initGoogleConsentMode() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  
  // Установка начального состояния
  gtag('consent', 'default', {
    'ad_storage': 'denied', 
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Обязательные куки всегда разрешены
    'wait_for_update': 500
  });
}

function setCookie(name, value, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

// Обновление состояния Google Consent Mode
function updateGoogleConsentMode(prefs) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('consent', 'update', {
    'ad_storage': prefs.marketing ? 'granted' : 'denied',
    'analytics_storage': prefs.analytics ? 'granted' : 'denied',
    'functionality_storage': prefs.preferences ? 'granted' : 'denied',
    'personalization_storage': prefs.preferences ? 'granted' : 'denied',
    'security_storage': 'granted' // Обязательные куки всегда разрешены
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация Google Consent Mode
  initGoogleConsentMode();

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  const cookieSettings = document.querySelector('[data-cookie-settings]');
  const cookieForm = document.querySelector('[data-cookie-form]');
  
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
          necessary: true, // Обязательные куки всегда true
          analytics: true,
          marketing: true,
          preferences: true
        };
      } else if (saved === 'none') {
        prefs = {
          necessary: true, // Обязательные куки всегда true
          analytics: false,
          marketing: false,
          preferences: false
        };
      } else {
        prefs = JSON.parse(decodeURIComponent(saved));
        prefs.necessary = true; // Убеждаемся, что обязательные куки включены
      }
      
      // Устанавливаем состояние чекбоксов
      if (cookieForm) {
        cookieForm.analytics.checked = prefs.analytics;
        cookieForm.marketing.checked = prefs.marketing;
        cookieForm.preferences.checked = prefs.preferences;
        // Обязательные куки не имеют чекбокса, так как они всегда включены
      }
      
      updateGoogleConsentMode(prefs);
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
          if (cookieForm) {
            cookieForm.analytics.checked = true;
            cookieForm.marketing.checked = true;
            cookieForm.preferences.checked = true;
          }
          const acceptPrefs = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
          };
          setCookie('cookie-consent', JSON.stringify(acceptPrefs));
          cookieBanner.style.visibility = 'hidden';
          cookiePreferencesModal.close();
          updateGoogleConsentMode(acceptPrefs);
          loadScripts(acceptPrefs);
          break;
          
        case 'reject':
          if (cookieForm) {
            cookieForm.analytics.checked = false;
            cookieForm.marketing.checked = false;
            cookieForm.preferences.checked = false;
          }
          const rejectPrefs = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
          };
          setCookie('cookie-consent', JSON.stringify(rejectPrefs));
          cookieBanner.style.visibility = 'hidden';
          
          cookiePreferencesModal.close();
          updateGoogleConsentMode(rejectPrefs);
          loadScripts(rejectPrefs);
          break;
          
          
        case 'save':
          const analytics = cookieForm.analytics.checked;
          const marketing = cookieForm.marketing.checked;
          const preferences = cookieForm.preferences.checked;
          const savePrefs = {
            necessary: true,
            analytics,
            marketing,
            preferences
          };
          setCookie('cookie-consent', JSON.stringify(savePrefs));
          cookiePreferencesModal.close();
          cookieBanner.style.visibility = 'hidden';
          updateGoogleConsentMode(savePrefs);
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
  // Google Tag Manager
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5CXG893');

  // GTM User ID Data Layer (пример, если нужно)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'user_id' : 'uuid', 'crm_id' : 'uuid'});

  // Google Analytics 4
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-R9PMC6Y5X0';
  document.head.appendChild(ga);

  ga.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-R9PMC6Y5X0');
  };
}

function loadMarketingScripts() {
  // Google Ads
  var gads = document.createElement('script');
  gads.async = true;
  gads.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10882924639';
  document.head.appendChild(gads);

  gads.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-10882924639');
  };

  // HubSpot
  var hs = document.createElement('script');
  hs.type = 'text/javascript';
  hs.id = 'hs-script-loader';
  hs.async = true;
  hs.defer = true;
  hs.src = '//js-eu1.hs-scripts.com/27002679.js';
  document.head.appendChild(hs);

  // Meta Pixel
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '587940788928571');
  fbq('track', 'PageView');
}

function loadPreferencesScripts() {
  // Intercom
  window.intercomSettings = {
    app_id: "kjgg1p33",
    custom_launcher_selector:'.open-intercom'
  };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/kjgg1p33';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
}