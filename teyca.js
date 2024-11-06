// DOM Elements
const rangeInputClients = document.querySelector('input[name="clients"]');
const rangeInputKass = document.querySelector('input[name="kass"]');
const clientsTargetDiv = document.querySelector('[data-clients]');
const kassTargetDiv = document.querySelector('[data-kass]');
const resultBox = document.querySelector('[data-final-result]');
const resultBoxes = Array.from(document.querySelectorAll('input[name="result"]')).map(input => input.closest('label'));
const tariffRadioButtons = document.querySelectorAll('input[name="tariff"]');
const priceLabel = document.querySelector('[data-price-label]');
// console.log(resultBoxes);
const tariffPrices = {
  start: 2990,
  standard: 5490,
  prof: 7990
};

const additionalPointPrices = {
  start: 1990,
  standard: 1490,
  prof: 990
};

const formatNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const updateSliderBackground = (sliderEl) => {
  const tempSliderValue = sliderEl.value; 
  const progress = (tempSliderValue / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #A2C5FF ${progress}%, rgba(0, 0, 0, 0.05) ${progress}%)`;
};

const calculateTotalCost = () => {
  const selectedTariff = document.querySelector('input[name="tariff"]:checked').value;
  const kassValue = rangeInputKass ? rangeInputKass.value : 1;
  const additionalPoints = kassValue - 1;
  const totalCost = tariffPrices[selectedTariff] + (additionalPoints * additionalPointPrices[selectedTariff]);

  resultBoxes.forEach((box) => {
    const resultValue = box.querySelector('input[name="result"]').value;
    let finalCost = totalCost;

    if (resultValue === '3') {
      finalCost = totalCost * 0.9; // 10% discount
    } else if (resultValue === '6') {
      finalCost = totalCost * 0.85; // 15% discount
    } else if (resultValue === '12') {
      finalCost = totalCost * 0.8; // 20% discount
    }

    box.querySelector('[data-result]').textContent = `${formatNumberWithSpaces(finalCost.toFixed())} ₽`;

    if (box.querySelector('input[name="result"]').checked) {  
        resultBox.textContent = `${formatNumberWithSpaces(finalCost.toFixed())} ₽`;
    }
  });
};

if (rangeInputClients) {
  rangeInputClients.addEventListener('input', (e) => {
    const clientsValue = e.target.value;
    if (clientsTargetDiv) {
      clientsTargetDiv.textContent = clientsValue;
    }

    let selectedTariff = 'start';
    if (clientsValue <= 1000) {
      selectedTariff = 'start';
    } else if (clientsValue <= 5000) {
      selectedTariff = 'standard';
    } else {
      selectedTariff = 'prof';
    }
    document.querySelector(`input[name="tariff"][value="${selectedTariff}"]`).checked = true;

    // Update data-price-label with additional point price
    if (priceLabel) {
      priceLabel.textContent = `${formatNumberWithSpaces(additionalPointPrices[selectedTariff])} ₽`;
    }

    calculateTotalCost();
    updateSliderBackground(rangeInputClients);
  });
  
}

if (rangeInputKass) {
  rangeInputKass.addEventListener('input', (e) => {
    const kassValue = e.target.value;
    if (kassTargetDiv) {
      kassTargetDiv.textContent = kassValue;
    }

    calculateTotalCost();
    updateSliderBackground(rangeInputKass);
  });
  
}

// Update slider backgrounds on page load
if (rangeInputClients) {
  updateSliderBackground(rangeInputClients);
}

if (rangeInputKass) {
  updateSliderBackground(rangeInputKass);
}

tariffRadioButtons.forEach((button) => {
  button.addEventListener('change', () => {
    calculateTotalCost();
  });
});

// Add event listener for result inputs to update prices
resultBoxes.forEach((box) => {
  const resultInput = box.querySelector('input[name="result"]');
  resultInput.addEventListener('change', () => {
    calculateTotalCost();
  });
});
