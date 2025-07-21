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

        // Обновляем mobile price при смене тарифа
        if (dataMobilePrice) {
            const discount = discounts[selectedMonthIdx] !== undefined ? discounts[selectedMonthIdx] : 1;
            let mobilePrice = 0;
            if (selectedTariffIdx === 0) mobilePrice = startPrice;
            else if (selectedTariffIdx === 1) mobilePrice = standartPrice;
            else if (selectedTariffIdx === 2) mobilePrice = profPrice;
            else mobilePrice = startPrice;
            dataMobilePrice.textContent = Math.round(mobilePrice * discount).toLocaleString('ru-RU');
        }
    });
});

const discounts = [1, 0.9, 0.85, 0.8];

pricesMonthsBox.forEach((box, idx) => {
    box.addEventListener('click', function() {
        pricesMonthsBox.forEach(b => b.classList.remove('is-black'));
        this.classList.add('is-black');

        selectedMonthIdx = idx;
        const discount = discounts[idx] !== undefined ? discounts[idx] : 1;

        dataStartPrice.textContent = Math.round(startPrice * discount).toLocaleString('ru-RU');
        dataStandartPrice.textContent = Math.round(standartPrice * discount).toLocaleString('ru-RU');
        dataProfPrice.textContent = Math.round(profPrice * discount).toLocaleString('ru-RU');

        if (dataMobilePrice) {
            let mobilePrice = 0;
            if (selectedTariffIdx === 0) mobilePrice = startPrice;
            else if (selectedTariffIdx === 1) mobilePrice = standartPrice;
            else if (selectedTariffIdx === 2) mobilePrice = profPrice;
            else mobilePrice = startPrice;
            dataMobilePrice.textContent = Math.round(mobilePrice * discount).toLocaleString('ru-RU');
        }
    });
});
