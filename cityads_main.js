
//Color switcher ________________________________________________________

  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
console.log(savedTheme);

  document.querySelectorAll("[data-color-switcher]").forEach(btn => btn.classList.remove("is-current"));

  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    body.setAttribute("data-theme", prefersDarkScheme ? "dark" : "light");
  }

  const colorSwitcherButtons = document.querySelectorAll("[data-color-switcher]");
  colorSwitcherButtons.forEach(function (button) {
    const themeType = button.getAttribute("data-color-switcher");
    
    // Устанавливаем класс is-current на нужной кнопке
    if (themeType === body.getAttribute("data-theme")) {
      button.classList.add("is-current");
    }
   

    button.addEventListener("click", function () {
      // Удаляем класс is-current у всех кнопок перед добавлением
      colorSwitcherButtons.forEach(btn => btn.classList.remove("is-current"));
      // alert(themeType);
      console.log(themeType);
      // Добавляем класс is-current к нажатой кнопке
      button.classList.add("is-current");

      if (themeType === "light") {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else if (themeType === "dark") {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else if (themeType === "system") {
        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const newTheme = prefersDarkScheme ? "dark" : "light"; 
        body.setAttribute("data-theme", newTheme);
        localStorage.removeItem("theme"); // Remove saved theme to revert to system preference
      }
    });
  });


  //Home slider______________________________________________________________________________________ 

  const swiper3d = new Swiper(".s2_main_section", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 24,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      // depth: 100,
      modifier: 0.5,
      // slideShadows: true,
    },
      //   observer: true,
      //   longSwipesRatio: 10,
      //   loopAdditionalSlides: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "bullet-active",
          bulletClass: "pagination-bullet",
          // dynamicBullets: true,
          // dynamicMainBullets: 1,
        },

      
      });

  /*
//3D Swiper________________________________________________________________________________________


const swiper3d = new Swiper(".s2_main_section", {
  slidesPerView: 5,
      centeredSlides: true,
      watchSlidesProgress: true,
      loop: true,
    //   observer: true,
    //   longSwipesRatio: 10,
    //   loopAdditionalSlides: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletActiveClass: "bullet-active",
        bulletClass: "pagination-bullet",
        // dynamicBullets: true,
        // dynamicMainBullets: 1,
      },
    //   virtual: {
    //     enabled: true,
    //     addSlidesAfter: 6
    //   },
    //   effect: 'coverflow',
    //   coverflowEffect: {
    //     rotate: 0,
    //     stretch: 50,
    //     depth: 100,
    //     modifier: 3,
    //     scale: 1,
    //     slideShadows: true,
    // },
      on: {
        // touchEnd(swiper) {
        //     swiper.update();
        // },
        click(swiper) {
          console.log(swiper.activeIndex);
          if (swiper.clickedIndex < swiper.activeIndex) {
            swiper.slidePrev();
          } else if (swiper.clickedIndex > swiper.activeIndex) {
            swiper.slideNext();
          }
        },

        // eslint-disable-next-line
        progress(swiper) {
        //   console.log("slideEl");
          const scaleStep = 0.15;
          const zIndexMax = swiper.slides.length;
          for (let i = 0; i < swiper.slides.length; i += 1) {
            const slideEl = swiper.slides[i];
            const slideProgress = swiper.slides[i].progress;
            const absProgress = Math.abs(slideProgress);
            let modify = 1;
            if (absProgress > 1) {
              modify = (absProgress - 1) * 0.3 + 1;
            }
  
            const translate = `${slideProgress * modify * 45}%`;
            const scale = 1 - absProgress * scaleStep;
            const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
            slideEl.style.transform = `translateX(${translate}) scale(${scale}) `;
            slideEl.style.zIndex = zIndex;
            if (absProgress > 3) {
              slideEl.style.opacity = 0;
            } else {
              slideEl.style.opacity = 1;
            }
  
            const opacityEls = slideEl.querySelector(".overlay");
            opacityEls.style.opacity = `${absProgress * 0.3}`;
          }
        },
        // eslint-disable-next-line
        setTransition(swiper, duration) {
          for (let i = 0; i < swiper.slides.length; i += 1) {
            const slideEl = swiper.slides[i];
            const opacityEls = slideEl.querySelectorAll(":scope > div");
            slideEl.style.transitionDuration = `${duration}ms`;
            opacityEls.forEach((opacityEl) => {
              opacityEl.style.transitionDuration = `${duration}ms`;
            });
          }
        },
      },
    });
*/

  if (window.innerWidth > 991) {
    gsap.to(".main_hero_section", {
      scrollTrigger: {
        trigger: ".hero-sticky_wrap",
        start: "25% top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
      filter: "blur(24px)",
      opacity: 0,
    });
    gsap.to(".main_hero_section > *", {
      scrollTrigger: {
        trigger: ".hero-sticky_wrap",
        start: "top top",
        end: "bottom top",
        scrub: true,

      },
      y: "-80vh",
    });
  }


//Navbar________________________________________________________________________

const dropdowns = document.querySelectorAll("[data-drop-box]");
const dropdownButtons = document.querySelectorAll("[data-drop-button]");

// Начальное состояние для всех dropdown
dropdowns.forEach(dropdown => {
  gsap.set(dropdown, { autoAlpha: 0, y: 20 });
});

// Функция для закрытия всех dropdown
const closeDropdowns = () => {
  dropdowns.forEach(dropdown => {
    gsap.to(dropdown, {
      autoAlpha: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        dropdown.style.display = "none";
      },
    });
  });
  document.removeEventListener("click", handleOutsideClick);
};

// Обработчик для клика вне dropdown
const handleOutsideClick = (event) => {
  const path = event.composedPath();
  const isClickInsideDropdownOrButton = Array.from(dropdownButtons).some(button => path.includes(button)) ||
                                        Array.from(dropdowns).some(dropdown => path.includes(dropdown));

  if (!isClickInsideDropdownOrButton) {
    closeDropdowns();
  }

};

// Обработчики события клика на кнопки
dropdownButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const dropdown = dropdowns[index];
    const isVisible = dropdown.style.display === "flex";

    if (isVisible) {
      closeDropdowns();
    } else {
      closeDropdowns();
      
      dropdown.style.display = "flex";
      gsap.to(dropdown, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        onComplete: () => {
          dropdown.style.display = "flex";
        }
      });
      
      // Добавляем слушатель для закрытия при клике вне
      document.addEventListener("click", handleOutsideClick);
    }
  });
});

// const dropdowns = document.querySelectorAll("[data-drop-box]");
// const dropdownButtons = document.querySelectorAll("[data-drop-button]");

// // Устанавливаем начальное состояние для всех dropdown
// dropdowns.forEach(dropdown => {
//   gsap.set(dropdown, { autoAlpha: 0, y: 20 }); // Начальное смещение на 20 пикселей вниз
// });

// // Функция для закрытия всех dropdown
// const closeDropdowns = () => {
//   dropdowns.forEach(dropdown => {
//     gsap.to(dropdown, {
//       autoAlpha: 0,
//       y: 20, // Сохраняем смещение при скрытии
//       duration: 0.3,
//       onComplete: () => {
//         dropdown.style.display = "none"; // Скрываем элемент после анимации
//       },
//     });
//   });
//   document.removeEventListener("click", handleClickOutside); // Удаляем обработчик при закрытии
// };

// // Обработчик клика вне элемента
// const handleClickOutside = (event) => {
//   dropdowns.forEach(dropdown => {
//     const button = dropdownButtons[Array.from(dropdowns).indexOf(dropdown)];
//     if (!dropdown.contains(event.target) && !button.contains(event.target)) {
//       closeDropdowns();
//     }
//   });
// };

// // Добавляем обработчик события клика на каждую кнопку
// dropdownButtons.forEach((button, index) => {
//   button.addEventListener("click", (event) => {
//     event.preventDefault(); // Предотвращаем скролл страницы
//     event.stopPropagation(); // Останавливаем всплытие события
//     event.stopImmediatePropagation(); // Останавливаем выполнение других обработчиков

//     const dropdown = dropdowns[index];
//     const isVisible = dropdown.style.display === "block";

//     if (isVisible) {
//       closeDropdowns();
//     } else {
//       // Закрываем все другие dropdown перед открытием нового
//       closeDropdowns();
      
//       // Если скрыто, показываем
//       dropdown.style.display = "block"; // Сначала показываем элемент
//       gsap.to(dropdown, {
//         autoAlpha: 1,
//         y: 0, // При открытии смещение к нулю
//         duration: 0.3,
//         onComplete: () => {
//           dropdown.style.display = "block"; // Убедимся, что элемент остается видимым после анимации
//         }
//       });
//       // Удаляем обработчик клика вне элемента после открытия
//       document.removeEventListener("click", handleClickOutside);
//       document.addEventListener("click", handleClickOutside); // Создаем обработчик при открытии
//     }
//   });
// });

//________________________________________________________________________________
//Ribbons______________________________________________________________________

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
if (document.querySelector("[data-cases]")) {
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
  document.querySelectorAll(".cases_list li")[0].classList.add("is-active");
  // Обрабатываем клик по .cases_tab_text
  document.querySelectorAll(".cases_list li").forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      // Убираем класс is-active у всех табов
      document.querySelectorAll(".cases_list li").forEach(function (tab) {
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
  // console.log(totalScrollWidth);
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
    .querySelectorAll("[data-list]")
    .forEach((parentList) => {
      parentList
        .querySelectorAll(".instruments_list_text-box")
        .forEach((box, index) => {
            gsap.set(box, { height: 0, opacity: 0, overflow: "hidden" });
          if (index === 0) {
            gsap.set(box, { height: "auto", opacity: 1 });
          } 
        });
    });

  document
    .querySelectorAll(
      "[data-list] [data-list-item]"
    )
    .forEach((item) => {
      item.addEventListener("click", () => {
        const parentList = item.closest(
          "[data-list]"
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

        //   const fullHeight = textBox.scrollHeight;
          gsap.fromTo(
            textBox,
            { height: 0, opacity: 0 },
            {
              height: 'auto',
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
  input.value = window.location.pathname
});

const utmParams = [
  'utm_referrer',
  'utm_content',
  'utm_term',
  'utm_campaign',
  'utm_medium',
  'utm_source'
];

utmParams.forEach(param => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = param;
  input.value = new URLSearchParams(window.location.search).get(param) || ''; // Get the value from the URL or set to empty
  document.querySelectorAll('form').forEach(form => {
    form.appendChild(input.cloneNode()); // Append a clone of the input to each form
  });
});



document.querySelectorAll('input[name="Page"]').forEach(function (input) {
  // Проверяем наличие div с классом webmaster_identifier или bloggers_identifier
  const isWebmaster = document.querySelector('.webmaster_identifier') || document.querySelector('.bloggers_identifier');

  if (isWebmaster) {
    input.value = "Вебмастер"; // Если есть div с классом webmaster_identifier или bloggers_identifier, устанавливаем "Вебмастер"
    console.log("Input value set to 'Вебмастер' for", input);
  } else {
    input.value = "Рекламодатель"; // В противном случае устанавливаем "Рекламодатель"
    console.log("Input value set to 'Рекламодатель' for", input);
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

//Quiz________________________________________________________________________________________
if (document.querySelector(".quiz_container")) {
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

}

const visibleLangBlocks = document.querySelectorAll('.navbar [data-lang]:not([style*="display: none"])');
visibleLangBlocks.forEach(block => {
  console.log(block.getAttribute('data-lang'));
});
function generateSchemaMarkup(
  context, 
  type, 
  name, 
  url, 
  logo, 
  mainHeroTitle, 
  telephone, 
  contactType, 
  availableLanguages, 
  streetAddress, 
  addressLocality, 
  postalCode, 
  addressCountry, 
  sameAs, 
  email
) {
  const schema = {
      "@context": context,
      "@type": type,
      "name": name,
      "url": url,
      "logo": logo,
      "description": mainHeroTitle,
      "contactPoint": {
          "@type": "ContactPoint",
          "contactType": contactType,
          "availableLanguage": availableLanguages
      },
      "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "postalCode": postalCode,
          "addressCountry": addressCountry
      },
      "sameAs": sameAs,
      "email": email
  };

  if (telephone) {
      schema.contactPoint.telephone = telephone;
  }

  return JSON.stringify(schema, null, 2);
}

// Get the text from the div with class .main_hero_title, phone number from [data-json-phone], and social media links
document.addEventListener("DOMContentLoaded", () => {
  const mainHeroTitle = document.querySelector(".main_hero_title")?.textContent.trim() || "";
  const telephone = document.querySelector("[data-json-phone]")?.textContent.trim() || "";
  const socialLinks = Array.from(document.querySelectorAll(".footer-section .square-link"))
      .filter(link => link.offsetParent !== null && link.href) // Проверяем, что href существует
      .map(link => link.href.trim());

  // Get available languages from the navbar
  const availableLanguages = Array.from(document.querySelectorAll('.navbar [data-lang]:not([style*="display: none"])'))
      .map(block => block.getAttribute('data-lang'));

  // Example usage
  const schemaMarkup = generateSchemaMarkup(
      "https://schema.org",
      "Organization",
      "Cityads",
      "https://cityads.com",
      "https://cityads.com/logo.svg",
      mainHeroTitle,
      telephone,
      "customer service",
      availableLanguages,
      "2-я Звенигородская улица, 13с42",
      "Москва",
      "123022",
      "RU",
      socialLinks,
      "russia@cityads.com"
  );

  console.log(schemaMarkup);
});


document.querySelector('[data-name="Subscribe"]').addEventListener('submit', function(event) {
  event.preventDefault();

  const emailInput = document.querySelector('[data-name="Subscribe"] input[type="email"]');
  const email = emailInput ? emailInput.value.trim() : '';

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || '';
  const utmMedium = urlParams.get('utm_medium') || '';
  const utmContent = urlParams.get('utm_content') || '';
  const utmCampaign = urlParams.get('utm_campaign') || '';
  const utmReferrer = urlParams.get('utm_referrer') || '';
  const utmSearch = urlParams.get('utm_term') || '';
  const subscriptionUrl = window.location.href;

  mindbox("async", {
    operation: "footersubscribe",
    data: {
      customer: {
        email: email,
        subscriptions: [
          {
            pointOfContact: "Email",
            topic: "news"
          }
        ]
      },
      customerAction: {
        customFields: {
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmContent: utmContent,
          utmCampaign: utmCampaign,
          utmReferrer: utmReferrer,
          utmSearch: utmSearch,
          subscriptionUrl: subscriptionUrl
        }
      }
    },
    onSuccess: function() { 
      console.log("Subscription successful");
    },
    onError: function(error) { 
      console.error("Subscription error:", error);
    }
  });
});


const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
  window.intlTelInput(input, {
    autoPlaceholder: "aggressive",
    strictMode: true,
    // separateDialCode: true,
    initialCountry: "us",
    loadUtilsOnInit: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
  });
});
