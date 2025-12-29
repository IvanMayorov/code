

// Выполнить код после загрузки Finsweet Attributes
(function() {
  // Функция для выполнения основного кода
  function initJuroRichBack() {
    // Найти все элементы с классом 'learn_article_rich'
    const learnArticleRichElements = document.querySelectorAll('.learn_article_rich');
    
    if (learnArticleRichElements.length === 0) {
      return;
    }
    
    // Собрать все H2 только из элементов .learn_article_rich и пронумеровать их глобально
    const allH2Elements = [];
    learnArticleRichElements.forEach(parent => {
      const h2InParent = parent.querySelectorAll('h2, H2');
      h2InParent.forEach(h2 => {
        allH2Elements.push(h2);
      });
    });
    
    const h2Map = new Map(); // Map для хранения номера каждого H2
    
    allH2Elements.forEach((h2, index) => {
      const h2Number = index + 1; // Нумерация начинается с 1
      h2Map.set(h2, h2Number);
    });
    
    learnArticleRichElements.forEach((parent, parentIndex) => {
      // Создать абсолютные div'ы для div'ов, внутри которых есть четный H2
      // Используем Array.from для получения прямых дочерних div'ов
      const allDivs = Array.from(parent.children).filter(child => child.tagName === 'DIV');
      
      if (allDivs.length === 0) {
        return;
      }
      
      allDivs.forEach((div, index) => {
        // Найти первый H2 внутри этого div
        const h2Inside = div.querySelector('h2, H2');
        
        if (!h2Inside) {
          return;
        }
        
        // Получить номер этого H2 из глобальной нумерации
        const h2Number = h2Map.get(h2Inside);
        
        if (!h2Number) {
          return;
        }
        
        // Проверить, является ли H2 четным
        const isEven = h2Number % 2 === 0;
        
        if (isEven) {
          // Проверить, не создан ли уже fullwidth div для этого элемента
          if (div.querySelector('.rich-div-fullwidth')) {
            return;
          }
          
          const fullWidthDiv = document.createElement('div');
          fullWidthDiv.className = 'rich-div-fullwidth';
          
          // Вычислить позицию элемента относительно viewport
          const rect = div.getBoundingClientRect();
          
          // Расстояние слева от элемента до левого края viewport
          const leftOffset = rect.left;
          // Расстояние справа от элемента до правого края viewport
          const rightOffset = window.innerWidth - rect.right;
          
          // Установить стили для растягивания на всю ширину страницы
          fullWidthDiv.style.position = 'absolute';
          fullWidthDiv.style.left = `-${leftOffset}px`;
          fullWidthDiv.style.right = `-${rightOffset}px`;
          fullWidthDiv.style.width = '100vw';
          fullWidthDiv.style.top = '0';
          fullWidthDiv.style.bottom = '0';
          fullWidthDiv.style.pointerEvents = 'none'; // Чтобы не блокировать клики на контент
          fullWidthDiv.style.zIndex = '-1'; // Разместить за контентом
          fullWidthDiv.style.backgroundColor = '#FAF8F6';
          
          // Установить родителю position: relative для корректной работы absolute
          if (getComputedStyle(div).position === 'static') {
            div.style.position = 'relative';
          }
          
          // Добавить div внутрь
          div.appendChild(fullWidthDiv);
        }
      });
    });
  }

  let codeExecuted = false;
  let executionTimeout = null;
  
  function executeCode() {
    if (codeExecuted) {
      return;
    }
    codeExecuted = true;
    setTimeout(initJuroRichBack, 500);
  }
  
  function findAndObserveTocGrid() {
    const tocGridWrap = document.querySelector('.rich_toc_grid_wrap');
    
    if (tocGridWrap) {
      // Создать MutationObserver для отслеживания изменений внутри элемента
      const observer = new MutationObserver((mutations) => {
        let hasContentChanges = false;
        
        mutations.forEach((mutation) => {
          // Проверяем изменения в дочерних элементах или текстовом содержимом
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            hasContentChanges = true;
          } else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
            hasContentChanges = true;
          }
        });
        
        if (hasContentChanges) {
          // Очистить предыдущий таймаут
          if (executionTimeout) {
            clearTimeout(executionTimeout);
          }
          
          // Запустить код с небольшой задержкой (debounce)
          executionTimeout = setTimeout(() => {
            if (!codeExecuted) {
              executeCode();
              // Отключить наблюдатель после первого выполнения
              observer.disconnect();
            }
          }, 500);
        }
      });
      
      // Начать наблюдение за изменениями внутри элемента
      observer.observe(tocGridWrap, {
        childList: true,        // Отслеживать добавление/удаление дочерних элементов
        subtree: true,           // Отслеживать изменения во всех потомках
        characterData: true,     // Отслеживать изменения текста
        attributes: false        // Не отслеживать изменения атрибутов
      });
      
      // Если внутри уже есть контент, запустить код сразу
      if (tocGridWrap.children.length > 0 || tocGridWrap.textContent.trim().length > 0) {
        setTimeout(() => {
          if (!codeExecuted) {
            executeCode();
            observer.disconnect();
          }
        }, 500);
      }
      
      return true;
    }
    
    return false;
  }
  
  // Попытаться найти элемент сразу
  if (!findAndObserveTocGrid()) {
    // Если элемент не найден, использовать MutationObserver для отслеживания его появления
    const documentObserver = new MutationObserver(() => {
      if (findAndObserveTocGrid()) {
        documentObserver.disconnect();
      }
    });
    
    // Начать наблюдение за добавлением элементов в body
    documentObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Резервный таймаут на случай, если элемент не появится
    setTimeout(() => {
      documentObserver.disconnect();
      if (!codeExecuted) {
        executeCode();
      }
    }, 10000);
  }
})();


// #region FAQ dropdown ________________________________________________________________________
(function() {
    // Используем Set для отслеживания обработанных элементов
    const processedH4 = new WeakSet();

    function initFaqDropdown() {
        // Ищем все контейнеры с атрибутом data-rich-dropdown
        const h4DropdownContainers = document.querySelectorAll('[data-rich-dropdown]');
        
        if (h4DropdownContainers.length === 0) {
            return; // Контейнеры не найдены, выходим без ошибок
        }

        // Получаем шаблон иконки ДО удаления шаблона rich-dropdown
        const plusIconTemplate = document.querySelector('.rich-dropdown-icon');

        // Удаляем шаблон по атрибуту data-rich-template
        const template = document.querySelector('[data-rich-template]');
        if (template) {
            template.remove();
        }
        
        let processedCount = 0;
        
        // Обрабатываем каждый контейнер
        h4DropdownContainers.forEach(container => {
            // Ищем все h4 внутри контейнера (не только прямые потомки)
            const h4Elements = container.querySelectorAll('h4:not(.rich-dropdown-question h4)');
            
            if (h4Elements.length === 0) {
                return; // В этом контейнере нет h4
            }

            console.log(`✅ Найдено H4 элементов в контейнере: ${h4Elements.length}`);
        
            // Обрабатываем все h4 элементы
            h4Elements.forEach(function (h4, index) {
                // Пропускаем, если уже обработан
                if (processedH4.has(h4) || h4.closest('.rich-dropdown-question')) {
                    return;
                }

                const question = h4.textContent.trim();
                if (!question) {
                    return;
                }

                console.log(`🔄 Обработка H4 #${index + 1}: "${question.substring(0, 50)}"`);
                
                // Помечаем как обработанный до начала манипуляций
                processedH4.add(h4);

                // Сбор ответа: элементы между этим h4 и следующим h4
                let answerElements = [];
                let next = h4.nextElementSibling;
                while (next && next.tagName !== 'H4') {
                    answerElements.push(next);
                    next = next.nextElementSibling;
                }

                // Оформление DOM
                // Сохраняем ссылку на родителя и позицию h4 ПЕРЕД любыми манипуляциями
                const h4Parent = h4.parentNode;
                const h4NextSibling = h4.nextElementSibling;

                // Создаем общий контейнер для вопроса и ответа
                const dropdownContainer = document.createElement('div');
                dropdownContainer.className = 'rich-dropdown';

                // Сначала вставляем контейнер на место h4 (до перемещения h4)
                if (h4NextSibling) {
                    h4Parent.insertBefore(dropdownContainer, h4);
                } else {
                    h4Parent.insertBefore(dropdownContainer, h4);
                    // Если nextSibling null, вставляем перед h4, потом h4 будет последним
                }

                // Создаем обертку для вопроса
                const dropline = document.createElement('div');
                dropline.className = 'rich-dropdown-question';
                
                // Теперь перемещаем h4 в dropline (это автоматически удалит его из исходного места)
                dropline.appendChild(h4);

                // Добавляем .rich-dropdown-icon (клонируем шаблон или создаем новый)
                if (plusIconTemplate) {
                    const plusIcon = plusIconTemplate.cloneNode(true);
                    plusIcon.classList.remove('is-opened');
                    dropline.appendChild(plusIcon);
                } else {
                    // Если иконка не найдена, создаем простую
                    const plusIcon = document.createElement('div');
                    plusIcon.className = 'rich-dropdown-icon';
                    dropline.appendChild(plusIcon);
                }

                // Добавляем вопрос в контейнер
                dropdownContainer.appendChild(dropline);

                // Создаем обертку для ответа (если есть элементы)
                if (answerElements.length > 0) {
                    // Внешняя обертка для анимации
                    const answerWrapper = document.createElement('div');
                    answerWrapper.className = 'rich-dropdown-answer-wrap';
                    answerWrapper.style.height = '0px';
                    answerWrapper.style.overflow = 'hidden';
                    
                    // Внутренняя обертка для контента
                    const answerContent = document.createElement('div');
                    answerContent.className = 'rich-dropdown-answer';
                    
                    // Перемещаем элементы во внутреннюю обертку
                    answerElements.forEach(el => {
                        answerContent.appendChild(el);
                    });
                    
                    // Добавляем внутреннюю обертку во внешнюю
                    answerWrapper.appendChild(answerContent);
                    
                    // Добавляем внешнюю обертку в контейнер
                    dropdownContainer.appendChild(answerWrapper);
                }
                
                processedCount++;
                console.log(`✅ Dropdown создан для H4 #${index + 1}`);

                // Навешиваем обработчик
                dropline.addEventListener('click', function () {
                    const drop = dropdownContainer.querySelector('.rich-dropdown-answer-wrap');
                    if (drop) {
                        const icon = dropline.querySelector('.rich-dropdown-icon');
                        
                        if (drop.classList.contains('is-opened')) {
                            // Закрытие
                            drop.style.transition = 'height 0.2s';
                            drop.style.height = '0px';
                            if (icon) {
                                icon.classList.remove('is-opened');
                                // Удаляем is-opened у всех элементов внутри иконки
                                icon.querySelectorAll('*').forEach(el => {
                                    el.classList.remove('is-opened');
                                });
                            }
                            dropline.classList.remove('is-opened');
                            drop.classList.remove('is-opened');
                        } else {
                            // Открытие
                            // Измеряем высоту внутреннего контейнера с контентом
                            const answerContent = drop.querySelector('.rich-dropdown-answer');
                            if (answerContent) {
                                drop.style.height = 'auto';
                                const height = answerContent.offsetHeight;
                                drop.style.height = '0px';
                                drop.style.transition = '';
                                
                                // Для плавного открытия
                                requestAnimationFrame(() => {
                                    drop.style.transition = 'height 0.2s';
                                    drop.style.height = height + 'px';
                                });
                            } else {
                                // Fallback на старую структуру
                                drop.style.height = 'auto';
                                const height = drop.offsetHeight;
                                drop.style.height = '0px';
                                drop.style.transition = '';
                                
                                requestAnimationFrame(() => {
                                    drop.style.transition = 'height 0.2s';
                                    drop.style.height = height + 'px';
                                });
                            }
                            
                            if (icon) {
                                icon.classList.add('is-opened');
                                // Добавляем is-opened всем элементам внутри иконки
                                icon.querySelectorAll('*').forEach(el => {
                                    el.classList.add('is-opened');
                                });
                            }
                            dropline.classList.add('is-opened');
                            drop.classList.add('is-opened');
                        }
                    }
                });
            });
        });
        
        if (processedCount > 0) {
            console.log(`✨ Обработано dropdown элементов: ${processedCount}`);
        }
    }

    // Функция для проверки наличия необработанных элементов
    function hasUnprocessedElements() {
        const containers = document.querySelectorAll('[data-rich-dropdown]');
        for (let container of containers) {
            const h4Elements = container.querySelectorAll('h4:not(.rich-dropdown-question h4)');
            for (let h4 of h4Elements) {
                if (!h4.closest('.rich-dropdown-question')) {
                    return true; // Найден необработанный элемент
                }
            }
        }
        return false;
    }

    // Debounce функция для оптимизации
    let debounceTimer = null;
    function debouncedInit() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            if (hasUnprocessedElements()) {
                initFaqDropdown();
            }
        }, 100);
    }

    // Пытаемся выполнить сразу
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initFaqDropdown();
        });
    } else {
        initFaqDropdown();
    }

    // Используем MutationObserver для отслеживания появления элементов
    const observer = new MutationObserver(function(mutations) {
        // Проверяем, есть ли изменения, которые могут добавить новые h4
        let shouldCheck = false;
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                shouldCheck = true;
            }
        });
        
        if (shouldCheck && hasUnprocessedElements()) {
            debouncedInit();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Периодическая проверка на случай, если MutationObserver пропустит изменения
    const intervalId = setInterval(() => {
        if (hasUnprocessedElements()) {
            initFaqDropdown();
        } else {
            clearInterval(intervalId);
        }
    }, 1000);

    // Останавливаем проверку через 30 секунд
    setTimeout(() => {
        clearInterval(intervalId);
        observer.disconnect();
    }, 30000);
})();

