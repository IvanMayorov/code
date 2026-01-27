// Селекторы элементов
const searchInput = document.querySelector('.search_input');
const searchClearIcon = document.querySelector('.search_clear_icon');
const searchButton = document.querySelector('.search_button');
const searchSection = document.querySelector('[data-search-section]');
const blogSection = document.querySelector('[data-blog-section]');
const searchEmptyBox = document.querySelector('.search_empty_box');
const searchBar = document.querySelector('.search_bar');
const searchForm = document.querySelector('.search_form');

// Функция для показа/скрытия иконки очистки
const toggleClearIcon = () => {
    if (!searchClearIcon || !searchInput) return;
    
    const hasValue = searchInput.value.trim() !== '';
    searchClearIcon.style.display = hasValue ? 'block' : 'none';
};

// Функция для показа секции поиска и скрытия блога
const showSearchSection = () => {
    if (searchSection && blogSection) {
        searchSection.style.display = '';
        blogSection.style.display = 'none';
    }
    // Скрываем кнопку поиска
    if (searchButton) {
        searchButton.style.display = 'none';
    }
};

// Функция для показа блога и скрытия секции поиска
const showBlogSection = () => {
    if (searchSection && blogSection) {
        searchSection.style.display = 'none';
        blogSection.style.display = '';
    }
};

// Обработка иконки очистки
if (searchClearIcon && searchInput) {
    // Устанавливаем начальное состояние
    toggleClearIcon();

    // Обновляем иконку при вводе
    searchInput.addEventListener('input', toggleClearIcon);

    // Очистка по клику
    searchClearIcon.addEventListener('click', () => {
        searchInput.value = '';
        toggleClearIcon();
        searchInput.focus();
        showBlogSection();
        // Показываем кнопку поиска
        if (searchButton) {
            searchButton.style.display = '';
        }
    });
}

// Обработка кнопки поиска
if (searchButton) {
    searchButton.addEventListener('click', showSearchSection);
}

// Запрещаем отправку формы при нажатии Enter
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Обработка нажатия Enter в поле поиска
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            e.preventDefault();
            showSearchSection();
        }
    });
}

// При загрузке скрываем секцию поиска
showBlogSection();

// Функция для проверки видимости элемента
const isElementVisible = (element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
};

// Функция для обновления видимости search_bar в зависимости от search_empty_box
const updateSearchBarVisibility = () => {
    if (!searchBar) return;
    
    const isEmptyBoxVisible = isElementVisible(searchEmptyBox);
    searchBar.style.display = isEmptyBoxVisible ? 'none' : '';
};

// Обсервер для отслеживания изменений видимости search_empty_box
if (searchEmptyBox && searchBar) {
    // Устанавливаем начальное состояние
    updateSearchBarVisibility();

    // Создаем MutationObserver для отслеживания изменений стилей
    const observer = new MutationObserver(() => {
        updateSearchBarVisibility();
    });

    // Наблюдаем за изменениями атрибутов style и класса
    observer.observe(searchEmptyBox, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: false
    });

    // Также отслеживаем изменения через ResizeObserver для случаев изменения размеров
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            updateSearchBarVisibility();
        });
        resizeObserver.observe(searchEmptyBox);
    }
}

window.addEventListener('load', () => {
    const sortingBoxes = document.querySelectorAll('.sorting_box');
    sortingBoxes.forEach(sortingBox => {
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        sortingBox.dispatchEvent(clickEvent);
        console.log('Клик по sortingBox:', sortingBox);
    });
    
    // Через 500ms добавляем класс для второго элемента
    setTimeout(() => {
        if (sortingBoxes.length > 1) {
            sortingBoxes[1].classList.add('is-list-asc');
        }
    }, 500);
});



const sortButtons = document.querySelectorAll('.sort_button');
sortButtons.forEach(sortButton => {
    let opened = false;
    sortButton.addEventListener('click', () => {
        const animatedSortingBoxes = document.querySelectorAll('.sorting_box.is-animated');
        if (!opened) {
            animatedSortingBoxes.forEach(box => {
                box.classList.add('is-opened');
            });
            sortButton.classList.add('is-opened');
            opened = true;
        } else {
            animatedSortingBoxes.forEach(box => {
                box.classList.remove('is-opened');
            });
            sortButton.classList.remove('is-opened');
            opened = false;
        }
    });
});