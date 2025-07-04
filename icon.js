var Webflow = Webflow || [];
Webflow.push(function(){

  // const video = document.getElementById('myVideo');
  // const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.5
  // }; 

  // const callback = (entries) => {
  //     entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //             video.play();
  //         } else {
  //             video.pause();
  //         }
  //     });
  // };

  // const observer = new IntersectionObserver(callback, options);
  // observer.observe(video);

//Fotorama _________________________________________

function initializeFotorama() {
  $(".s9-card-main-img").each(function () {
    // 1. Initialize fotorama manually for each element.
    const $fotoramaDiv = $(this).fotorama();
  
    // 2. Get the API object for each fotorama.
    const fotorama = $fotoramaDiv.data("fotorama");
    // 3. Calculate width in pixels based on rem.
    const remSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    ); // Get the size of 1 rem in pixels
  
    const thumbWidthInPx = 60 * remSize; // Calculate 60 rem in pixels
    const thumbMarginInPx = 8 * remSize; // Calculate 8 rem in pixels

    // Check if the device is mobile
    const isMobile = window.matchMedia("(max-width: 479px)").matches;
    const ratio = isMobile ? 292 / 212 : 400 / 240; // Set ratio based on device

    fotorama.setOptions({
      fit: "cover",
      ratio: ratio,
      thumbwidth: thumbWidthInPx,
      thumbheight: thumbWidthInPx,
      thumbmargin: thumbMarginInPx,
    });
    // 4. Set the thumbwidth option for each fotorama instance.
    // ScrollTrigger.refresh();
  });
  
  $(".fotorama")
    .on(
      "fotorama:fullscreenenter fotorama:fullscreenexit",
      function (e, fotorama) {
        if (e.type === "fotorama:fullscreenenter") {
          // Options for the fullscreen
          fotorama.setOptions({
            fit: "contain",
          });
        } else {
          // Back to normal settings
          fotorama.setOptions({
            fit: "cover",
          });
          // ScrollTrigger.refresh();
        }
      }
    )
    .fotorama();
}

initializeFotorama();
window.addEventListener('resize', initializeFotorama);

// Tabs _________________________________________

const tabLinks = document.querySelectorAll(".s9-tab-link");
const tabPanes = document.querySelectorAll(".s9_tab_wrap");

// Начальная настройка
tabLinks[0].classList.add("is-current");
tabPanes[0].style.display = "block";
tabPanes.forEach((pane, index) => {
  if (index !== 0) pane.style.display = "none";
  ScrollTrigger.refresh();
});

// Обработка кликов
tabLinks.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    // Переключаем таб
    document
      .querySelector(".s9-tab-link.is-current")
      .classList.remove("is-current");
    tab.classList.add("is-current");

    // Переключаем панель
    tabPanes.forEach((pane) => (pane.style.display = "none"));
    tabPanes[index].style.display = "block";
    ScrollTrigger.refresh();
    // Реинициализируем Fotorama в текущем pane
    const fotoramaElements = tabPanes[index].querySelectorAll(".fotorama");
    fotoramaElements.forEach((fotorama) => {
      const fotoramaData = $(fotorama).data("fotorama");
      $(fotorama).fotorama(); // Затем снова инициализируем Fotorama
    });

  });
});

  

const navbarHeight = document.querySelector(".navbar").offsetHeight;

//Swiper progressbar _________________________________________

const swiper = new Swiper(".s7-slider-component", {
  navigation: {
    nextEl: ".s7-next",
    prevEl: ".s7-prev",
  },
  autoplay: {
    delay: 5000, // 5 секунд
    disableOnInteraction: false, // Не останавливать автопроигрывание при взаимодействии
  },
  on: {
    slideChange: function () {
      updateActiveNavLink(swiper.activeIndex);
      resetProgressBar();
      updateButtonText(swiper.activeIndex); // Добавляем вызов функции для обновления текста кнопки
    },
    autoplay: {
      run: function () {
        startProgressBar();
      },
    },
    init: function () {
      ScrollTrigger.refresh(); // Обновляем ScrollTrigger после инициализации свайпера
    },
  },
});

const navLinks = document.querySelectorAll(".s7-nav-link");
const progressBar = document.querySelector(".progress-bar");

navLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    // Удаляем класс 'is-active' у всех ссылок
    navLinks.forEach((nav) => nav.classList.remove("is-active"));

    // Добавляем класс 'is-active' к кликнутому элементу
    link.classList.add("is-active");

    // Переключаем swiper на соответствующий слайд
    swiper.slideTo(index);
  });
});

// Функция для обновления активного nav-link при изменении слайда
function updateActiveNavLink(activeIndex) {
  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });
}

// Функция для запуска анимации progress bar
function startProgressBar() {
  progressBar.style.transition = "width 5s linear";
  progressBar.style.width = "100%";
}

// Функция для сброса progress bar
function resetProgressBar() {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  setTimeout(() => {
    startProgressBar();
  }, 50); // Задержка для корректного сброса анимации
}
gsap.set(".s7-drop-list", { height: 0 });
ScrollTrigger.refresh();
// Функция для обновления текста кнопки на ширине максимум 479 пикселей
function updateButtonText(activeIndex) {
  if (window.innerWidth <= 479) {
    const activeNavLink = navLinks[activeIndex];
    const buttonText = document.querySelector(".s7-drop-toggle .button-text");
    if (activeNavLink && buttonText) {
      buttonText.textContent = activeNavLink.textContent;
    }
  }
}

// Добавляем обработчик клика на s7-drop-toggle
const dropToggle = document.querySelector(".s7-drop-toggle");
const dropIcon = dropToggle.querySelector(".s2-drop-icon"); // Select the icon element
if (dropToggle) {
  dropToggle.addEventListener("click", () => {
    const dropList = document.querySelector(".s7-drop-list");
    if (dropList) {
      if (dropList.style.height === "auto" || dropList.style.height === "") {
        gsap.to(dropList, { height: 0, duration: 0.5, ease: "power2.inOut" });
        gsap.to(dropIcon, { rotation: 0, duration: 0.5, ease: "power2.inOut" }); // Rotate back to 0 degrees
        ScrollTrigger.refresh();
      } else {
        gsap.to(dropList, { height: "auto", duration: 0.5, ease: "power2.inOut" });
        gsap.to(dropIcon, { rotation: 90, duration: 0.5, ease: "power2.inOut" }); // Rotate to 90 degrees
        ScrollTrigger.refresh();
      }
    }
  });
}

// Запуск анимации при загрузке
startProgressBar();

// Hero Swiper ________________________________________________

const heroSwiper = new Swiper(".hero-slider-component", {
  navigation: {
    nextEl: ".hero-next",
    prevEl: ".hero-prev",
  },
});

// Tabs slider ————————————————————————————————————————————————

const tabsSwiper = new Swiper(".s2-slider-component", {
  navigation: {
    nextEl: ".s2-next",
    prevEl: ".s2-prev",
  },
});

document.querySelectorAll(".s2-drop-link").forEach((link, index) => {
  link.addEventListener("click", () => {
    tabsSwiper.slideTo(index);
  });
});

tabsSwiper.on("slideChange", () => {
  document.querySelectorAll(".s2-drop-link").forEach((link, index) => {
    link.classList.toggle("is-active", index === tabsSwiper.activeIndex);
  });
});

//Dropdow ______________________________________________________________________

// Устанавливаем начальные стили для всех .s2-drop-list
gsap.set(".s2-drop-list", { height: 0, overflow: "hidden" });

// Открываем первый .s2-drop-list
gsap.set(document.querySelector(".s2-drop-list"), { height: "auto" });

// Добавляем событие клика на все .s2-drop-toggle
document.querySelectorAll(".s2-drop-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const dropList = this.nextElementSibling; // Соседний .s2-drop-list
    const svgElement = this.querySelector(".svg"); // Найдём элемент с классом .svg внутри .s2-drop-toggle

    // Закрываем все .s2-drop-list и возвращаем svg в исходное состояние
    gsap.to(".s2-drop-list", {
      height: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(".s2-drop-toggle .svg", {
      rotate: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Открываем текущий .s2-drop-list и поворачиваем соответствующий svg
    gsap.to(dropList, {
      height: "auto",
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Поворачиваем svg на 90 градусов
    gsap.to(svgElement, {
      rotate: 90,
      duration: 0.5,
      ease: "power2.inOut",
    });
  });
});

//Глобальные переменные
const easing = "power2.out";
const duration = 0.7;


const s6SectionHeight = document.querySelector(".s6-section").offsetHeight; // Получаем высоту .s6-section
//Код для десктопа
let mediaScreen = gsap.matchMedia();
mediaScreen.add("(min-width: 992px)", () => {

  //Hero animation ______________________________________________________________________

  // Создаём таймлайн
  let tl = gsap.timeline();

  // Устанавливаем начальные позиции элементов
  // gsap.set(".navbar, .hero-descriptor-box", { yPercent: "-100" });
  // gsap.set(".hero-nav-links", { yPercent: "100", opacity: 0 });
  // gsap.set(".hero-content-left > *, .hero-logo", { y: "100vh" });
  // gsap.set(".hero-slider-component", { x: "100%", y: "100%" });

  // Добавляем анимации в таймлайн
  tl.to(".hero-slider-component", {
    x: "0%",
    y: "0%",
    duration: 0.6,
  })

    .to(".hero-descriptor-box, .hero-nav-links", {
      y: "0%",
      opacity: 1,
      duration: 0.6,
    }, '<+=0.3') // Запуск одновременно с предыдущей анимацией с задержкой в 0.5 секунды

    .to(
      ".hero-content-left > *, .hero-logo",
      {
        y: "0vh",
        duration: 0.6,
      },
      "<"
    ); // Запуск также с небольшим перекрытием по времени

  // Анимация увеличения размера
  let heroSliderAnimation = gsap.to(".hero-slider-component", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top", // Начало анимации, когда верх hero-slider-component касается верха окна
      end: "+=100%", // Длина прокрутки, по которой анимация завершится
      scrub: true, // Связка анимации с прокруткой
      pin: true, // Закрепляем элемент
      onLeave: () => {
        // Анимация navbar при прокрутке вниз
        gsap.to(".navbar", { y: '0%', duration: 0.3 });
      },
      onEnterBack: () => {
        // Анимация navbar при прокрутке назад
        gsap.to(".navbar", { y: '-100%', duration: 0.3 });
        // console.log("onLeaveBack");
      },
      //   pinSpacing: false, // Отключаем дополнительное пространство после пина
    },
    width: "100vw",
    height: "100vh",
    ease: "none",
  });

  //_________________________________________

  // Анимация 2-ой секции
  let s2SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".s2-content-block",
      start: "top 70%",
    },
  });
  s2SectionAnimation
    .from(".s2-slider-component", {
      x: "-100%",
      duration: duration,
      ease: easing,
    })
    .from(".s2-right", { y: "100%", duration: duration, ease: easing }, 0);

  // Анимация 6-ой секции ________________________________________________

  let s6SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.s6-section",
      scrub: true,
    //   pin: true,
      start: `top 50%`,
      end: `bottom bottom`, // Используем высоту .s6-section
      // markers: true,
    },
  });

  s6SectionAnimation
    .from(".s6-right-col", { y: "100%", stagger: 0.3 })
    .to(".s6-right-box1", { width: "400%" })
    .to(".s6-right-box2", { width: "400%" })
    .to(".s6-right-box3", { width: "400%" });

  // Анимация 7-ой секции _________________________________________
  gsap.fromTo(
    ".s7-right, .s7-button-wrap",
    { x: "100%", opacity: 0 }, // Начальное состояние
    {
      x: "0%",
      opacity: 1,
      duration: duration,
      ease: easing,
      scrollTrigger: {
        trigger: ".s7-content-block",
        start: "top 70%", // Старт при 30% видимости
        toggleActions: "play none none none", // Только один раз
        once: true,
      },
    }
  );

  // Анимация 8-ой секции
  let s8SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".s8-content-block",
      start: "top 70%",
    },
  });
  s8SectionAnimation
    .fromTo(
      ".s8-right",
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: duration, ease: easing }
    )
    .fromTo(
      ".s8-image",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: duration,
        ease: easing,
      },
      0
    );

  // Анимация 10-ой секции
  let s10SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.s10-section",
      scrub: true,
      // markers: true,
    //   pin: true,
      start: `top top`,
      end: `bottom bottom`,
    },
  });

  const s10RightBoxWidth = document.querySelector('.s10-right-box').offsetWidth; // Получаем ширину s10-right-box
  const s10RightContentWidth = document.querySelector('.s10-right').offsetWidth; 
  const s10RightBoxCount = document.querySelectorAll('.s10-right-box').length; // Получаем количество s10-right-box
  s10SectionAnimation
    .to(".s10-right-box", { x: `-${s10RightBoxWidth * (s10RightBoxCount - 1) - (s10RightContentWidth - s10RightBoxWidth)}px`, ease: "none" }) // смещай на количество s10-right-box минус один
    .fromTo(".s10-progress-bar", { width: "0%" }, { width: "100%" }, 0);

  // Анимация 11-ой секции
  gsap.fromTo(
    ".s11-top-right",
    { y: "100%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: duration,
      ease: easing,
      scrollTrigger: {
        trigger: ".s11-top-row",
        start: "top 70%",
      },
    }
  );

  gsap.fromTo(
    ".s11-card-bottom",
    { y: "-100%", opacity: 0 }, // Начальное состояние
    {
      y: "0%",
      opacity: 1,
      duration: duration,
      ease: easing,
      scrollTrigger: {
        trigger: ".s11-card-bottom",
        start: "top 70%",
      },
    }
  );

  // Анимация 12-ой секции
  let s12SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".s12-content-block",
      start: "top 70%",
    },
  });

  s12SectionAnimation
    .from(".s12-tabs-menu", { y: "100%", duration: duration, ease: easing })
    .from(
      ".s12-tab-pane-column1",
      { y: "100%", duration: duration, ease: easing },
      0.2
    )
    .from(
      ".s12-tab-pane-column2",
      { y: "100%", duration: duration, ease: easing },
      0.4
    );

  // Анимация для 13-ой секции
  gsap.fromTo(
    ".s13-content",
    { y: "100%", opacity: 0 }, // Начальное состояние
    {
      y: "0%",
      opacity: 1,
      duration: duration,
      ease: easing,
      scrollTrigger: {
        trigger: ".s13-content-block",
        start: "top 70%",
      },
    }
  );
});

// Код для планшета
mediaScreen.add("(max-width: 991px)", () => {
  // Анимация 2-ой секции
  let s2SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".s2-content-block",
      start: "top 70%",
    },
  });
  s2SectionAnimation
    .from(".s2-slider-component", {
      x: "-100%",
      duration: duration,
      ease: easing,
    })
    .from(".s2-right", { y: "100%", duration: duration, ease: easing }, 0);

  // Анимация 6-ой секции ________________________________________________

  // gsap.set(".s6-right-box-content", { opacity: 0 });
  let s6SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.s6-section",
      scrub: true,
    //   pin: true,
      start: `top top`,
      end: `bottom bottom`,
    //   markers: true,
    },
  });
  
  s6SectionAnimation
  .to(".s6-right-box1", { xPercent: "-100" })
  .to(".s6-right-box2", { xPercent: "-200" })
  .to(".s6-right-box3", { xPercent: "-300" });
  
  // Анимация 10-ой секции
  let s10SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.s10-section",
      scrub: true,
      //   pin: true,
      start: `top 20%`,
      end: `bottom bottom`,
      //   markers: true,
    },
  });
  
  const s10RightContentWidth = document.querySelector('.s10-right-content').offsetWidth - document.querySelector('.s10-content').offsetWidth - parseFloat(getComputedStyle(document.querySelector('.s10-right-content')).paddingLeft) - parseFloat(getComputedStyle(document.querySelector('.s10-right-content')).paddingRight);

  s10SectionAnimation
    .to(".s10-right-box", { x: s10RightContentWidth*-1 })
    .fromTo(".s10-progress-bar", { width: "0%" }, { width: "100%" }, 0);

  // Анимация 7-ой секции
  gsap.fromTo(
    ".s7-right",
    { x: "100%", opacity: 0 }, // Начальное состояние
    {
      x: "0%",
      opacity: 1,
      duration: duration,
      ease: easing,
      scrollTrigger: {
        trigger: ".s7-content-block",
        start: "top 70%", // Старт при 30% видимости
        toggleActions: "play none none none", // Только один раз
        once: true,
      },
    }
  );

  // Анимация 8-ой секции
  let s8SectionAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".s8-content-block",
      start: "top 70%",
    },
  });
  s8SectionAnimation
    .fromTo(
      ".s8-right",
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: duration, ease: easing }
    )
    .fromTo(
      ".s8-image",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: duration, ease: easing },
      0
    );

});

// Код для мобилки
mediaScreen.add("(max-width: 479px)", () => {

});

gsap.set(".video-wrap", { clipPath: "inset(25% 15%)" });
mediaScreen.add("(min-width: 480px)", () => {
// Анимация увеличения прямоугольной маски видео блока по мере скролла

gsap.to(
  ".video-wrap",
  {
    clipPath: "inset(0% 0%)",
    scrollTrigger: {
      trigger: ".s5-content-block",
      start: "top top+=60%", // Стандартное значение для десктопа
      end: "top+=50% top+=60%",
      scrub: 1, // Увеличьте значение scrub для плавности
      // markers: true,
    },
    ease: "power1.inOut" // Добавьте ease для плавности
  }
);
});

// Код для мобилки
mediaScreen.add("(max-width: 479px)", () => {
  gsap.to(
    ".video-wrap",
    {
      clipPath: "inset(0% 0%)",
      scrollTrigger: {
        trigger: ".s5-content-block",
        start: "top top+=60%", // Срабатывает раньше на мобильных
        end: "top+=20% top+=60%",
        scrub: 1, // Увеличьте значение scrub для плавности
        // markers: true,
      },
      ease: "power1.inOut" // Добавьте ease для плавности
    }
  );
});


}); 
