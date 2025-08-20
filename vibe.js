
// gsap.from('.main_heading-wrap .flex-v-c *, .main_btn-wrap, .main_heading-wrap .flex-h-c, .main_marquee-item_container > *', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out'
// });
// gsap.from('.section_online .online_heading-wrap > *', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.online_heading-wrap',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_features .online_heading-wrap, .section_features .features_grid-item', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_features',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_how_new .online_heading-wrap, .section_how_new .how_list-item', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_how_new',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_programs_flow_new .programs_flow_heading-wrap, .section_programs_flow_new .programs_flow_grid-item, .section_programs_flow_new .programs_flow-btn-wrap', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_programs_flow_new',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.feel_flex-wrap > *, .fell_info-wrap', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_feel_new',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_price .price_heading-wrap, .price_grid-item', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_price',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_cta .is-h2_programs, .section_cta .max-w-803, .section_cta .session_information_box', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_cta',
//     start: 'top 80%',
//     toggleActions: 'play none none none'
//   }
// });

// gsap.from('.section_flow .is-h2_programs, .student_stories_card', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_flow',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.section_cta_footer', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,

//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_cta_footer',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }
// });

// gsap.from('.faq_title_box, .faq_card', {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.2,
//   ease: 'power2.out',
//   scrollTrigger: {
//     trigger: '.section_faq',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   }


var Webflow = Webflow || [];
Webflow.push(function(){

  const promoOldPrices = document.querySelectorAll('.old_price');
  const promoLables = document.querySelectorAll('.promo_label');
  const promoTexts = document.querySelectorAll('[data-promocode]');

  // Получаем форму и лоадер
  const tarifForm = document.querySelector('form[data-name="tarif"]');
  const loader = document.querySelector('.loader');

// Функция для получения параметра promo из GET
function getPromoCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('promo') || '';
}

// Функция для скрытия элементов промокода
function hidePromoElements() {
  promoOldPrices.forEach(element => {
    element.style.display = 'none';
  });
  promoLables.forEach(element => {
    element.style.display = 'none';
  });
  promoTexts.forEach(element => {
    element.style.display = 'none';
  });
}

// Функция для показа элементов промокода
function showPromoElements() {
  promoOldPrices.forEach(element => {
    element.style.display = '';
  });
  promoLables.forEach(element => {
    element.style.display = '';
  });
  promoTexts.forEach(element => {
    element.style.display = '';
  });
}

// Функция для работы с промокодами
function applyPromoCode() {
  // Сначала скрываем все элементы промокода
  hidePromoElements();
  
  const promoCode = getPromoCodeFromUrl();
  console.log(promoCode);
  if (!promoCode) {
    return; // Если промокода нет, ничего не делаем
  }

  // Ищем скрипт с данными промокодов
  const promoDataScript = document.getElementById('promo-data');
  if (!promoDataScript) {
    console.warn('Скрипт с данными промокодов не найден');
    return;
  }

  try {
    // Исправляем JSON - убираем лишнюю запятую и добавляем кавычки к ключам
    let jsonText = promoDataScript.textContent;
    // Убираем лишнюю запятую после последнего элемента
    jsonText = jsonText.replace(/,(\s*})/g, '$1');
    // Убираем лишнюю запятую после последнего элемента в объекте
    jsonText = jsonText.replace(/,(\s*]|\s*})/g, '$1');
    
    const promoData = JSON.parse(jsonText);
    
    if (promoData.promoCodes && promoData.promoCodes[promoCode]) {
      const promoPrice = promoData.promoCodes[promoCode];
      
      // Показываем элементы промокода
      showPromoElements();
      
      // Подставляем название промокода в элементы promoTexts
      promoTexts.forEach(element => {
        element.textContent = promoCode;
      });
      
      // Находим все элементы с data-promo-price и обновляем их
      const promoPriceElements = document.querySelectorAll('[data-promo-price]');
      
      // Функция для форматирования цены с тонким пробелом
      function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
      
      const formattedPrice = formatPrice(promoPrice);
      
      promoPriceElements.forEach(element => {
        // Обновляем текст элемента с форматированной ценой
        element.textContent = formattedPrice;
        
        // Если элемент имеет атрибут data-price, обновляем его тоже (без форматирования)
        if (element.hasAttribute('data-price')) {
          element.setAttribute('data-price', promoPrice);
        }
        
        // Если это input с value, обновляем value (без форматирования)
        if (element.tagName === 'INPUT' && element.type === 'hidden') {
          element.value = promoPrice;
        }
      });
      
      console.log(`Применен промокод ${promoCode} с ценой ${promoPrice}`);
    } else {
      console.warn(`Промокод ${promoCode} не найден в списке промокодов`);
    }
  } catch (error) {
    console.error('Ошибка при парсинге данных промокодов:', error);
  }
}

// Применяем промокод сразу после инициализации Webflow
applyPromoCode();

if (tarifForm && loader) {
  // Получаем промокод из URL
  const promoCode = getPromoCodeFromUrl();

  tarifForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Собираем данные из формы с нужными ключами, не завися от регистра
    const formData = new FormData(tarifForm);
    // Создаем объект, где ключи - в нижнем регистре
    const formDataLower = {};
    for (let [key, value] of formData.entries()) {
      formDataLower[key.toLowerCase()] = value;
    }
    
    // Ищем элемент с классом tag_id внутри формы
    const tagIdElement = tarifForm.querySelector('.tag_id');
    let tagId = '';
    if (tagIdElement) {
      tagId = tagIdElement.textContent.trim() || tagIdElement.innerText.trim();
      console.log('Найден tag_id:', tagId);
    } else {
      console.log('Элемент с классом tag_id не найден в форме');
    }
    
    const data = {
      name: formDataLower['name'] || '',
      telegram: formDataLower['telegram'] || '',
      email: formDataLower['email'] || '',
      price: formDataLower['price'] || '',
      tag_id: tagId
    };

    // Также добавляем значение data-product-id из атрибута формы
    const productId = tarifForm.getAttribute('data-product-id') || tarifForm.getAttribute('data_product_id');
    if (productId) {
      data.product_id = productId;
    } else {
      data.product_id = '';
    }

    // Добавляем промокод, если он есть
    if (promoCode) {
      data.promo = promoCode;
    }

    // Выводим data в консоль при отправке
    console.log('=== ДАННЫЕ ФОРМЫ ===');
    console.log('Имя:', data.name);
    console.log('Telegram:', data.telegram);
    console.log('Email:', data.email);
    console.log('Цена:', data.price);
    console.log('Tag ID:', data.tag_id);
    console.log('Product ID:', data.product_id);
    console.log('Промокод:', data.promo || 'не указан');
    console.log('Полный объект данных:', data);
    console.log('==================');

    // Показываем лоадер
    loader.classList.add('is-visible');

    fetch('https://n8n.vibe.cab/webhook/278098fa-7662-4ae7-b58f-612c81d4b7d0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(async response => {
        let responseData;
        try {
          responseData = await response.json();
        } catch (jsonErr) {
          responseData = {};
          console.error('Ошибка при разборе JSON-ответа:', jsonErr);
        }

        // Подробное логирование ответа от сервера
        console.log('Статус ответа:', response.status, response.statusText);
        console.log('Заголовки ответа:', [...response.headers.entries()]);
        console.log('Тело ответа:', responseData);

        if (response.ok) {
          // Ожидаем, что в ответе будет ссылка для перенаправления в поле payment_url
          if (responseData && responseData.payment_url) {
            console.log('Получена ссылка для перехода:', responseData.payment_url);
            window.location.href = responseData.payment_url;
          } else {
            // loader не скрываем
            console.error('В ответе отсутствует поле payment_url. Ответ:', responseData);
            alert('Не удалось получить ссылку для перехода.');
          }
        } else {
          // loader не скрываем
          console.error('Ошибка от сервера:', {
            status: response.status,
            statusText: response.statusText,
            responseData: responseData
          });
          alert(
            'Произошла ошибка при отправке формы.\n' +
            `Статус: ${response.status} ${response.statusText}\n` +
            (responseData && responseData.message ? `Сообщение: ${responseData.message}` : '')
          );
        }
      })
      .catch(error => {
        // loader не скрываем
        // Подробное логирование ошибки
        console.error('Ошибка при выполнении запроса:', error);
        alert('Произошла ошибка при отправке формы. Подробнее смотрите в консоли.');
      });
  });
}
});
