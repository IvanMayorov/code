// Селекторы элементов
const searchInput = document.querySelector('.search_input');
const searchClearIcon = document.querySelector('.search_clear_icon');
const searchButton = document.querySelector('.search_button');
const searchSection = document.querySelector('[data-search-section]');
const blogSection = document.querySelector('[data-blog-section]');

// Функция для показа/скрытия иконки очистки
const toggleClearIcon = () => {
    if (!searchClearIcon || !searchInput) return;
    
    const hasValue = searchInput.value.trim() !== '';
    searchClearIcon.style.display = hasValue ? '' : 'none';
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

// При загрузке скрываем секцию поиска
showBlogSection();
