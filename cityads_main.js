Draggable.create(".wrp-ribbons-offers", {
    bounds: document.querySelector(".logos_wrap"),
    edgeResistance: 0.9,
    inertia: true,
    type: "x",
  });


// Найти все элементы с классом g_tabs_menu_wrap_____________________________

var tabsMenuWraps = document.querySelectorAll(".g_tabs_menu_wrap");

// Пройтись по каждому g_tabs_menu_wrap
tabsMenuWraps.forEach(function (tabsMenuWrap) {
  // Найти последний элемент с классом g_tab_link внутри текущего g_tabs_menu_wrap
  var lastTab = tabsMenuWrap.querySelector(".g_tab_link:last-child");

  // Если элемент существует, изменить ширину g_tabs_menu_wrap
  if (lastTab) {
    var lastTabWidth = lastTab.offsetWidth;
    tabsMenuWrap.style.width = lastTabWidth + "px";
  }
});

// Найти все элементы с классом .g_tabs_menu
var tabsMenuElements = document.querySelectorAll(".g_tabs_menu");

// Пройтись по каждому элементу и создать соответствующий draggableInstance
tabsMenuElements.forEach(function (tabsMenu) {
  // Найти ближайший родитель с классом .g_tabs_menu_wrap
  var tabsMenuWrap = tabsMenu.closest(".g_tabs_menu_wrap");

  // Если родитель найден, создаём Draggable для текущего элемента
  if (tabsMenuWrap) {
    Draggable.create(tabsMenu, {
      bounds: tabsMenuWrap, // Установить bounds как ближайший родитель .g_tabs_menu_wrap
      edgeResistance: 0.9,
      inertia: true,
      type: "x",
    });
  }
});

// const draggableInstance = Draggable.create("[data-scroll-tabs] .g_tabs_menu", {
//   bounds: document.querySelector("[data-scroll-tabs] .g_tabs_menu_wrap"),
//   edgeResistance: 0.9,
//   inertia: true,
//   type: "x",
// });

// Testimonials popups_________________________________________________________________

// Функция для копирования контента карточки в попап
function copyCardContentToPopup(card) {
  var cardContent = card.find(".brand_card_content").clone();
  var cardNameBox = card.find(".brand_card_name-box").clone();

  // Удаляем ненужные элементы
  cardContent.find(".testimonial_text, .link_full_tesimonial").remove();

  // Очищаем и вставляем новый контент в попап
  $(".testimonial_popup .testimonial_box")
    .empty()
    .append(cardContent)
    .append(cardNameBox);
}

// Функция для управления классом is-active
function setActivePopupLink(link) {
  // Убираем is-active у всех .popup_link
  $(".popup_link").removeClass("is-active");

  // Добавляем is-active к текущему элементу
  link.addClass("is-active");
}

// Клик по .link_full_tesimonial для показа контента в попапе
$(document).on("click", ".link_full_tesimonial", function () {
  var brandCardWrap = $(this).closest(".brand_card_wrap");

  // Копируем контент в попап
  copyCardContentToPopup(brandCardWrap);

  // Находим текст внутри .p-20 в текущей карточке
  var p20Text = brandCardWrap.find(".brand_card_row .p-20").text().trim();

  // Ищем соответствующий .popup_link в попапе, у которого текст совпадает с p-20
  var correspondingPopupLink = $(".testimonial_popup_wrap .popup_link").filter(
    function () {
      return $(this).text().trim() === p20Text;
    }
  );

  // Добавляем is-active к найденному .popup_link
  if (correspondingPopupLink.length > 0) {
    setActivePopupLink(correspondingPopupLink);
  }
});

// Клик по .popup_link для поиска и показа соответствующей карточки в попапе
$(document).on("click", ".popup_link", function () {
  var searchText = $(this).text().trim();

  // Поиск карточки с совпадающим текстом внутри .p-20
  var matchedCard = $(".brand_card_wrap").filter(function () {
    return $(this).find(".brand_card_row .p-20").text().trim() === searchText;
  });

  if (matchedCard.length > 0) {
    copyCardContentToPopup(matchedCard);
    setActivePopupLink($(this)); // Устанавливаем класс is-active для текущего popup_link
  }
});

//_________________________________________________________________

document.querySelectorAll("[data-scroll-tabs]").forEach((container) => {
  const g_tab_links = container.querySelectorAll(".g_tab_link");
  const g_tab_contents = container.querySelectorAll(".g_tab_content");
  const tabsMenus = container.querySelectorAll(".g_tabs_menu");

  let initialScrollY = 0;

  const calculateTotalWidth = (content) => {
    let totalWidth = 0;
    const toolsCards = content.querySelectorAll(".tools_card");

    toolsCards.forEach((card) => {
      totalWidth += card.offsetWidth;
    });

    if (toolsCards.length > 0) {
      totalWidth -= toolsCards[0].offsetWidth;
    }

    return totalWidth;
  };

  const getMenuGap = (menu) => {
    const styles = getComputedStyle(menu);
    const gap = parseFloat(styles.gap) || 0;
    return gap;
  };

  const calculateMenuShift = (activeIndex, menu) => {
    let shiftWidth = 0;
    const gap = getMenuGap(menu);

    for (let i = 0; i < activeIndex; i++) {
      shiftWidth += g_tab_links[i].offsetWidth + gap;
    }

    return shiftWidth;
  };

  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: 0.5,
    onEnter: () => {
      initialScrollY = window.scrollY;
    },
    onUpdate: (self) => {
      const currentContent = container.querySelector(
        ".g_tab_content.is-active"
      );
      if (currentContent) {
        const totalWidth = calculateTotalWidth(currentContent);
        const scrollProgress = self.progress;

        gsap.to(currentContent, {
          x: -totalWidth * scrollProgress,
          ease: "none",
          duration: 0,
        });
      }
    },
  });

  g_tab_links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (link.classList.contains("is-active")) return;

      const currentScrollY = window.scrollY;

      const currentContent = container.querySelector(
        ".g_tab_content.is-active"
      );
      const newContent = g_tab_contents[index];

      g_tab_links.forEach((l) => l.classList.remove("is-active"));
      g_tab_contents.forEach((content) =>
        content.classList.remove("is-active")
      );

      link.classList.add("is-active");
      newContent.classList.add("is-active");

      if (currentContent) {
        gsap.to(currentContent, {
          y: 30,
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(currentContent, { x: 0 });
            showNewTab(newContent);
          },
        });
      } else {
        showNewTab(newContent);
      }

      window.scrollTo({
        top: initialScrollY,
        behavior: "auto",
      });

      tabsMenus.forEach((menu) => {
        const menuShift = calculateMenuShift(index, menu);
        gsap.to(menu, {
          x: -menuShift,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      });
    });
  });

  function showNewTab(content) {
    content.classList.add("is-active");

    gsap.fromTo(
      content,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3 }
    );
  }
});

document.querySelectorAll("[data-colored-tabs]").forEach((container) => {
  const g_tab_links = container.querySelectorAll(".g_tab_link");
  const g_tab_contents = container.querySelectorAll(".g_tab_content");
  const tabsMenus = container.querySelectorAll(".g_tabs_menu");

  let isAnimating = false; // Флаг для отслеживания анимации

  const getMenuGap = (menu) => {
    const styles = getComputedStyle(menu);
    const gap = parseFloat(styles.gap) || 0;
    return gap;
  };

  const calculateMenuShift = (activeIndex, menu) => {
    let shiftWidth = 0;
    const gap = getMenuGap(menu);

    for (let i = 0; i < activeIndex; i++) {
      shiftWidth += g_tab_links[i].offsetWidth + gap;
    }

    return shiftWidth;
  };

  g_tab_links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (isAnimating || link.classList.contains("is-active")) return;

      const currentContent = container.querySelector(
        ".g_tab_content.is-active"
      );
      const newContent = g_tab_contents[index];

      g_tab_links.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");

      if (currentContent) {
        isAnimating = true; // Устанавливаем флаг анимации
        gsap.to(currentContent, {
          y: 30,
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            currentContent.classList.remove("is-active");
            showNewTab(newContent);
          },
        });
      } else {
        showNewTab(newContent);
      }

      tabsMenus.forEach((menu) => {
        const menuShift = calculateMenuShift(index, menu);
        gsap.to(menu, {
          x: -menuShift,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      });
    });
  });

  function showNewTab(content) {
    gsap.fromTo(
      content,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        onComplete: () => {
          content.classList.add("is-active");
          isAnimating = false; // Снимаем блокировку после завершения анимации
          updateCasesContentHeight(content);
        },
      }
    );
  }
});

function updateCasesContentHeight(content) {
  const casesContentBox = document.querySelector(".g_tabs_content_wrap");
  if (casesContentBox) {
    casesContentBox.style.height = `${content.offsetHeight}px`;
    console.log(content.offsetHeight);
  }
}

//__________________________________________________

//Tabs with colored links_____________________
let mm = gsap.matchMedia();

//Cases tabs______________________________________________________________________
if (window.matchMedia("(min-width: 992px)").matches) {
  const casesContents = document.querySelectorAll(".cases_content");
  const casesTabTexts = document.querySelectorAll(".cases_list li");
  const casesTitle = document.querySelector(".cases_title");

  if (casesContents.length > 0) {
    // Устанавливаем видимость первого слайда по умолчанию
    gsap.set(casesContents[0], { autoAlpha: 1 });
    casesTabTexts[0].classList.add("is-active");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-cases]",
        start: "top top",
        end: "+=300%",
        snap: {
          snapTo: 1 / (casesContents.length - 1), // Snap к ближайшему слайду
          duration: 0.5,
        },
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    casesContents.forEach((content, index) => {
      const currentTab = casesTabTexts[index];

      if (index === 0) {
        // Первый слайд уже видим, анимация появления не требуется
        tl.to(content, {
          keyframes: [
            { autoAlpha: 1, y: "0%", duration: 2 }, // Видим первый слайд некоторое время
            {
              autoAlpha: 0,
              y: "10%",
              duration: 1,
              onComplete: () => updateTab(index + 1),
              onReverseComplete: () => updateTab(index),
            }, // Исчезновение первого слайда
          ],
        });
      } else if (index === casesContents.length - 1) {
        // Для последнего слайда — анимация только появления
        tl.fromTo(
          content,
          { autoAlpha: 0, y: "10%" },
          {
            autoAlpha: 1,
            y: "0%",
            duration: 1,
            onStart: () => updateTab(index),
            onReverseComplete: () => updateTab(index - 1),
          }
        );
      } else {
        // Для всех промежуточных слайдов — полная анимация с появлением и исчезновением
        tl.fromTo(
          content,
          { autoAlpha: 0, y: "10%" },
          {
            keyframes: [
              {
                autoAlpha: 1,
                y: "0%",
                duration: 1,
                onReverseComplete: () => updateTab(index - 1),
                // onStart: () => updateTab(index),
              }, // Появление
              {
                autoAlpha: 1,
                y: "0%",
                duration: 2,
              }, // Задержка
              {
                autoAlpha: 0,
                y: "10%",
                duration: 1,
                onComplete: () => updateTab(index + 1),
              }, // Исчезновение
            ],
          }
        );
      }
    });

    function updateTab(activeIndex) {
      casesTabTexts.forEach((tab, i) => {
        if (i === activeIndex) {
          tab.classList.add("is-active");
          casesTitle.textContent = tab.textContent.replace("/ ", "");
        } else {
          tab.classList.remove("is-active");
        }
      });
    }
  }
} else {
  // Обрабатываем клик по .cases_tab_text
  document.querySelectorAll(".cases_tab_text").forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      // Убираем класс is-active у всех табов
      document.querySelectorAll(".cases_tab_text").forEach(function (tab) {
        tab.classList.remove("is-active");
      });

      // Добавляем класс is-active текущему табу
      tab.classList.add("is-active");

      // Скрыть все .cases_content
      gsap.to(".cases_content", { autoAlpha: 0, duration: 0.5 });

      // Показать соответствующий .cases_content по порядковому номеру
      var targetContent = document.querySelectorAll(".cases_content")[index];
      if (targetContent) {
        gsap.to(targetContent, { autoAlpha: 1, duration: 0.5 });
      }
    });
  });
}

//________________________________________________________________________________

//Rewards tabs___________________________________

const rewardsRows = document.querySelectorAll(".rewards_row");
const rewardsTabContents = document.querySelectorAll(".rewards_tab_content");

// Изначально скрываем все rewards_tab_content, кроме первого
rewardsTabContents.forEach((tabContent, index) => {
  if (index !== 0) {
    gsap.set(tabContent, {
      height: 0,
      autoAlpha: 0,
    });
  }
});

const animateRewardsTabs = (clickedRow, index) => {
  const rewardsTl = gsap.timeline();

  // Добавляем/убираем класс is-active
  rewardsRows.forEach((row, rowIndex) => {
    if (rowIndex === index) {
      row.classList.add("is-active");
    } else {
      row.classList.remove("is-active");
    }
  });

  // Анимация для rewards_tab_content
  rewardsTabContents.forEach((tabContent, contentIndex) => {
    if (contentIndex === index) {
      rewardsTl.to(
        tabContent,
        {
          height: "auto",
          autoAlpha: 1,
          duration: 0.5,
          onComplete: () => ScrollTrigger.refresh(),
        },
        0
      );
    } else {
      rewardsTl.to(
        tabContent,
        {
          height: 0,
          autoAlpha: 0,
          duration: 0.5,
        },
        0
      );
    }
  });
};

rewardsRows.forEach((row, index) => {
  row.addEventListener("mouseenter", () => {
    animateRewardsTabs(row, index);
  });
});

//________________________________________________

// const toggleSwitch = document.querySelector("[data-theme]");
// // const toggleSwitch = document.querySelector(
// //   '.theme-switch input[type="checkbox"]'
// // );
// const currentTheme = localStorage.getItem("theme");

// if (currentTheme) {
//   document.documentElement.setAttribute("data-theme", currentTheme);

//   if (currentTheme === "dark") {
//     toggleSwitch.checked = true;
//   }
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute("data-theme", "dark");
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.documentElement.setAttribute("data-theme", "light");
//     localStorage.setItem("theme", "light");
//   }
// }

// toggleSwitch.addEventListener("change", switchTheme, false);

// Устанавливаем элементы .content невидимыми
// gsap.set(".img-profit", { autoAlpha: 0 });

// const headlines = gsap.utils.toArray(".sec-profit .h4");
// const headlineHeight = document
//   .querySelector("h2.h2-54.col.pb-80")
//   .getBoundingClientRect().height;
// // console.log(headlineHeight);

// gsap.set(headlines, { opacity: 0.4 });
// gsap.to(headlines[0], { opacity: 1 });
// const totalDuration = 1000;
// // const singleDuration = totalDuration / headlines.length;
// const singleDuration = totalDuration / headlines.length - headlineHeight;

// // Получаем значение gap и конвертируем его в число
// const flexContainer = document.querySelector(".sec-profit .list-wrapper");
// const computedStyle = getComputedStyle(flexContainer);
// const gapValue = parseFloat(computedStyle.gap); // Преобразуем gap из строки в число
// console.log(gapValue);

// // .to(contentClass, { autoAlpha: 1, duration: 0.5 }, 0);

// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".sec-profit",
//     start: "top top",
//     end: "+=" + totalDuration,
//     pin: true,
//     scrub: true,
//     onUpdate: (self) => {
//       // Получаем прогресс скролла (от 0 до 1)
//       const progress = self.progress;

//       // Рассчитываем размер каждого участка на основе количества пунктов меню
//       const sectionSize = 1 / headlines.length;

//       // Определяем, какой пункт меню активен в зависимости от прогресса
//       headlines.forEach((item, index) => {
//         if (
//           progress >= sectionSize * index &&
//           progress < sectionSize * (index + 1)
//         ) {
//           // runSection(index + 1); // Активируем соответствующий пункт меню
//           gsap.to(headlines, { opacity: 0.4, duration: 0.2 });
//           gsap.to(headlines[index], { opacity: 1, duration: 0.2 });
//         }
//       });
//     },
//   },
// });

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkScheme) {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
  }

  document.querySelectorAll("[data-color-switcher]").forEach(function (button) {
    button.addEventListener("click", function () {
      const currentTheme = body.getAttribute("data-theme");
      if (currentTheme === "light") {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  });
});

//Horizontal scroll________________________________________________

const swiper = new Swiper(".swiper-version .tools_wrp", {
  slidesPerView: "auto",
  grabCursor: true,
});

const container = document.querySelector("[data-simple-horizontal]");
if (container) {
  const cards = container.querySelectorAll(".tools_card");

  // Рассчитываем общую ширину движения
  const totalScrollWidth = (cards.length - 1) * cards[0].offsetWidth;
  console.log(totalScrollWidth);
  gsap.to("[data-simple-horizontal] .swiper-wrapper", {
    x: -totalScrollWidth, // Двигаем карточки влево
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true, // Фиксируем контейнер на месте
      scrub: 0.5, // Плавное скроллирование
      end: "+=100%", // Скролл продолжается до конца карточек
    },
  });
}

//_________________________________________________________________
const swiperBrands = new Swiper(".brands_swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  grabCursor: true,
});

const boxLeftSlider = document.querySelector(".box_left_slider");
if (boxLeftSlider) {
  const paddingRight = window
    .getComputedStyle(boxLeftSlider)
    .getPropertyValue("padding-right");

  const swiperLeft = new Swiper(".box_left_slider", {
    slidesPerView: 1,
    // grabCursor: true,
    watchOverflow: false,
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: { crossFade: true },
    spaceBetween: parseInt(paddingRight),
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      bulletActiveClass: "bullet-active",
      bulletClass: "pagination-bullet",
    },
  });

  const swiperRight = new Swiper(".box_right_slider", {
    slidesPerView: 1,
    // effect: "fade",
  });

  swiperLeft.on("slideChange", function () {
    swiperRight.slideTo(swiperLeft.activeIndex);
  });

  swiperRight.on("slideChange", function () {
    swiperLeft.slideTo(swiperRight.activeIndex);
  });

  // const swiper2 = new Swiper(".logos_wrap", {
  //   slidesPerView: "auto",
  //   freeScroll: true,
  // });

  document.querySelectorAll(".income_list-item").forEach((item) => {
    item.addEventListener("mouseover", () => {
      const imgElement = item.querySelector(".income_list-item_img");
      const imgSrc = imgElement.getAttribute("src");
      const imgSrcset = imgElement.getAttribute("srcset");

      const targetImg = document.querySelector(".img_profit");

      // Используем GSAP для плавного появления
      gsap.to(targetImg, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          // Обновляем src и srcset после исчезновения
          targetImg.setAttribute("src", imgSrc);
          targetImg.setAttribute("srcset", imgSrcset);

          // Плавно показываем изображение
          gsap.to(targetImg, { opacity: 1, duration: 0.2 });
        },
      });
    });
  });
}

if (window.matchMedia("(min-width: 768px)").matches) {
  document.querySelectorAll("[data-list] [data-list-item]").forEach((item) => {
    console.log("enter");
    item.addEventListener("mouseover", () => {
      // Удаляем класс is-current только у элементов внутри текущего списка
      const parentList = item.closest("[data-list]");
      parentList.querySelectorAll("[data-list-item]").forEach((el) => el.classList.remove("is-current"));

      // Добавляем класс is-current к текущему элементу
      item.classList.add("is-current");
    });
  });
} else {
  document
    .querySelectorAll("[data-monetize-list], [data-integration-list]")
    .forEach((parentList) => {
      parentList
        .querySelectorAll(".instruments_list_text-box")
        .forEach((box, index) => {
          if (index === 0) {
            gsap.set(box, { height: "auto", opacity: 1 });
          } else {
            gsap.set(box, { height: 0, opacity: 0, overflow: "hidden" });
          }
        });
    });

  document
    .querySelectorAll(
      "[data-monetize-list] [data-list-item], [data-integration-list] [data-list-item]"
    )
    .forEach((item) => {
      item.addEventListener("click", () => {
        const parentList = item.closest(
          "[data-monetize-list], [data-integration-list]"
        );
        const textBox = item.querySelector(".instruments_list_text-box");
        const isOpen = parseInt(window.getComputedStyle(textBox).height) > 0;

        if (isOpen) {
          gsap.to(textBox, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
          item.classList.remove("is-current");
        } else {
          parentList
            .querySelectorAll("[data-list-item]")
            .forEach((el) => el.classList.remove("is-current"));
          item.classList.add("is-current");

          parentList
            .querySelectorAll(".instruments_list_text-box")
            .forEach((box) => {
              if (box !== textBox) {
                gsap.to(box, {
                  height: 0,
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            });

          const fullHeight = textBox.scrollHeight;
          gsap.fromTo(
            textBox,
            { height: 0, opacity: 0 },
            {
              height: fullHeight,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        }
      });
    });
}

// // Устанавливаем элементы .content невидимыми
// // gsap.set(".img-profit", { autoAlpha: 0 });

// const headlines = gsap.utils.toArray(".sec-profit .h4");
// const headlineHeight = document
//   .querySelector("h2.h2-54.col.pb-80")
//   .getBoundingClientRect().height;
// // console.log(headlineHeight);

// gsap.set(headlines, { opacity: 0.4 });
// gsap.to(headlines[0], { opacity: 1 });
// const totalDuration = 1000;
// // const singleDuration = totalDuration / headlines.length;
// const singleDuration = totalDuration / headlines.length - headlineHeight;

// // Получаем значение gap и конвертируем его в число
// const flexContainer = document.querySelector(".sec-profit .list-wrapper");
// const computedStyle = getComputedStyle(flexContainer);
// const gapValue = parseFloat(computedStyle.gap); // Преобразуем gap из строки в число
// console.log(gapValue);

// // Анимация для заголовков
// headlines.forEach((elem, i) => {
//   //   const contentClass = `.content-${i}`;
//   const heightFix = elem.getBoundingClientRect().height + gapValue;
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: elem,
//         onUpdate: (self) => {
//           // Получаем прогресс скролла (от 0 до 1)
//           const progress = self.progress;
//           console.log(progress);
//         },
//         start: () => `-${headlineHeight + 20} -=${singleDuration * i}`,
//         end: `+=${singleDuration + heightFix}`,
//         toggleActions: "play reverse play reverse",
//         onLeave: () => {
//           if (i === headlines.length - 1) {
//             gsap.to(elem, { opacity: 1, duration: 1, rewrite: true });
//           }
//         },
//         onEnterBack: () => {
//           if (i === 0) {
//             console.log("first");
//             gsap.to(elem, { opacity: 1, duration: 1, rewrite: true });
//           }
//         },
//         // markers: true,
//       },
//     })

//     .fromTo(
//       elem,
//       { opacity: 0.4, duration: 0.1 },
//       { opacity: 1, duration: 0.1, rewrite: true }
//     );

//   // .to(contentClass, { autoAlpha: 1, duration: 0.5 }, 0);
// });

// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".sec-profit",
//     start: "top top",
//     end: "+=" + totalDuration,
//     pin: true,
//     scrub: true,
//   },
// });

// Получаем все кнопки с атрибутом data-remodal-target
const buttons = document.querySelectorAll("[data-remodal-target]");

// Добавляем обработчик события на клик для каждой кнопки
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Получаем значение атрибута data-remodal-target
    const targetId = button.getAttribute("data-remodal-target");

    // Находим блок по атрибуту data-remodal-id, который соответствует значению data-remodal-target
    const modalBlock = document.querySelector(
      `[data-remodal-id="${targetId}"]`
    );

    // Если кнопка имеет атрибут data-form-name, подставляем его значение в атрибут data-name формы
    if (button.hasAttribute("data-form-name")) {
      const formName = button.getAttribute("data-form-name");
      const form = modalBlock.querySelector("form");

      if (form) {
        form.setAttribute("data-name", formName);
      }
    }
  });
});

document.querySelectorAll('input[name="Region"]').forEach(function (input) {
  input.value = "РФ";
});

document.querySelectorAll('input[name="Language"]').forEach(function (input) {
  input.value = "RU";
});

document.querySelectorAll('input[name="Page"]').forEach(function (input) {
  // Получаем текущий URL
  var currentUrl = window.location.pathname;
  console.log(currentUrl);
  // Разделяем URL на части по символу "/"
  var slug = currentUrl.split("/").filter(Boolean).pop(); // Последняя часть URL после "/"

  if (!slug) {
    input.value = "Вебмастер"; // Если слага нет, устанавливаем "Вебмастер"
  } else {
    input.value = "Рекламодатель"; // Если есть slug, устанавливаем "Рекламодатель"
  }
});

// $(document).on("opening", "[data-remodal-id]", function (e) {
//   var targetElement = $(this).closest(".remodal-wrapper")[0]; // Получаем текущий открываемый модал
//   console.log(targetElement);
//   // Блокируем скролл для body
//   bodyScrollLock.disableBodyScroll(targetElement, {
//     reserveScrollBarGap: true,
//   });
// });

// $(document).on("closing", "[data-remodal-id]", function (e) {
//   bodyScrollLock.clearAllBodyScrollLocks();
// });

// $(document).on("opening", "[data-remodal-id]", function (e) {
//   document.body.style.position = "fixed";
// });

const quizContainer = document.querySelector(".quiz_container");
const answersContainer = document.querySelector(".answers");
const quizProgress = document.querySelector(".quiz-progress");
const slideOffset = 30;
let currentSlideIndex = 0;
let isAnimating = false;

const slides = Array.from(document.querySelectorAll(".quiz-slide"));

const updateNextButtonState = () => {
  const selectedValues = getSelectedValues(slides[currentSlideIndex]);
  const nextButton = document.querySelector(".quiz-next");
  selectedValues.length > 0
    ? nextButton.classList.remove("inactive")
    : nextButton.classList.add("inactive");
};

const addInputListeners = (slide) => {
  const inputs = slide.querySelectorAll(
    'input[type="radio"], input[type="checkbox"], input[type="text"], input[type="number"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("change", updateNextButtonState);
    if (input.type === "text" || input.type === "number") {
      input.addEventListener("input", updateNextButtonState);
    }
  });
};

slides.forEach(addInputListeners);

const initSlides = () => {
  slides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : slideOffset,
    });
    if (index === 0) updateNextButtonState();
  });
  updateQuizProgress();
  setContainerHeight();
};

const setContainerHeight = () => {
  quizContainer.style.height = `${slides[currentSlideIndex].offsetHeight}px`;
};

const updateQuizProgress = () => {
  quizProgress.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("quiz_progress_dot");
    if (index === currentSlideIndex) dot.classList.add("is-active");
    if (hasSelectedValues(index)) dot.classList.add("is-green");
    dot.addEventListener("click", () => handleProgressClick(index));
    quizProgress.appendChild(dot);
  });
};

const handleProgressClick = (targetIndex) => {
  if (areAllPreviousAnswersSelected(targetIndex)) switchToSlide(targetIndex);
};

const areAllPreviousAnswersSelected = (targetIndex) =>
  slides.slice(0, targetIndex).every((_, i) => hasSelectedValues(i));

const hasSelectedValues = (slideIndex) =>
  getSelectedValues(slides[slideIndex]).length > 0;

const getSelectedValues = (slide) => {
  const selectedValues = [];
  slide
    .querySelectorAll(
      'input[type="radio"]:checked, input[type="checkbox"]:checked'
    )
    .forEach((input) => {
      const label = input.closest("label");
      selectedValues.push(
        label ? label.textContent || input.value : input.value
      );
    });
  slide
    .querySelectorAll('input[type="text"], input[type="number"]')
    .forEach((input) => {
      if (input.value.trim()) selectedValues.push(input.value);
    });
  return selectedValues;
};

const cloneAndFillAnswerBox = (
  template,
  questionText,
  inputValues,
  slideIndex
) => {
  const answerBox = template.cloneNode(true);
  answerBox.style.display = "flex";
  answerBox.querySelector(".answer_box_text1").textContent = questionText;
  answerBox
    .querySelectorAll(".answer_box_text2")
    .forEach((text2) => text2.remove());
  inputValues.forEach((value) => {
    const answerBoxText2 = document.createElement("div");
    answerBoxText2.classList.add("answer_box_text2");
    answerBoxText2.textContent = value;
    answerBox.appendChild(answerBoxText2);
  });
  answerBox
    .querySelector(".edit_icon")
    ?.addEventListener("click", () => switchToSlide(slideIndex));
  return answerBox;
};

const checkboxText = document.querySelector(
  ".quiz_question_top_text :first-child"
).textContent;
const radioText = document.querySelector(
  ".quiz_question_top_text :nth-child(2)"
).textContent;
const inputText = document.querySelector(
  ".quiz_question_top_text :nth-child(3)"
).textContent;

const switchToSlide = (index) => {
  if (index < 0 || index >= slides.length || isAnimating) return;

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[index];
  const emptyAnswerText = document.querySelector(".quiz_answer_text_empty");
  const buttonsRow = document.querySelector(".quiz_buttons_row");
  const topText = document.querySelector(".quiz_question_top_text");

  console.log(`Current Slide Index: ${index}, Total Slides: ${slides.length}`);
  console.log(buttonsRow);
  if (emptyAnswerText) emptyAnswerText.style.display = "none";
  if (buttonsRow)
    buttonsRow.style.display = index === slides.length - 1 ? "none" : "";

  if (topText) {
    topText.style.display = index === slides.length - 1 ? "none" : "";
    const checkboxes = nextSlide.querySelectorAll('input[type="checkbox"]');
    const radioButtons = nextSlide.querySelectorAll('input[type="radio"]');
    const textInputs = nextSlide.querySelectorAll('input[type="text"]');
    const numberInputs = nextSlide.querySelectorAll('input[type="number"]');
    if (checkboxes.length > 0) {
      topText.textContent = radioText;
    } else if (radioButtons.length > 0) {
      topText.textContent = checkboxText;
    } else if (textInputs.length > 0 || numberInputs.length > 0) {
      topText.textContent = inputText;
    } else {
      topText.textContent = "";
    }
  }

  isAnimating = true;

  gsap
    .timeline({
      onComplete: () => {
        isAnimating = false;
        updateNextButtonState();
      },
    })
    .to(currentSlide, { duration: 0.3, y: slideOffset, autoAlpha: 0 })
    .to(nextSlide, { duration: 0.3, y: 0, autoAlpha: 1 });

  currentSlideIndex = index;
  setContainerHeight();
  updateQuizProgress();
  updateTextareaWithAnswers();
};

const switchSlide = (direction) => {
  const selectedValues = getSelectedValues(slides[currentSlideIndex]);
  if (direction === "next" && selectedValues.length === 0) return;

  let nextSlideIndex = currentSlideIndex + (direction === "next" ? 1 : -1);
  if (nextSlideIndex < 0 || nextSlideIndex >= slides.length) return;

  const questionText =
    slides[currentSlideIndex].querySelector(".quiz_question_text")
      ?.textContent || "";
  const existingAnswerBox = Array.from(
    answersContainer.querySelectorAll(".answer_box")
  ).find(
    (box) => box.querySelector(".answer_box_text1").textContent === questionText
  );

  if (existingAnswerBox) {
    existingAnswerBox
      .querySelectorAll(".answer_box_text2")
      .forEach((text2) => text2.remove());
    selectedValues.forEach((value) => {
      const answerBoxText2 = document.createElement("div");
      answerBoxText2.classList.add("answer_box_text2");
      answerBoxText2.textContent = value;
      existingAnswerBox.appendChild(answerBoxText2);
    });
  } else if (selectedValues.length > 0) {
    const answerBoxTemplate = document.querySelector(".answer_box");
    const newAnswerBox = cloneAndFillAnswerBox(
      answerBoxTemplate,
      questionText,
      selectedValues,
      currentSlideIndex
    );
    answersContainer.appendChild(newAnswerBox);
  }

  switchToSlide(nextSlideIndex);
};

const updateTextareaWithAnswers = () => {
  const textarea = document.querySelector(".quiz_answers");
  textarea.value = "";

  slides.forEach((slide, index) => {
    const questionText =
      slide.querySelector(".quiz_question_text")?.textContent || "";
    const selectedValues = getSelectedValues(slide);

    if (selectedValues.length > 0) {
      textarea.value += `Вопрос: ${questionText}\nОтветы: ${selectedValues.join(
        ", "
      )}\n\n`;
    }
  });
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const nextButton = document.querySelector(".quiz-next");
    if (!nextButton.classList.contains("inactive")) {
      switchSlide("next");
    }
  }
});

initSlides();
document
  .querySelector(".quiz-next")
  .addEventListener("click", () => switchSlide("next"));
document
  .querySelector(".quiz-prev")
  .addEventListener("click", () => switchSlide("prev"));

gsap.set(".quiz_title_row, .quiz_body", { display: "none" });
document
  .querySelector(".quiz_start_box .button")
  .addEventListener("click", function () {
    const quizStartBox = document.querySelector(".quiz_start_box");
    gsap.to(quizStartBox, {
      duration: 0.5,
      opacity: 0,
      onComplete: function () {
        quizStartBox.style.display = "none";
        gsap.fromTo(
          ".quiz-wrap > *:not(:first-child)",
          { y: 100, opacity: 0, display: "none" },
          { y: 0, opacity: 1, display: "flex", duration: 0.5, stagger: 0.2 }
        );
      },
    });
  });
