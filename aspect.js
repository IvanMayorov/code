// Симптомы по их индексам
const symptomsList = {
    0: "- Infertility",
    1: "- Excessive body hair",
    2: "- Hard weight loss",
    3: "- Ovarian cysts",
    4: "- Low sex drive",
    5: "- Irregular periods",
    6: "- Thinning hair",
    7: "- High testosterone",
    8: "- Insulin resistance",
    9: "- Fatigue",
    10: "- Acne",
    11: "- Mood changes",
  };
  
  // Возрастные группы по их индексам
  const ageGroups = {
    0: "18-25 y.o.",
    1: "26-35 y.o.",
    2: "36-44 y.o.",
    3: "45+ y.o.",
  };
  
  // Получаем URL страницы и извлекаем параметры
  const urlParams = new URLSearchParams(window.location.search);
//   console.log('urlParams', urlParams);
  // Извлекаем значение параметра Symptoms
  const symptomsParam = urlParams.get("Symptoms");
  
  // Проверка, если параметр Symptoms присутствует
  if (symptomsParam) {
    // Разделяем строку Symptoms по запятым
    const symptomsIndices = symptomsParam.split(",");
  
    // Находим контейнер с атрибутом [data-symptoms]
    const symptomsContainer = document.querySelector("[data-symptoms]");
  
    // Находим блок .box-symptoms для клонирования
    const boxTemplate = symptomsContainer.querySelector(".box-symptoms");
  
    // Проверяем, что контейнер и шаблон существуют
    if (symptomsContainer && boxTemplate) {
      // Очищаем контейнер перед добавлением новых блоков (опционально)
      symptomsContainer.innerHTML = "";
  
      // Проходим по каждому симптому из параметров
      symptomsIndices.forEach((index) => {
        const symptomName = symptomsList[index.trim()]; // Получаем название симптома
        if (symptomName) {
          // Клонируем блок .box-symptoms
          const newBox = boxTemplate.cloneNode(true);
          // Обновляем содержимое нового блока с названием симптома
          newBox.textContent = symptomName; // Например, обновляем текстовый контент
          // Добавляем новый блок в контейнер
          symptomsContainer.appendChild(newBox);
        }
      });
    }
  }
  
  // Подставляем данные для профиля, если они есть
  const name = urlParams.get("Name") || "Unknown";
  const ageIndex = urlParams.get("Age");
  const age = ageGroups[ageIndex] || "Unknown";
  const currentWeight = urlParams.get("Weight1") || "Unknown";
  const targetWeight = urlParams.get("Weight2") || "Unknown";
  
  // Находим элементы с атрибутами data-name, data-age, data-current-weight и data-target-weight
  const nameElement = document.querySelector("[data-name]");
  const ageElement = document.querySelector("[data-age]");
  const currentWeightElement = document.querySelector("[data-current-weight]");
  const targetWeightElement = document.querySelector("[data-target-weight]");
  
  // Обновляем контент этих элементов
  if (nameElement) nameElement.textContent = name;
  if (ageElement) ageElement.textContent = age;
  if (currentWeightElement) currentWeightElement.textContent = currentWeight;
  if (targetWeightElement) targetWeightElement.textContent = targetWeight;
  
  // Проверяем параметр Goal, если goal=0, показываем блок .profile
  // const goal = urlParams.get("Goal");
  // console.log("goal", goal);
  // const profileContainer = document.querySelector(".profile");
  // if (goal === "0" && profileContainer) {
  //   profileContainer.style.display = "flex"; // Показываем блок
  // } else if (profileContainer) {
  //   profileContainer.style.display = "none"; // Скрываем блок
  // }
  
  const goal = urlParams.get("goal") || urlParams.get("Goal");
  const program = urlParams.get("program") || urlParams.get("Program");
  console.log(program);
//   console.log('program', program);
  const profileContainer = document.querySelector(".profile");
  if (goal === "0" || (goal === "1" && profileContainer)) {
    profileContainer.style.display = "flex";
  } else if (profileContainer) {
    profileContainer.style.display = "none"; // Скрываем блок
  }
  
  const programElements = document.querySelectorAll("[data-program]");
  if (program === '1') {
 
    programElements.forEach((element) => {
      element.style.display = "none";
    });
    const goalAllElements = document.querySelectorAll("[data-program='1']");
    console.log('goalAllElements', goalAllElements);
    goalAllElements.forEach((element) => {
      element.style.display = "block";
    });
  } else if (program === '2' || program === '3') {
    programElements.forEach((element) => {
      element.style.display = "none";
    });
    const goalAllElements = document.querySelectorAll("[data-program='2']");
    goalAllElements.forEach((element) => {
      element.style.display = "block";
    });
  }


  
  if (goal === "1") {
    goalAllElements.forEach((element) => {
      element.style.display = "none";
    });
    goal1Elements.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    goalAllElements.forEach((element) => {
      element.style.display = "flex";
    });
    goal1Elements.forEach((element) => {
      element.style.display = "none";
    });
  }
  