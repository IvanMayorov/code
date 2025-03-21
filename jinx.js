gsap.registerPlugin(ScrollTrigger);



let mm = gsap.matchMedia();


function getTotalFlexHeight(container) {
  let elements = Array.from(container.children);
  if (elements.length === 0) return 0;

  let totalHeight = elements.reduce((sum, el) => sum + el.offsetHeight, 0);

  let style = window.getComputedStyle(container);
  let gap = parseFloat(style.rowGap || 0); // Берём `gap` (rowGap для колонок)

  let totalGaps = gap * (elements.length - 1); // Количество промежутков

  return totalHeight + totalGaps;
}

// #region Desktop ___________________________________________________________________________________________________________
function initDesktopAnimations() {

  // alert('desktop');

  let tl;
  console.log('initAnimations');

    // Очистить предыдущие анимации если они существуют
    if (tl) {
      tl.kill();
    }
    // Сбросить все ScrollTrigger
    ScrollTrigger.refresh();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Пересоздаем медиа-запросы
    mm.revert(); // Отменить предыдущие медиа-запросы


  const deadTitleHeight = document.querySelector('.benefits_title_box')?.offsetHeight/2 || 0;
const firstBenefitColHeight = document.querySelector('.benefits_col:first-child')?.offsetHeight/2 || 0;
const lastBenefitColHeight = document.querySelector('.benefits_col:last-child')?.offsetHeight/2 || 0;
const bSquare = document.querySelector('.benefits_square_wrap')?.offsetHeight/2 || 0;

gsap.set('.benefits_col:first-child', { y: `${firstBenefitColHeight - deadTitleHeight}px` });
gsap.set('.benefits_col:last-child', { y: `-${lastBenefitColHeight - deadTitleHeight}px` });




const firstSection = document.querySelector('.main_section');
const benefitsSection = document.querySelector('.benefits_section');
const manifestSection = document.querySelector('.mnfst_section');
const servicesSection = document.querySelector('.services_section');
const processSection = document.querySelector('.process_section');
const processTrack = document.querySelector('.process_track');
const projectsSection = document.querySelector('.projects_section');
const boardSection = document.querySelector('.board_section');
const footerHeight = document.querySelector('.footer').offsetHeight ;
const servicesSectionHeight = document.querySelector('.services_section .bigtitle_row')?.offsetHeight || 0;
const projectsSectionHeight = document.querySelector('.projects_section .bigtitle_row')?.offsetHeight || 0;
let answersLeftBoxHeight = 0;
const answersBoxHeight = document.querySelector('.answers_box')?.offsetHeight || 0;

let container = document.querySelector(".answers_box_left");
answersLeftBoxHeight = getTotalFlexHeight(container);

const answerGap = (container.offsetHeight - answersBoxHeight)/2;


const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);



const navLogo = document.querySelector('.nav_logo');

gsap.set('.bigtitle_wrap', { opacity: 0 });
gsap.set('.section_title_box *', { yPercent: -150 });

gsap.set('.process_right_box', { opacity: 0 });

const bigtitleRowsServices = document.querySelectorAll('.services_section .bigtitle_row');
const bigtitleRowsProjects = document.querySelectorAll('.projects_section .bigtitle_row');

const bigtitleWrapsServices = Array.from(bigtitleRowsServices).map(row => row.querySelector('.bigtitle_wrap'));
const bigtitleWrapsProjects = Array.from(bigtitleRowsProjects).map(row => row.querySelector('.bigtitle_wrap'));

const activeRowsServices = new Array(bigtitleRowsServices.length).fill(false);
const activeRowsProjects = new Array(bigtitleRowsProjects.length).fill(false);

const animateLabelIn = selector => {
  const label = document.querySelector(`.label:nth-of-type(${selector})`);
  const navLink = document.querySelector(`.nav_links_box a:nth-of-type(${selector})`);
  
  if (label) {
    gsap.to(label, { yPercent: 0, duration: 0.3 });
  }
  
  if (navLink) {
    navLink.classList.add('is-active');
  }
};

const animateLabelOut = selector => {
  const label = document.querySelector(`.label:nth-of-type(${selector})`);
  const navLink = document.querySelector(`.nav_links_box a:nth-of-type(${selector})`);
  
  if (label) {
    gsap.to(label, { yPercent: -150, duration: 0.3 });
  }
  
  if (navLink) {
    navLink.classList.remove('is-active');
  }
};

function updateTitle(selector, progress, direction, threshold = 0.5) {
  const action = (progress > threshold) === (direction === 'in') ? animateLabelIn : animateLabelOut;
  action(selector);
}

function getSectionPosition(index) {
  const sections = document.querySelectorAll('.track > *');
  let position = 0;
  for (let i = 0; i < index; i++) {
    position += sections[i].getBoundingClientRect().width;
  }
  return position;
}



  const calculateTotalHeight = (section, bigtitleRow) => {
    if (!section) return 0;
    const paddingValue = (section.offsetHeight - bigtitleRow) / 2;
    section.style.paddingTop = `${paddingValue}px`;
    return Array.from(section.children).reduce((total, child) => total + child.offsetHeight, 0);
  };
  
  const totalServicesHeight = calculateTotalHeight(servicesSection, servicesSectionHeight);
  const totalProjectsHeight = calculateTotalHeight(projectsSection, projectsSectionHeight);
  
  const calculatedServicesHeight = totalServicesHeight - servicesSectionHeight;
  const calculatedProjectsHeight = totalProjectsHeight - projectsSectionHeight;

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scrub: 1,
      end: getSectionPosition(9),
      // markers: true
    }
  });

  tl.to('.track', {
    x: -getSectionPosition(1),
    ease: "none",
    duration: 1,
    onUpdate() {
      updateTitle('1', this.progress(), 'in');
    }
  })

  .to('.flames', {
    y: '-40%',
    ease: "none",
    duration: 0.5
  }, 0)
  .addLabel('benefits')
  .to('.benefits_col:first-child', {
    y: `-${firstBenefitColHeight - bSquare}px`,
    ease: "none",
    duration: 1
  })
  .to('.benefits_col:last-child', {
    y: `${lastBenefitColHeight - bSquare}px`,
    ease: "none",
    duration: 1
  }, '<')
  .to('.track', {
    x: -getSectionPosition(2),
    ease: "none",
    duration: 1,
    onUpdate() {
      const p = this.progress();
      updateTitle('1', p, 'out');
      updateTitle('2', p, 'in');
    }
  })
  .addLabel('manifest')
  .to('.track', {
    x: -getSectionPosition(3),
    ease: "none",
    duration: 3,
    onUpdate() {
      const p = this.progress();
      updateTitle('2', p, 'out', 0.8);
      updateTitle('3', p, 'in', 0.9);
    }
  })
  .addLabel('services')
  .to('.services_section', {
    y: -calculatedServicesHeight,
    ease: "none",
    duration: 3,
    onUpdate() {
      const p = this.progress();
      updateBigtitleRows(p, bigtitleRowsServices, activeRowsServices, bigtitleWrapsServices);
    }
  })
  .to('.track', {
    x: -getSectionPosition(4),
    ease: "none",
    duration: 1,
    onUpdate() {
      const p = this.progress();
      updateTitle('3', p, 'out');
      updateTitle('4', p, 'in');
    }
  })
  .addLabel('process')
  .to('.process_track', {
    x: -processTrack.offsetWidth - 1 * remSize,
    ease: "none",
    duration: 3,
  })
  .to('.process_left_col', {
    opacity: 0,
    ease: "none",
    duration: 0.5
  }, "<")
  .to('.track', {
    x: -getSectionPosition(5),
    ease: "none",
    duration: 1,
    onUpdate() {
      const p = this.progress();
      updateTitle('4', p, 'out');
      updateTitle('5', p, 'in');
    }
  })
  .to('.process_right_box', {
    opacity: 1,
    ease: "none",
    duration: 0.5
  }, '<-=0.5')
  .addLabel('projects')
  .to('.projects_section', {
    y: -calculatedProjectsHeight,
    ease: "none",
    duration: 3,
    onUpdate() {
      const p = this.progress();
      updateBigtitleRows(p, bigtitleRowsProjects, activeRowsProjects, bigtitleWrapsProjects);
    }
  })
  .to('.track', {
    x: -getSectionPosition(6),
    ease: "none",
    duration: 1,
    onUpdate() {
      const p = this.progress();
      updateTitle('5', p, 'out', 0.5);
      updateTitle('6', p, 'in', 0.5);
    }
  })
  .addLabel('plans')
  .to('.track', {
    x: -getSectionPosition(7),
    ease: "none",
    duration: 2,
    onUpdate() {
      const p = this.progress();
      updateTitle('6', p, 'out', 0.7);
      updateTitle('7', p, 'in', 0.75);
    }
  })
  .addLabel('answers')
  .to('.answers_box_left', {
    y: -answersLeftBoxHeight + answersBoxHeight + answerGap,
    ease: "none",
    duration: 1
  })
  .to('.track', {
    x: -getSectionPosition(8),
    ease: "none",
    duration: 1,
    onUpdate() {
      const p = this.progress();
      updateTitle('7', p, 'out', 0.5);
      updateTitle('8', p, 'in', 0.55);
    }
  })
  .addLabel('board')
  .to('.track', {
    x: -(getSectionPosition(9) - firstSection.offsetWidth),
    ease: "none",
    duration: 2,
    onUpdate() {
      const p = this.progress();
      updateTitle('8', p, 'out', 0.9);
      updateTitle('9', p, 'in', 0.9);
    }
  })
  .to('.navbar, .footer, .main_mask, .nav_links_box', {
    y: -footerHeight,
    ease: "none",
    duration: 0.5,
  })
  .addLabel('contacts')
  .to(navLogo, { opacity: 1, duration: 0.3 }, "<0.1");

  navLinks.forEach((link, index) => {
    const sections = ["benefits", "manifest", "services", "process", "projects", "plans", "answers", "board", "contacts"];
    link.addEventListener('click', () => {
      closeMenu()
      gsap.to(window, {scrollTo: tl.scrollTrigger.labelToScroll(sections[index]), duration: 0.5});
    });
  });

}






function updateBigtitleRows(progress, rows, activeRows, wraps) {
  const index = Math.floor(progress * rows.length);
  rows.forEach((row, i) => {
    if (i <= index && progress > 0 && !activeRows[i]) {
      activeRows[i] = true;
      row.classList.add('is-hovered');
      gsap.to(wraps[i], { opacity: 1, width: 'auto', duration: 0.3, overwrite: 'auto' });
    } else if ((i > index || progress === 0) && activeRows[i]) {
      activeRows[i] = false;
      row.classList.remove('is-hovered');
      gsap.to(wraps[i], { opacity: 0, width: '0', duration: 0.3, overwrite: 'auto' });
    }
  });
}






// #region Mobile ___________________________________________________________________________________________________________

let mobileSwiper;
let plansSlider;
const processTrack = document.querySelector('.process_track');
const processCards = document.querySelectorAll('.process_card');

function initMobileAnimations() {
  // alert('mobile');

      // Сбросить все ScrollTrigger
      ScrollTrigger.refresh();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Пересоздаем медиа-запросы
      mm.revert(); // Отменить предыдущие медиа-запросы

  // весь код для мобильных
  const bigtitleRows = document.querySelectorAll('.bigtitle_row');

  //SWIPERS__________________________________________________________________________________________________________________________
  const processTrack = document.querySelector('.process_track');
  const processCards = document.querySelectorAll('.process_card');

  const planSlider = document.querySelector('.plans_slider');
  const plansSlides = document.querySelectorAll('.plans_slider > *');
  // plansSlides.forEach(slide => {
  //   // Create a wrapper div with swiper-slide class
  //   const wrapper = document.createElement('div');
  //   wrapper.classList.add('swiper-slide');
    
  //   // Get the parent element (plans_slider)
  //   const parent = slide.parentNode;
    
  //   // Insert the wrapper before the slide
  //   parent.insertBefore(wrapper, slide);
    
  //   // Move the slide into the wrapper
  //   wrapper.appendChild(slide);
  // });

  processTrack.classList.add('swiper-wrapper');
  planSlider.classList.add('swiper-wrapper');

  function addSwiperSlideClass(cards) {
    cards.forEach(card => {
      card.classList.add('swiper-slide');
    });
  }
  
  addSwiperSlideClass(processCards);
  addSwiperSlideClass(plansSlides);

  mobileSwiper = new Swiper('.process_right_col', {
    spaceBetween: 10,
  
  });
  plansSlider = new Swiper('.plans_section', {
    // spaceBetween: 10,
    slidesPerView: 'auto',
  });
  
  bigtitleRows.forEach(row => {
    const bigtitleWrap = row.querySelector('.bigtitle_wrap');
    gsap.fromTo(bigtitleWrap, 
      {
        opacity: 0, 
        width: 0,
      },
      { 
        opacity: 1, 
        width: 'auto',
        duration: 0.3, 
        scrollTrigger: {
          trigger: row,
          start: "top 50%",
          end: "bottom 0%", 
          toggleActions: "play none none reverse",
          // toggleClass: {
          //   targets: row.parentElement,
          //   className: "is-hovered"
          // },
          onEnter: () => {
            row.classList.add('is-hovered');
          },
  
          onLeaveBack: () => {
            row.classList.remove('is-hovered');
          },
          
          // markers: true
        },
  
      }
    );
  });
  const boardSection = document.querySelector('.board_section');
  const boardSectionChildren = boardSection.children;
  const boardSectionChildrenWidths = Array.from(boardSectionChildren).map(child => child.offsetWidth);
  
  // Calculate total width considering negative margins
  const totalChildrenWidth = Array.from(boardSectionChildren).reduce((total, child) => {
    const computedStyle = window.getComputedStyle(child);
    const marginLeft = parseInt(computedStyle.marginLeft) || 0;
    const marginRight = parseInt(computedStyle.marginRight) || 0;
    return total + child.offsetWidth + (marginLeft < 0 ? marginLeft : 0) + (marginRight < 0 ? marginRight : 0);
  }, 0) - boardSection.offsetWidth;
  
  gsap.to('.board_section > *', {
    x: -totalChildrenWidth,
    ease: "none",
    duration: 1,
    scrollTrigger: {
      trigger: '.board_section',
      start: "top 0%",
      end: "bottom 50%",
      scrub: 1,
      // markers: true,
    }
  })

// Create ScrollTrigger for each section in .track to show corresponding image in .section_title_box
document.querySelectorAll('.track > div').forEach((section, index) => {
  // Adjust index to start showing images from the second section
  // For the second section (index 1), show the first image (index 0)
  const imageIndex = index > 0 ? index - 1 : null;
  
  // Skip the first section
  if (imageIndex === null) return;
  
  // Get the corresponding image in the section_title_box
  const sectionImage = document.querySelector(`.section_title_box img:nth-child(${imageIndex + 1})`);
  
  if (sectionImage) {
    gsap.set(sectionImage, { yPercent: -150 });

    // Create ScrollTrigger for each section
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Show the corresponding image
        gsap.to(sectionImage, { yPercent: 0, duration: 0.3 });
      },
      onLeave: () => {
        // Hide the image when leaving the section
        gsap.to(sectionImage, { yPercent: -150, duration: 0.3 });
      },
      onEnterBack: () => {
        // Show the image when scrolling back up
        gsap.to(sectionImage, { yPercent: 0, duration: 0.3 });
      },
      onLeaveBack: () => {
        // Hide the image when scrolling back up past the section
        gsap.to(sectionImage, { yPercent: -150, duration: 0.3 });
      }
    });
  }
});
}


// #endregion 

// #region Swipers
const swiper = new Swiper('.news_slider_wrap', {
  // Optional parameters
  loop: true,
  navigation: {
    nextEl: '.is-next',
    prevEl: '.is-prev',
  },

});





//#region BURGER 
const navLinksBox = document.querySelector('.nav_links_box');
const navLinks = document.querySelectorAll('.nav_links_box a');
const burger = document.querySelector('.burger_button');
const mask = document.querySelector('.main_mask');
const burgerLine = document.querySelectorAll('.burger_line');
let isOpen = false; // Track the state of the menu

gsap.set(navLinksBox, {autoAlpha: 0});
gsap.set(navLinks, {x: '50%', opacity: 0});
const cookieTextWrap = document.querySelector('.cookie_text_wrap');

const navMenuBackground = document.querySelector('.nav_menu_background');
const navMenuButton = document.querySelector('.nav_menu_button');
const mobileMask = document.querySelector('.mobile_mask');

const navMenuButtonWidth = navMenuButton.offsetWidth;

const cookieTextWrapWidth = cookieTextWrap.offsetWidth;

gsap.set(cookieTextWrap, {width: '0', opacity: 0});

const cookieIcon = document.querySelector('.cookie_wrap');

cookieIcon.addEventListener('mouseenter', () => {
  gsap.to('.cookie_text_wrap', { width: 'auto', duration: 0.3, opacity: 1, overwrite: true });
  gsap.to('.red_back', { width: `calc(7rem + ${cookieTextWrapWidth}px)`, transform: 'translateX(7rem)', duration: 0.3, overwrite: true });
});
cookieIcon.addEventListener('mouseleave', () => {
  gsap.to('.cookie_text_wrap', { width: '0', duration: 0.3, opacity: 0, overwrite: true });
  gsap.to('.red_back', { width: '7rem', transform: 'translateX(0)', duration: 0.3, overwrite: true });
});

if (window.innerWidth >= 480) {
  burger.addEventListener('mouseenter', () => {
    gsap.to(navMenuBackground, { width: `7rem`, transform: `translateX(${navMenuButtonWidth}px)`, duration: 0.3, overwrite: true });
  });
  burger.addEventListener('mouseleave', () => {
    gsap.to(navMenuBackground, { width: navMenuButtonWidth, transform: 'translateX(0)', duration: 0.3, overwrite: true });
  });
}
function openMenu() {
  let newY0 = '0.8rem';
  let newY1 = '-0.8rem';
  const newWidth = `calc(100% - ${navLinksBox.offsetWidth}px)`;
  const newRotation0 = 45;
  const newRotation1 = -45;

  const newOpacity = 1;

  // Простая проверка ширины экрана
  if (window.innerWidth >= 480) {
    // Код для десктопа

    gsap.to(mask, { width: newWidth, duration: 0.5 });
  } else {
    // Код для мобильных
    mobileMask.classList.add('is-opened');
    newY0 = '0.5rem';
    newY1 = '-0.5rem';
  }

  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });
  gsap.to(navLinksBox, { autoAlpha: newOpacity, duration: 0.3 });

  gsap.to(navLinks, { x: '0%', delay: 0.2, duration: 0.3, stagger: 0.04, opacity: 1, ease: 'power1.inOut', onComplete: () => {
    document.addEventListener("click", handleOutsideClick);
    burger.removeEventListener('click', openMenu);
  }});

  isOpen = true; // Set the state to open
}

function closeMenu() {
  console.log('close');
  
  const newWidth = '100%';
  const newRotation0 = 0;
  const newRotation1 = 0;
  const newY0 = '0rem';
  const newY1 = '0rem';
  const newOpacity = 0;
    // Простая проверка ширины экрана
    if (window.innerWidth >= 480) {
      // Код для десктопа
      gsap.to(mask, { width: newWidth, duration: 0.5 });
    } else {
      // Код для мобильных
    mobileMask.classList.remove('is-opened');
  }
  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });
  gsap.to(navLinksBox, { autoAlpha: newOpacity, duration: 0.3 });

  gsap.to(navLinks, { x: '50%', duration: 0.3, opacity: 0, ease: 'power1.inOut', onComplete: () => {
    document.removeEventListener("click", handleOutsideClick);
    burger.addEventListener('click', openMenu);
  }});
  

  isOpen = false; // Set the state to closed
}

function toggleMenu() {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

burger.addEventListener('click', openMenu);


const handleOutsideClick = (event) => {
  const path = event.composedPath();
  const isClickInsideDropdownOrButton = Array.from(navLinksBox.children).some(button => path.includes(button))

  if (!isClickInsideDropdownOrButton) {
    closeMenu()
  }

};




//#endregion BURGER MENU__________________________________________________________________________________________________________



// var Webflow = Webflow || [];
// Webflow.push(function(){
//   initGsap();
// }); 

//#region PRICES  
let pricePeriod = 'quarterly';
const initialTrial = parseInt(document.querySelectorAll('[data-price]')[0].textContent.replace(',', ''));
const initialSingle = parseInt(document.querySelectorAll('[data-price]')[1].textContent.replace(',', ''));
const initialDouble= parseInt(document.querySelectorAll('[data-price]')[2].textContent.replace(',', ''));
const initialTrouble= parseInt(document.querySelectorAll('[data-price]')[3].textContent.replace(',', ''));

const prices = [initialTrial, initialSingle, initialDouble, initialTrouble];



const activeElement = document.querySelector('.plans_swither_active');
document.querySelector('[data-switcher]').children[0].addEventListener('click', () => {
  activeElement.style.transform = 'translateX(-100%)';
  
 
    pricePeriod = 'monthly';
    countPrice(); 
  
});
document.querySelector('[data-switcher]').children[1].addEventListener('click', () => {
  activeElement.style.transform = 'translateX(0%)';

  pricePeriod = 'quarterly';
  countPrice();
  
});


document.querySelectorAll('.switcher').forEach(switcher => {
  switcher.addEventListener('click', () => {
    switcher.querySelector('.head-switcher').classList.toggle('is-active');
    countPrice();
  });
});

function countPrice() {
  const isActive = document.querySelector('[data-cat] .is-active') !== null;
  const isLabelActive = document.querySelector('[data-label] .is-active') !== null;
  const priceMultipliers = {
    monthly: 1.15,
    quarterly: 1,
    inactive: 1.2,
    label: 1.1
  };

  document.querySelectorAll('[data-price]').forEach((element, index) => {
    let finalPrice = prices[index];
    
    finalPrice *= pricePeriod === 'monthly' ? priceMultipliers.monthly : priceMultipliers.quarterly;
    finalPrice *= !isActive ? priceMultipliers.inactive : 1;
    finalPrice *= isLabelActive ? priceMultipliers.label : 1;

    const formattedPrice = finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    element.textContent = formattedPrice;
  });
}

//#endregion PRICES  

//#region FAQ

document.querySelectorAll('.answer_item').forEach((item, index) => {
  item.addEventListener('click', () => {
    // Close all other dropdowns first
    document.querySelectorAll('.answer_drop.is-active').forEach(drop => {
      if (drop !== item.querySelector('.answer_drop')) {
        drop.classList.remove('is-active');
        gsap.to(drop, {
          height: 0,
          duration: 0.3
        });
      }
    });

    // Toggle clicked dropdown
    const dropElement = item.querySelector('.answer_drop');
    dropElement.classList.toggle('is-active');
    gsap.to(dropElement, {
      height: dropElement.classList.contains('is-active') ? 'auto' : 0,
      duration: 0.3
    });
  });
});

gsap.set('.answer_drop', { height: 0 });

// Open the first dropdown by default
const firstDropElement = document.querySelector('.answer_item .answer_drop');
if (firstDropElement) {
  firstDropElement.classList.add('is-active');
  console.log(firstDropElement);
  gsap.set(firstDropElement, { height: 'auto' , onComplete: () => {
    console.log('complete');
  }});
}




//#endregion FAQ__________________________________________________________________________________________________________




// Инициализация медиа-запросов однократно
function initMediaQueries() {
  mm.revert(); // Очистка предыдущих медиа-запросов
  
  mm.add("(min-width: 480px)", () => {
    initDesktopAnimations();
    return () => { /* cleanup function */ };
  });
  
  mm.add("(max-width: 479px)", () => {
    initMobileAnimations();
    return () => { /* cleanup function */ 
      mobileSwiper.destroy();
      processTrack.classList.remove('swiper-wrapper');
      processCards.forEach(card => {
        card.classList.remove('swiper-slide');
      });
    
    };
  });
}

// Инициализируем медиа-запросы при загрузке
initMediaQueries();

// // Обработчик изменения размера окна
// let resizeTimeout;
// window.addEventListener('resize', () => {
//   clearTimeout(resizeTimeout);
//   resizeTimeout = setTimeout(() => {
//     console.log('Resizing - reinitializing animations');
//     initMediaQueries();
//   }, 250);
// });
