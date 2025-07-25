// Получаем значение из атрибута prefilled_promo_code из URL и подставляем в data-promotion
(function() {
  // Получаем параметры из URL
  const params = new URLSearchParams(window.location.search);
  const promo = params.get('prefilled_promo_code');
  if (promo) {
    // Находим все элементы с data-promotion и подставляем значение
    document.querySelectorAll('[data-promotion]').forEach(function(el) {
      el.setAttribute('data-promotion', promo);
    });
  }
})();
