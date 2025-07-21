const dataStartPrice = document.querySelector('[data-start-price]');
const dataStandartPrice = document.querySelector('[data-standart-price]');
const dataProfPrice = document.querySelector('[data-prof-price]');
const dataMobilePrice = document.querySelector('[data-mobile-price]');
const cardsCount = document.querySelector('.cards_count');

const startPrice = dataStartPrice ? parseInt(dataStartPrice.textContent.replace(/\D/g, ''), 10) : 0;
const standartPrice = dataStandartPrice ? parseInt(dataStandartPrice.textContent.replace(/\D/g, ''), 10) : 0;
const profPrice = dataProfPrice ? parseInt(dataProfPrice.textContent.replace(/\D/g, ''), 10) : 0;

const pricesMonthsBox = document.querySelectorAll('.prices_months_box');

let selectedTariffIdx = 0;
let selectedMonthIdx = 0;

document.querySelectorAll('.tariff_card').forEach((card, idx) => {
    card.addEventListener('click', function() {
        // Убираем активный класс со всех карточек
        document.querySelectorAll('.tariff_card').forEach(c => c.classList.remove('tariff_card_active'));
        this.classList.add('tariff_card_active');

        // Скрываем все tariff_card_add_box
        const addBoxes = document.querySelectorAll('.tariff_card_add_box');
        addBoxes.forEach((box, boxIdx) => {
            box.style.display = (boxIdx === idx) ? 'flex' : 'none';
        });

        selectedTariffIdx = idx;

        // Устанавливаем cardsCount в зависимости от тарифа
        if (cardsCount) {
            if (selectedTariffIdx === 0) {
                cardsCount.textContent = '1';
            } else if (selectedTariffIdx === 1) {
                cardsCount.textContent = '5';
            } else if (selectedTariffIdx === 2) {
                cardsCount.textContent = '100';
            } else {
                cardsCount.textContent = '1';
            }
        }

        // Обновляем цены при смене тарифа
        updatePrices();
    });
});

const discounts = [1, 0.9, 0.85, 0.8];

// Функция для обновления цен
function updatePrices() {
    const discount = discounts[selectedMonthIdx] !== undefined ? discounts[selectedMonthIdx] : 1;

    if (dataStartPrice) {
        dataStartPrice.textContent = Math.round(startPrice * discount).toLocaleString('ru-RU');
    }
    if (dataStandartPrice) {
        dataStandartPrice.textContent = Math.round(standartPrice * discount).toLocaleString('ru-RU');
    }
    if (dataProfPrice) {
        dataProfPrice.textContent = Math.round(profPrice * discount).toLocaleString('ru-RU');
    }

    if (dataMobilePrice) {
        let mobilePrice = 0;
        if (selectedTariffIdx === 0) mobilePrice = startPrice;
        else if (selectedTariffIdx === 1) mobilePrice = standartPrice;
        else if (selectedTariffIdx === 2) mobilePrice = profPrice;
        else mobilePrice = startPrice;
        dataMobilePrice.textContent = Math.round(mobilePrice * discount).toLocaleString('ru-RU');
    }
}

if (window.innerWidth > 479) {
    pricesMonthsBox.forEach((box, idx) => {
        box.addEventListener('click', function() {
            pricesMonthsBox.forEach(b => b.classList.remove('is-black'));
            this.classList.add('is-black');

            selectedMonthIdx = idx;
            updatePrices();
        });
    });
}




const tariffCards = document.querySelectorAll('.tariff_card');

tariffCards.forEach(card => {
    card.addEventListener('click', () => {
    card.scrollIntoView({
      behavior: 'smooth', 
      block: 'nearest', 
      inline: 'center' 
    });
  });
});


// Функционал "селекта" для tariff_drop_wrap

// Открытие дропа по клику на кнопку
document.querySelectorAll('.tariff_drop_wrap').forEach(dropWrap => {
    const dropBtn = dropWrap.querySelector('.tariff_drop_btn');
    const drop = dropWrap.querySelector('.tariff_drop');
    if (dropBtn && drop) {
        dropBtn.addEventListener('click', function(e) {
            console.log('click');
            // Открыть дроп: display: flex
            drop.style.display = 'flex';
        });
    }
});

// Выбор опции и закрытие дропа
document.querySelectorAll('.tariff_drop .prices_months_box').forEach(box => {
    box.addEventListener('click', function(e) {
        // Найти ближайший tariff_drop_wrap
        const dropWrap = this.closest('.tariff_drop_wrap');
        if (!dropWrap) return;

        // Найти tariff_drop_btn и tariff_drop внутри этого tariff_drop_wrap
        const dropBtn = dropWrap.querySelector('.tariff_drop_btn');
        const drop = dropWrap.querySelector('.tariff_drop');
        if (!dropBtn || !drop) return;

        // Удалить существующий .prices_months_box внутри .tariff_drop_btn
        const existingBox = dropBtn.querySelector('.prices_months_box');
        if (existingBox) {
            existingBox.remove();
        }

        // Клонировать кликнутый .prices_months_box
        const clonedBox = this.cloneNode(true);

        // Вставить клон в начало .tariff_drop_btn
        dropBtn.insertBefore(clonedBox, dropBtn.firstChild);

        // Добавить класс is-hidden выбранной опции, убрать у остальных
        drop.querySelectorAll('.prices_months_box').forEach(opt => {
            opt.classList.remove('is-hidden');
        });
        this.classList.add('is-hidden');

        // Определить индекс выбранного периода и обновить цены
        const allOptions = Array.from(drop.querySelectorAll('.prices_months_box'));
        selectedMonthIdx = allOptions.indexOf(this);
        updatePrices();

        // Закрыть дроп: display: none
        drop.style.display = 'none';
    });
});
