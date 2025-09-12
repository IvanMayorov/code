// Селекторы для элементов формы
const FORM_SELECTORS = {
  multistep: '[data-form="multistep"]',
  step: '[data-form="step"]',
  nextBtn: '[data-form="next-btn"]',
  backBtn: '[data-form="back-btn"]',
  submitBtn: '[data-form="submit-btn"]',
  progressIndicator: '[data-form="progress-indicator"]',
  progress: '[data-form="progress"]'
};

// Переменные для состояния формы
let currentStep = 0;
let totalSteps = 0;
let formData = {};
let isSubmitting = false;

// Элементы формы
let multistepForm = null;
let steps = [];
let nextButtons = [];
let backButtons = [];
let submitButton = null;
let progressIndicator = null;
let progressBar = null;

// Инициализация формы
function initMultistepForm() {
  // Находим форму
  multistepForm = document.querySelector(FORM_SELECTORS.multistep);
  if (!multistepForm) {
    console.log('Форма не найдена');
    return;
  }
  
  // Находим все шаги
  steps = Array.from(multistepForm.querySelectorAll(FORM_SELECTORS.step));
  totalSteps = steps.length;
  
  // Находим кнопки и индикаторы
  nextButtons = Array.from(multistepForm.querySelectorAll(FORM_SELECTORS.nextBtn));
  backButtons = Array.from(multistepForm.querySelectorAll(FORM_SELECTORS.backBtn));
  submitButton = multistepForm.querySelector(FORM_SELECTORS.submitBtn);
  progressIndicator = multistepForm.querySelector(FORM_SELECTORS.progressIndicator);
  progressBar = multistepForm.querySelector(FORM_SELECTORS.progress);
  
  // Скрываем все шаги кроме первого
  steps.forEach((step, index) => {
    if (index === 0) {
      step.style.display = 'block';
      step.classList.add('active');
    } else {
      step.style.display = 'none';
      step.classList.remove('active');
    }
  });
  
  // Обновляем индикатор прогресса
  updateProgressIndicator();
  
  // Обновляем состояние кнопок
  updateButtonStates();
  
  // Добавляем обработчики событий
  addEventListeners();
}

// Валидация текущего шага
function validateCurrentStep() {
  const currentStepElement = steps[currentStep];
  if (!currentStepElement) return true;
  
  // Проверяем обязательные поля
  const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
  let hasRequiredErrors = false;
  
  requiredInputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      // Для чекбоксов и радио - проверяем, что хотя бы один выбран в группе
      const name = input.name;
      const groupInputs = currentStepElement.querySelectorAll(`input[name="${name}"]`);
      const isChecked = Array.from(groupInputs).some(inp => inp.checked);
      
      if (!isChecked) {
        hasRequiredErrors = true;
        input.classList.add('error');
      } else {
        groupInputs.forEach(inp => inp.classList.remove('error'));
      }
    } else {
      // Для остальных полей - проверяем, что заполнены
      if (!input.value.trim()) {
        hasRequiredErrors = true;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    }
  });
  
  // Проверяем чекбоксы (даже если они не обязательные)
  const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
  let hasCheckboxErrors = false;
  
  if (checkboxes.length > 0) {
    const checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
    
    // Если есть чекбоксы, но ни один не выбран
    if (checkedCheckboxes.length === 0) {
      hasCheckboxErrors = true;
      checkboxes.forEach(cb => cb.classList.add('error'));
    } else {
      checkboxes.forEach(cb => cb.classList.remove('error'));
    }
  }
  
  return !hasRequiredErrors && !hasCheckboxErrors;
}

// Обновление состояния кнопок
function updateButtonStates() {
  const isValid = validateCurrentStep();
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  
  // Обновляем состояние кнопок "Назад" (скрываем на первом шаге)
  backButtons.forEach(button => {
    if (isFirstStep) {
      button.style.display = 'none';
      button.classList.add('hidden');
    } else {
      button.style.display = 'block';
      button.classList.remove('hidden');
    }
  });
  
  // Обновляем состояние кнопок "Далее" (скрываем на последнем шаге)
  nextButtons.forEach(button => {
    if (isLastStep) {
      button.style.display = 'none';
      button.classList.add('hidden');
    } else {
      button.style.display = 'block';
      button.classList.remove('hidden');
      
      if (isValid) {
        button.classList.remove('disabled');
        button.disabled = false;
      } else {
        button.classList.add('disabled');
        button.disabled = true;
      }
    }
  });
  
  // Обновляем состояние кнопки "Отправить" (показываем только на последнем шаге)
  if (submitButton) {
    if (isLastStep) {
      submitButton.style.display = 'block';
      submitButton.classList.remove('hidden', 'disabled');
      submitButton.disabled = false;
    } else {
      submitButton.style.display = 'none';
      submitButton.classList.add('hidden');
    }
  }
  
  console.log(`Обновлено состояние кнопок: шаг ${currentStep + 1}/${totalSteps}, валиден: ${isValid}, первый шаг: ${isFirstStep}, последний шаг: ${isLastStep}`);
}

// Обновление индикатора прогресса
function updateProgressIndicator() {
  if (totalSteps === 0) return;
  
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;
  
  console.log(`Обновление прогресса: ${progressPercent}% (шаг ${currentStep + 1} из ${totalSteps})`);
  
  // Обновляем текст индикатора (если это текстовый элемент)
  if (progressIndicator) {
    const progressText = `${currentStep + 1} из ${totalSteps}`;
    progressIndicator.textContent = progressText;
    console.log('Обновлен текст индикатора:', progressText);
  }
  
  // Обновляем ширину полосы прогресса
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
    progressBar.style.transition = 'width 0.3s ease';
    console.log('Обновлена ширина progressBar:', `${progressPercent}%`);
  }
  
  // Если progressIndicator сам является полосой прогресса
  if (progressIndicator && progressIndicator.classList.contains('progress-bar')) {
    progressIndicator.style.width = `${progressPercent}%`;
    progressIndicator.style.transition = 'width 0.3s ease';
    console.log('Обновлена ширина progressIndicator:', `${progressPercent}%`);
  }
  
  // Дополнительная проверка: ищем любые элементы с классом progress-bar
  const allProgressBars = document.querySelectorAll('.progress-bar');
  allProgressBars.forEach(bar => {
    bar.style.width = `${progressPercent}%`;
    bar.style.transition = 'width 0.3s ease';
    console.log('Обновлена ширина найденного progress-bar:', `${progressPercent}%`);
  });
  
  // Еще одна проверка: ищем элементы с атрибутом data-form="progress"
  const allProgressElements = document.querySelectorAll('[data-form="progress"]');
  allProgressElements.forEach(element => {
    element.style.width = `${progressPercent}%`;
    element.style.transition = 'width 0.3s ease';
    element.style.display = 'block'; // Убеждаемся, что элемент видим
    console.log('Обновлена ширина элемента [data-form="progress"]:', `${progressPercent}%`);
  });
}

// Добавление обработчиков событий
function addEventListeners() {
  // Обработчики для кнопок "Далее"
  nextButtons.forEach(button => {
    button.addEventListener('click', handleNext);
  });
  
  // Обработчики для кнопок "Назад"
  backButtons.forEach(button => {
    button.addEventListener('click', handleBack);
  });
  
  // Добавляем обработчики для полей ввода на каждом шаге (только для кнопок "Далее")
  steps.forEach((step, stepIndex) => {
    const inputs = step.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      // Обработчик изменения значения (только если это не последний шаг)
      input.addEventListener('input', () => {
        if (stepIndex === currentStep && currentStep < totalSteps - 1) {
          updateButtonStates();
        }
      });
      
      // Обработчик изменения для чекбоксов и радио (только если это не последний шаг)
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.addEventListener('change', () => {
          if (stepIndex === currentStep && currentStep < totalSteps - 1) {
            updateButtonStates();
          }
        });
      }
    });
  });
}

// Обработка перехода к следующему шагу
function handleNext(e) {
  e.preventDefault();
  
  // Проверяем валидность перед переходом
  if (!validateCurrentStep()) {
    console.log('Шаг не прошел валидацию');
    return;
  }
  
  if (currentStep < totalSteps - 1) {
    // Переходим к следующему шагу
    currentStep++;
    showStep(currentStep);
    updateProgressIndicator();
    updateButtonStates();
  }
}

// Обработка возврата к предыдущему шагу
function handleBack(e) {
  e.preventDefault();
  
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
    updateProgressIndicator();
    updateButtonStates();
  }
}

// Показать определенный шаг
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.style.display = 'block';
      step.classList.add('active');
    } else {
      step.style.display = 'none';
      step.classList.remove('active');
    }
  });
}

// Принудительное обновление прогресса (для отладки)
function forceUpdateProgress() {
  console.log('Принудительное обновление прогресса');
  updateProgressIndicator();
}

// Инициализация после загрузки Webflow
function waitForWebflow() {
  return new Promise((resolve) => {
    if (window.Webflow && window.Webflow.require) {
      resolve();
    } else {
      const checkWebflow = () => {
        if (window.Webflow && window.Webflow.require) {
          resolve();
        } else {
          setTimeout(checkWebflow, 100);
        }
      };
      checkWebflow();
    }
  });
}

waitForWebflow().then(() => {
  initMultistepForm();
});

// Экспорт для отладки
window.debugProgress = {
  update: updateProgressIndicator,
  force: forceUpdateProgress,
  validate: validateCurrentStep,
  updateButtons: updateButtonStates,
  getCurrentStep: () => currentStep,
  getTotalSteps: () => totalSteps
};


