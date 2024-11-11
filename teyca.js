
// DOM Elements
const rangeInputClients = document.querySelector('input[name="clients"]');
const rangeInputKass = document.querySelector('input[name="kass"]');
const clientsTargetDiv = document.querySelector('[data-clients]');
const kassTargetDiv = document.querySelector('[data-kass]');
const resultBox = document.querySelector('[data-final-result]');
const resultBoxes = Array.from(document.querySelectorAll('input[name="result"]')).map(input => input.closest('label'));
const tariffRadioButtons = document.querySelectorAll('input[name="tariff"]');
const priceLabel = document.querySelector('[data-price-label]');
const tariffButton = document.querySelectorAll('[data-tariff-button]');

tariffButton.forEach(button => {
    button.addEventListener('click', (e) => {
        const tariffValue = button.getAttribute('data-tariff-button');
        // console.log(tariffValue); // You can replace this with any action you want to perform with the tariffValue
        document.querySelector(`input[name="tariff"][value="${tariffValue}"]`).checked = true;
        calculateTotalCost();
    });
});


const revertCalcButton = document.querySelector('[data-revert-calc]');
let tooltipVisible = true;

let previousTariff = 'start';
const tooltip = document.querySelector('.calc_tooltip');
const tariffNameElement = document.querySelector('[data-tariff-name]');

function updateSelectedTariff(clientsValue) {
    const selectedTariffValue = Array.from(tariffRadioButtons).find(radio => radio.checked)?.value || '';


    if (clientsValue <= 5000 && clientsValue > 1000 && selectedTariffValue !== 'prof') {
        setTariff('standard', 'Стандарт');
        previousTariff = 'start';
    } else if (clientsValue > 5000) {
        setTariff('prof', 'Профессионал');
        previousTariff = 'standard';
    }


}

revertCalcButton.addEventListener('click', () => {
    if (previousTariff === 'start') {
        document.querySelector(`input[name="tariff"][value="start"]`).checked = true;
    } else if (previousTariff === 'standard') {
        document.querySelector(`input[name="tariff"][value="standard"]`).checked = true;
    }
    tooltip.style.display = 'none';
});

function setTariff(tariff, name) {
    document.querySelector(`input[name="tariff"][value="${tariff}"]`).checked = true;
    if (tooltipVisible) {
        tooltip.style.display = 'flex';
        tariffNameElement.textContent = name;
    }
}

document.querySelectorAll('[data-tooltip-close]').forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector('.calc_tooltip').style.display = 'none';
        tooltipVisible = false; // Set tooltipVisible to false when tooltip is closed
    });
});



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

        box.querySelector('[data-result]').textContent = `${formatNumberWithSpaces(finalCost.toFixed())} ₽ / мес`;

        if (box.querySelector('input[name="result"]').checked) {  
            resultBox.textContent = `${formatNumberWithSpaces(finalCost.toFixed())} ₽`;
            priceLabel.textContent = `${additionalPointPrices[selectedTariff]} ₽`; // Update price label based on selected tariff
        }
    });
};

if (rangeInputClients) {
    rangeInputClients.addEventListener('input', (e) => {
        const clientsValue = e.target.value;
        if (clientsTargetDiv) {
            clientsTargetDiv.textContent = clientsValue;
        }
        updateSelectedTariff(clientsValue);
        calculateTotalCost();
        updateSliderBackground(rangeInputClients);
    });

    // Add event listener for editable clients target div
    if (clientsTargetDiv.isContentEditable) {
        clientsTargetDiv.addEventListener('input', (e) => {
            const value = parseInt(e.target.textContent, 10);
            if (!isNaN(value)) {
                rangeInputClients.value = value;
                updateSliderBackground(rangeInputClients);
                updateSelectedTariff(value);
                calculateTotalCost();
            }
        });
    }
}

if (rangeInputKass) {
    rangeInputKass.addEventListener('input', (e) => {
        const kassValue = e.target.value;
        const selectedTariffValue = Array.from(tariffRadioButtons).find(radio => radio.checked)?.value || '';
        if (kassTargetDiv) {
            kassTargetDiv.textContent = kassValue;
        }
        if (kassValue > 8 && selectedTariffValue !== 'prof') {
            document.querySelector('input[name="tariff"][value="prof"]').checked = true;
            setTariff('prof', 'Профессионал');
        } else if (kassValue > 7 && selectedTariffValue !== 'standard' && selectedTariffValue !== 'prof') {
            document.querySelector('input[name="tariff"][value="standard"]').checked = true;
        }

        calculateTotalCost();
        updateSliderBackground(rangeInputKass);
    });

    // Add event listener for editable kass target div
    if (kassTargetDiv.isContentEditable) {
        kassTargetDiv.addEventListener('input', (e) => {
            const value = parseInt(e.target.textContent, 10);
            if (!isNaN(value)) {
                rangeInputKass.value = value;
                updateSliderBackground(rangeInputKass);
                calculateTotalCost();
            }
        });
    }
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

const editableElements = document.querySelectorAll("[contenteditable='true']");

editableElements.forEach((element) => {
  element.addEventListener("input", () => {
    element.textContent = element.textContent.replace(/\D/g, '');
  });

  element.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    const digitsOnly = text.replace(/\D/g, '');
    document.execCommand("insertText", false, digitsOnly);
  });
});


