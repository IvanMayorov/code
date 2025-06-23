// Функция для получения UTM-меток из URL и сохранения в localStorage
function getUtmParams() {
  const utmParams = {};
  const urlParams = new URLSearchParams(window.location.search);
  
  // Список UTM-меток для отслеживания
  const utmTags = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  // Получаем существующие UTM из localStorage
  const storedUtm = JSON.parse(localStorage.getItem('utmParams') || '{}');
  
  utmTags.forEach(tag => {
    const value = urlParams.get(tag);
    // Сохраняем UTM только если его еще нет в localStorage
    if (value && !storedUtm[tag]) {
      utmParams[tag] = value;
      storedUtm[tag] = value;
    }
  });
  
  // Сохраняем обновленные UTM в localStorage
  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem('utmParams', JSON.stringify(storedUtm));
  }
   
  return storedUtm; 
}

// Функция для добавления UTM-полей в форму
function addUtmFieldsToForm(form) { 
  const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');
  
  // Создаем скрытые поля для каждой UTM-метки
  Object.entries(utmParams).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
}

// Добавляем обработчик для всех форм на странице
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем сохранение UTM при загрузке страницы
  getUtmParams();
  
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      addUtmFieldsToForm(form);
    });
  });
});
