// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
  // lerp: 0.1,
  // wheelMultiplier: 0.7,
  // gestureOrientation: "vertical",
  // normalizeWheel: false,
  // smoothTouch: false,
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);



// Sound
const soundButtons = document.querySelectorAll("[data-sound]");
let audio = null;


soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const soundButtonIcon = button.querySelector('.sound_button');

    // button.classList.toggle("is-active");
    if (audio && !audio.paused) {
      // If audio is playing, stop it
      audio.pause();
      audio.currentTime = 0;
      soundButtonIcon.style.display = 'block';
      soundButtonIcon.nextElementSibling.style.display = 'none';

    } else {
      // If no audio or audio is paused, create and play
      audio = new Audio("https://res.cloudinary.com/do7m7foqv/video/upload/v1742898919/Ava_Low_-_Them_Thieves_Looped_v2_kbv2gx.mp3");
      audio.play();
      soundButtonIcon.style.display = 'none';
      soundButtonIcon.nextElementSibling.style.display = 'block';
      audio.loop = true;
      audio.volume = 0.5;
    }
  });
});


const logo = document.querySelector('.logo-jinx');
const footerLogo = document.querySelector('.nav_logo')
const flamesBox = document.querySelector('.flames_box');
let distanceFromTop = logo.getBoundingClientRect().bottom + window.scrollY;
// flamesBox.style.height = `${distanceFromTop}px`;


//
const iconCatLink = document.querySelector(".icon-cat-link");
iconCatLink.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
//Joke
const jokeButton = document.querySelector("[data-joke]");
const jokeInitial = document.querySelector(".joke_initial");
const jokeFinal = document.querySelector(".joke_box");
let isFirstClick = true;
let clickCount = 0;

jokeButton.addEventListener("click", () => {
  clickCount++;
  
  if (isFirstClick) {
    // First click: Change the button text
    jokeButton.textContent = "seriously, don't touch it";
    isFirstClick = false;
  } else if (clickCount === 2) {
    // Second click: Show "please stop"
    jokeButton.textContent = "please stop";
  } else if (clickCount === 3) {
    // Third click: Show 10 spaces
    jokeButton.textContent = " ";
  } else if (clickCount === 4) {
    // Fourth click: Hide the button
    jokeButton.style.display = "none";
    jokeInitial.style.display = "none";
    jokeFinal.style.display = "block";
  }
});

let fireLastStepHeight ;

//Fire
const fireAnimation = lottie.loadAnimation({
  container: document.querySelector(".flames"),
  renderer: "svg",

  loop: true,
  autoplay: true,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67e4f42cc34467f09b8f3481_fire.json",
});
fireAnimation.setSpeed(1.5);


//Hero
lottie.loadAnimation({
  container: document.querySelector(".hero_lottie"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67de76d3c963e2fea84cfb4f_main-EUmoj.json",
});


//Benefits
const benefitsLottie = lottie.loadAnimation({
  container: document.querySelector(".traditional-h2-image"), // Make sure this element exists
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67de874bff0309089a98e25b_scratch-qddRu.json", // Update with your actual JSON path
});

//Benefits
const scratchLottie = lottie.loadAnimation({
  container: document.querySelector(".scratches-2"), // Make sure this element exists
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67de874bff0309089a98e25b_scratch-qddRu.json", // Update with your actual JSON path
});

// Debounce function to limit how often the resize handler fires
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Function to create and play Lottie animations with standard options
function createLottieAnimation(container, path) {
  // Get container element if string was provided
  const containerElement = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
    
  // Check if container exists
  if (!containerElement) {
    console.error(`Lottie container not found: ${container}`);
    return null;
  }

  // Create animation with standard options
  const animation = lottie.loadAnimation({
    container: containerElement,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: path
  });

  return animation;
}

// Create animations for all elements with data-lottie attribute
const lottieAnimationsServices = [];
const lottieAnimationsProjects = [];

// Function to process lottie elements for a specific section
function processLottieElements(elements, sectionClass, animationsArray) {
  elements.forEach(element => {
    // Get the path from the data-lottie attribute
    const path = element.getAttribute('data-lottie');
    
    // Find the parent bigtitle_row to determine the order
    const parentRow = element.closest('.bigtitle_row');
    
    // Get the index of this row among all bigtitle_rows (or default to 0 if not found)
    let rowIndex = 0;
    if (parentRow) {
      const allRows = Array.from(document.querySelectorAll(`.${sectionClass} .bigtitle_row`));
      rowIndex = allRows.indexOf(parentRow);
    }
    
    // Create the animation
    const animation = createLottieAnimation(element, path);
    
    // Store the animation with its row index
    if (animation) {
      animationsArray.push({
        rowIndex: rowIndex,
        animation: animation,
        element: element
      });
    }
  });
}

// Find all elements with data-lottie attribute
const lottieElementsServices = document.querySelectorAll('.services_section [data-lottie]');
const lottieElementsProjects = document.querySelectorAll('.projects_section [data-lottie]');

// Process lottie elements for each section
processLottieElements(lottieElementsServices, 'services_section', lottieAnimationsServices);
processLottieElements(lottieElementsProjects, 'projects_section', lottieAnimationsProjects);





let mm = gsap.matchMedia();
let progress = 0;

function getTotalFlexHeight(container) {
  let elements = Array.from(container.children);
  if (elements.length === 0) return 0;

  let totalHeight = elements.reduce((sum, el) => sum + el.offsetHeight, 0);

  let style = window.getComputedStyle(container);
  let gap = parseFloat(style.rowGap || 0); // Берём `gap` (rowGap для колонок)

  let totalGaps = gap * (elements.length - 1); // Количество промежутков

  return totalHeight + totalGaps;
}
// Cookie
const cookieTextWrap = document.querySelector(".cookie_text_wrap");
const cookieWrap = document.querySelector(".cookie_wrap");
let cookieWrapWidth = cookieWrap.offsetWidth;
// console.log(cookieTextWrap);
gsap.set(cookieTextWrap, { width: 0, opacity: 0 });

// Burger
const navMenuBackground = document.querySelector(".nav_menu_background");
const navMenuButton = document.querySelector(".nav_menu_button");
let navMenuButtonWidth = navMenuButton.offsetWidth;

gsap.set(".section_title_box", { opacity: 1 });

// #region Desktop ___________________________________________________________________________________________________________
function initDesktopAnimations() {

  const links = document.querySelectorAll("[data-link]");
  links.forEach((link, index) => {
    const label = link.getAttribute("data-link");
    link.addEventListener("click", () => {
      gsap.to(window, {
        scrollTo: tl.scrollTrigger.labelToScroll(label),
        duration: 0.5,
      });
    });
  });

  // flamesBox.style.height = `${distanceFromTop}px`;
// Burger hover effect
burger.addEventListener("mouseenter", () => {
  gsap.to(navMenuBackground, {
    width: `7rem`,
    transform: `translateX(${navMenuButtonWidth}px)`,
    duration: 0.3,
    overwrite: true,
  });
});
burger.addEventListener("mouseleave", () => {
  gsap.to(navMenuBackground, {
    width: navMenuButtonWidth,
    transform: "translateX(0)",
    duration: 0.3,
    overwrite: true,
  });
});

window.addEventListener('resize', debounce(() => {

  // Burger
  navMenuButtonWidth = navMenuButton.offsetWidth;
  gsap.set(navMenuBackground, {
    width: navMenuButtonWidth,
  });

  // Cookie
  gsap.set(cookieTextWrap, {
    width: "auto",
  });
  cookieWrapWidth = cookieWrap.offsetWidth;
  gsap.set(cookieTextWrap, {
    width: 0,
  });
}, 250)); 

const cookieIcon = document.querySelector(".cookie_wrap");
cookieIcon.addEventListener("mouseenter", () => {
  gsap.to(".cookie_text_wrap", {
    width: "auto",
    duration: 0.3,
    opacity: 1,
    overwrite: true,
  });
  gsap.to(".red_back", {
    width: cookieWrapWidth,
    transform: "translateX(7rem)",
    duration: 0.3,
    overwrite: true,
  });
});
cookieIcon.addEventListener("mouseleave", () => {
  gsap.to(".cookie_text_wrap", {
    width: "0",
    duration: 0.3,
    opacity: 0,
    overwrite: true,
  });
  gsap.to(".red_back", {
    width: "7rem",
    transform: "translateX(0)",
    duration: 0.3,
    overwrite: true,
  });
});

  let tl;

  // Очистить предыдущие анимации если они существуют
  if (tl) {
    tl.kill();
  }
  // Сбросить все ScrollTrigger
  ScrollTrigger.refresh();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Пересоздаем медиа-запросы
  mm.revert(); // Отменить предыдущие медиа-запросы

  const deadTitleHeight =
    document.querySelector(".benefits_title_box")?.offsetHeight / 2 || 0;
  const firstBenefitColHeight =
    document.querySelector(".benefits_col:first-child")?.offsetHeight / 2 || 0;
  const lastBenefitColHeight =
    document.querySelector(".benefits_col:last-child")?.offsetHeight / 2 || 0;
  const bSquare =
    document.querySelector(".benefits_square_wrap")?.offsetHeight / 2 || 0;

  gsap.set(".benefits_col:first-child", {
    y: `${firstBenefitColHeight - deadTitleHeight}px`,
  });
  gsap.set(".benefits_col:last-child", {
    y: `-${lastBenefitColHeight - deadTitleHeight}px`,
  });

  const firstSection = document.querySelector(".main_section");
  const benefitsSection = document.querySelector(".benefits_section");
  const manifestSection = document.querySelector(".mnfst_section");
  const servicesSection = document.querySelector(".services_section");
  const processSection = document.querySelector(".process_section");
  const processTrack = document.querySelector(".process_track");
  const projectsSection = document.querySelector(".projects_section");
  const boardSection = document.querySelector(".board_section");
  const footerHeight = document.querySelector(".footer").offsetHeight;
  const processCardWidth = document.querySelector(".process_card").offsetWidth;
  const plansCardWidth = document.querySelector(".plans_card.is-first").offsetWidth;
  // const plansSectionWidth = document.querySelector(".plans_section").offsetWidth;
  const planCards = gsap.utils.toArray(".plans_slider > *");


  const servicesSectionHeight =
    document.querySelector(".services_section .bigtitle_row")?.offsetHeight ||
    0;
  const projectsSectionHeight =
    document.querySelector(".projects_section .bigtitle_row")?.offsetHeight ||
    0;
  let answersLeftBoxHeight = 0;
  const answersBoxHeight =
    document.querySelector(".answers_box")?.offsetHeight || 0;

  let container = document.querySelector(".answers_box_left");
  answersLeftBoxHeight = getTotalFlexHeight(container);

  const answerGap = (container.offsetHeight - answersBoxHeight) / 2;

  const remSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const navLogo = document.querySelector(".nav_logo");

  gsap.set(".bigtitle_wrap", { opacity: 0 });
  gsap.set(".section_title_box *", { yPercent: -150 });



  gsap.set(".process_right_box", { opacity: 0 });

  const bigtitleRowsServices = document.querySelectorAll(
    ".services_section .bigtitle_row"
  );
  const bigtitleRowsProjects = document.querySelectorAll(
    ".projects_section .bigtitle_row"
  );

  const bigtitleWrapsServices = Array.from(bigtitleRowsServices).map((row) =>
    row.querySelector(".bigtitle_wrap")
  );
  const bigtitleWrapsProjects = Array.from(bigtitleRowsProjects).map((row) =>
    row.querySelector(".bigtitle_wrap")
  );

  const activeRowsServices = new Array(bigtitleRowsServices.length).fill(false);
  const activeRowsProjects = new Array(bigtitleRowsProjects.length).fill(false);

  const animateLabelIn = (selector) => {
    const label = document.querySelector(`.label:nth-of-type(${selector})`);
    const navLink = document.querySelector(
      `.nav_links_box a:nth-of-type(${selector})`
    );

    if (label) {
      gsap.to(label, { yPercent: 0, duration: 0.3 });
    }

    if (navLink) {
      navLink.classList.add("is-active");
    }
  };

  const animateLabelOut = (selector) => {
    const label = document.querySelector(`.label:nth-of-type(${selector})`);
    const navLink = document.querySelector(
      `.nav_links_box a:nth-of-type(${selector})`
    );

    if (label) {
      gsap.to(label, { yPercent: -150, duration: 0.3 });
    }

    if (navLink) {
      navLink.classList.remove("is-active");
    }
  };

  function updateTitle(selector, progress, direction, threshold = 0.5) {
    const action =
      progress > threshold === (direction === "in")
        ? animateLabelIn
        : animateLabelOut;
    action(selector);
  }

  function getSectionPosition(index) {
    const sections = document.querySelectorAll(".track > *");
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
    return Array.from(section.children).reduce(
      (total, child) => total + child.offsetHeight,
      0
    );
  };

  const totalServicesHeight = calculateTotalHeight(
    servicesSection,
    servicesSectionHeight
  );
  const totalProjectsHeight = calculateTotalHeight(
    projectsSection,
    projectsSectionHeight
  );

  const calculatedServicesHeight = totalServicesHeight - servicesSectionHeight;
  const calculatedProjectsHeight = totalProjectsHeight - projectsSectionHeight;

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scrub: 1,
      end: getSectionPosition(9),
      // markers: true
    },
  });

  distanceFromTop = logo.getBoundingClientRect().bottom + window.scrollY;
  distanceFromTopFooter = footerLogo.getBoundingClientRect().bottom + window.scrollY;
  // console.log(distanceFromTop);
  gsap.set(flamesBox, { height: `${distanceFromTop}px` });

  tl.to(".track", {
    x: -getSectionPosition(1),
    ease: "none",
    duration: 1,
    onUpdate() {
      updateTitle("1", this.progress(), "in");
    },
  })

    .to(
      ".flames_box",
      {
        height: document.querySelector('.label').offsetHeight,
        ease: "none",
        duration: 0.5,
        onComplete: () => {
          progress = 1;
        },
        onReverseComplete: () => {
          progress = 0;
        },
      },
      0
    )
    .addLabel("benefits")
    // Add Lottie animation for benefits section
    .add(() => {
      // Create a new Lottie animation when we reach the benefits section
      benefitsLottie.play();
    }, "benefits")
    .to(".benefits_col:first-child", {
      y: `-${firstBenefitColHeight - bSquare}px`,
      ease: "none",
      duration: 1,
    })
    .to(
      ".benefits_col:last-child",
      {
        y: `${lastBenefitColHeight - bSquare}px`,
        ease: "none",
        duration: 1,
      },
      "<"
    )
    .to(".track", {
      x: -getSectionPosition(2),
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        updateTitle("1", p, "out");
        updateTitle("2", p, "in");
      },
    })
    .addLabel("manifest")
    .to(".track", {
      x: -getSectionPosition(3),
      ease: "none",
      duration: 3,
      onUpdate() {
        const p = this.progress();
        updateTitle("2", p, "out", 0.8);
        updateTitle("3", p, "in", 0.9);
      },
    })
    .addLabel("services")
    .to(".services_section", {
      y: -calculatedServicesHeight,
      ease: "none",
      duration: 3,
      onUpdate() {
        const p = this.progress();
        updateBigtitleRows(
          p,
          bigtitleRowsServices,
          activeRowsServices,
          bigtitleWrapsServices
        );
      },
    })
    .to(".track", {
      x: -getSectionPosition(4),
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        updateTitle("3", p, "out");
        updateTitle("4", p, "in");
      },
    })
    .addLabel("process")
    .add(() => {
      scratchLottie.play();
    }, "process")
    .to(".process_track", {
      // x: -processTrack.offsetWidth - 1 * remSize,
      x: -processCardWidth - 1 * remSize,
      ease: "none",
      duration: 1,
    })
 
      .to(".process_card:nth-child(1) ~ .process_card", {
        x: -processCardWidth - 1 * remSize,
        ease: "none",
        duration: 1,
      })
      .to(
        ".process_left_col",
        {
          opacity: 0,
          ease: "none",
          duration: 0,
        }, "<"
      )
      .to(".process_card:nth-child(2) ~ .process_card", {
        x: -processCardWidth*2 - 2 * remSize,
        ease: "none",
        duration: 1,
      })
      .to(".process_card:nth-child(3) ~ .process_card", {
        x: -processCardWidth*3 - 3 * remSize,
        ease: "none",
        duration: 1,
      })
      .to(
        ".process_right_box",
        {
          opacity: 1,
          ease: "none",
          duration: 0,
        },
        "<"
      )

   
    .to(".track", {
      x: -getSectionPosition(5),
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        updateTitle("4", p, "out");
        updateTitle("5", p, "in");
      },
    })
 
    .addLabel("projects")
    .to(".projects_section", {
      y: -calculatedProjectsHeight,
      ease: "none",
      duration: 3,
      onUpdate() {
        const p = this.progress();
        updateBigtitleRows(
          p,
          bigtitleRowsProjects,
          activeRowsProjects,
          bigtitleWrapsProjects
        );
      },
    })
    .to(".track", {
      x: -getSectionPosition(6),
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        updateTitle("5", p, "out", 0.5);
        updateTitle("6", p, "in", 0.5);
      },
    })

    .addLabel("plans")
    // .to(".plans_section", {
    //   x: -plansSectionWidth,
    //   ease: "none",
    //   duration: 2,
    // })
    .to(planCards, {
      x: - (plansCardWidth*3 + 3 * remSize),
      ease: "none",
      duration: 2,
    })
    .to(planCards[0], {
      opacity: 0,

      ease: "none",
      duration: 0.66,
    }, "<")
    .to(planCards[1], {
      opacity: 0,

      ease: "none",
      duration: 0.66,
    }, '>')
    .to(planCards[2], {
      opacity: 0,
      ease: "none",
      duration: 0.66,
    }, '>')
    
    .to(".track", {
      x: -getSectionPosition(7),
      ease: "none",
      duration: 2,
      onUpdate() {
        const p = this.progress();
        updateTitle("6", p, "out", 0.7);
        updateTitle("7", p, "in", 0.75);
      },
    })
    // .to(".plans_card.is-first", {
    //   x: plansSectionWidth,
    //   ease: "none",
    //   duration: 2,
    // }, "<")
    .addLabel("answers")
    .to(".answers_box_left", {
      y: -answersLeftBoxHeight + answersBoxHeight + answerGap,
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        // Count the number of answer items in the container
        const answerItems = document.querySelectorAll('.answer_item');
        const totalItems = answerItems.length;
        
        if (totalItems > 0) {
          // Calculate which item should be active based on progress
          // Divide progress into equal segments for each item
          const segmentSize = 1 / totalItems;
          const activeIndex = Math.min(
            Math.floor(p / segmentSize),
            totalItems - 1
          );
          
          // Only toggle if we're moving to a different item
          const currentActiveItem = document.querySelector('.answer_drop.is-active');
          const currentActiveIndex = Array.from(answerItems).findIndex(
            item => item.querySelector('.answer_drop') === currentActiveItem
          );
          
          if (currentActiveIndex !== activeIndex) {
            toggleDropdown(activeIndex);
          }
        }
        
      },
    })
    .to(".track", {
      x: -getSectionPosition(8),
      ease: "none",
      duration: 1,
      onUpdate() {
        const p = this.progress();
        updateTitle("7", p, "out", 0.5);
        updateTitle("8", p, "in", 0.55);
      },
    })
    .addLabel("board")
    .to(".track", {
      x: -(getSectionPosition(9) - firstSection.offsetWidth),
      ease: "none",
      duration: 2,
      onUpdate() {
        const p = this.progress();
        updateTitle("8", p, "out", 0.9);
        updateTitle("9", p, "in", 0.9);
      },
      onComplete: () => {
        console.log(fireLastStepHeight);
      },
    })
    .to(".navbar, .footer, .main_mask, .nav_links_box", {
      y: -footerHeight,
      ease: "none",
      duration: 0.5,
      // onComplete: () => {
        //   gsap.to(flamesBox, {
          //     height: fireLastStepHeight,
          //   });
          // },
          
        })
    .to(".flames_box", {
      // height: `${flames.offsetHeight + flamesMarginBottomValue}px`,
      height: fireLastStepHeight,

      // ease: "none",
      // duration: 0.5,
      // onStart: () => {
      //   console.log(
      //     fireLastStepHeight
      //   );
      // },
    }, "<")
    .addLabel("contacts")
    .to(navLogo, { opacity: 1, duration: 0.3 }, "<0.1");

    
  navLinks.forEach((link, index) => {
    const sections = [
      "benefits",
      "manifest",
      "services",
      "process",
      "projects",
      "plans",
      "answers",
      "board",
      "contacts",
    ];
    link.addEventListener("click", () => {
      closeMenu();
      gsap.to(window, {
        scrollTo: tl.scrollTrigger.labelToScroll(sections[index]),
        duration: 0.5,
      });
    });
  });

      // Function to handle hover effects for projects section
      bigtitleRowsProjects.forEach((row, index) => {
        // Cache the matching animation lookup
        const matchingLottie = lottieAnimationsProjects.find(anim => anim.rowIndex === index);
        
        if (matchingLottie && matchingLottie.animation) {
          row.addEventListener('mouseenter', () => {
            matchingLottie.animation.setDirection(1);
            matchingLottie.animation.setSpeed(1);
            matchingLottie.animation.play();
          });
          
          row.addEventListener('mouseleave', () => {
            matchingLottie.animation.setDirection(-1);
            matchingLottie.animation.setSpeed(3); // Double the speed
            matchingLottie.animation.play();
          });
        }
      });
}

function updateBigtitleRows(progress, rows, activeRows, wraps) {
  const index = Math.floor(progress * rows.length);
  rows.forEach((row, i) => {
    if (i <= index && progress > 0 && !activeRows[i]) {
      activeRows[i] = true;
      row.classList.add("is-hovered");
      // const lottie = row.querySelector('[data-lottie]');
      // if (lottie && lottie.children && lottie.children.length === 0) {
      //   createLottieAnimation(lottie, lottie.getAttribute('data-lottie'));
      // }
      // Find the matching lottie animation for this row
      const matchingLottie = lottieAnimationsServices.find(anim => anim.rowIndex === i + 1);
      if (matchingLottie && matchingLottie.animation) {
        // Play the animation if it exists
        matchingLottie.animation.play(0);
      }

      gsap.to(wraps[i], {
        opacity: 1,
        width: "auto",
        duration: 0.3,
        overwrite: "auto",
      });
    } else if ((i > index || progress === 0) && activeRows[i]) {
      activeRows[i] = false;
      row.classList.remove("is-hovered");
      gsap.to(wraps[i], {
        opacity: 0,
        width: "0",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  });


}

// #region Mobile ___________________________________________________________________________________________________________

let mobileSwiper;
let plansSlider;
const processTrack = document.querySelector(".process_track");
const processCards = document.querySelectorAll(".process_card");

function initMobileAnimations() {
  // alert('mobile');

  // Сбросить все ScrollTrigger
  ScrollTrigger.refresh();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Пересоздаем медиа-запросы
  mm.revert(); // Отменить предыдущие медиа-запросы

  // весь код для мобильных
  const bigtitleRows = document.querySelectorAll(".bigtitle_row");

  //SWIPERS__________________________________________________________________________________________________________________________
  const processTrack = document.querySelector(".process_track");
  const processCards = document.querySelectorAll(".process_card");

  const planSlider = document.querySelector(".plans_slider");
  const plansSlides = document.querySelectorAll(".plans_slider > *");
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

  processTrack.classList.add("swiper-wrapper");
  planSlider.classList.add("swiper-wrapper");

  function addSwiperSlideClass(cards) {
    cards.forEach((card) => {
      card.classList.add("swiper-slide");
    });
  }

  addSwiperSlideClass(processCards);
  addSwiperSlideClass(plansSlides);

  mobileSwiper = new Swiper(".process_right_col", {
    spaceBetween: 10,
  });
  plansSlider = new Swiper(".plans_section", {
    // spaceBetween: 10,
    slidesPerView: "auto",
  });


  // Flames scroll animation

  if (flames) {
    gsap.to(flamesBox, {
      height: 20,
      duration: 0.3,
      scrollTrigger: {
        trigger: ".section_title_box", // Assuming this is the main container
        start: "top top",
        end: "200% top",
        toggleActions: "play none none reverse",
        scrub: true,
        // markers: true,

      }
    });
  }

  bigtitleRows.forEach((row) => {
    const bigtitleWrap = row.querySelector(".bigtitle_wrap");
    gsap.fromTo(
      bigtitleWrap,
      {
        opacity: 0,
        width: 0,
      },
      {
        opacity: 1,
        width: "auto",
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
            row.classList.add("is-hovered");
          },

          onLeaveBack: () => {
            row.classList.remove("is-hovered");
          },

          // markers: true
        },
      }
    );
  });
  const boardSection = document.querySelector(".board_section");
  const boardSectionChildren = boardSection.children;
  const boardSectionChildrenWidths = Array.from(boardSectionChildren).map(
    (child) => child.offsetWidth
  );

  // Calculate total width considering negative margins
  const totalChildrenWidth =
    Array.from(boardSectionChildren).reduce((total, child) => {
      const computedStyle = window.getComputedStyle(child);
      const marginLeft = parseInt(computedStyle.marginLeft) || 0;
      const marginRight = parseInt(computedStyle.marginRight) || 0;
      return (
        total +
        child.offsetWidth +
        (marginLeft < 0 ? marginLeft : 0) +
        (marginRight < 0 ? marginRight : 0)
      );
    }, 0) - boardSection.offsetWidth;

  gsap.to(".board_section > *", {
    x: -totalChildrenWidth,
    ease: "none",
    duration: 1,
    scrollTrigger: {
      trigger: ".board_section",
      start: "top 0%",
      end: "bottom 50%",
      scrub: 1,
      // markers: true,
    },
  });

  // Create ScrollTrigger for each section in .track to show corresponding image in .section_title_box
  document.querySelectorAll(".track > div").forEach((section, index) => {
    // Adjust index to start showing images from the second section
    // For the second section (index 1), show the first image (index 0)
    const imageIndex = index > 0 ? index - 1 : null;

    // Skip the first section
    if (imageIndex === null) return;

    // Get the corresponding image in the section_title_box
    const sectionImage = document.querySelector(
      `.section_title_box img:nth-child(${imageIndex + 1})`
    );

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
        },
      });
    }
  });
  // Add click event listeners to nav links to scroll to corresponding sections in track

  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Get all sections in the track
      const trackSections = document.querySelectorAll(".track > div");

      // Close the menu if it's open
      if (isOpen) {
        closeMenu();
      }

      // For the last link, scroll to footer
      if (index === navLinks.length - 1) {
        gsap.to(window, {
          scrollTo: {
            y: ".footer",
            offsetY: 0,
          },
          duration: 1,
          ease: "power2.inOut",
        });
      } else {
        // Skip the first section (index 0) and adjust index to start from the second section
        // For nav link at index 0, we want to scroll to track section at index 1
        const targetSectionIndex = index + 1;

        // Make sure the target section exists
        if (targetSectionIndex < trackSections.length) {
          const targetSection = trackSections[targetSectionIndex];

          // Scroll to the target section
          gsap.to(window, {
            scrollTo: {
              y: targetSection,
              offsetY: 100,
            },
            duration: 1,
            ease: "power2.inOut",
          });
        }
      }
    });
  });
} // #endregion

// #region Swipers
const swiper = new Swiper(".news_slider_wrap", {
  // Optional parameters
  loop: true,
  navigation: {
    nextEl: ".is-next",
    prevEl: ".is-prev",
  },
});

//#region BURGER
const navLinksBox = document.querySelector(".nav_links_box");
const navLinks = gsap.utils.toArray(".nav_links_box a");
const burger = document.querySelector(".burger_button");
const mask = document.querySelector(".main_mask");
const burgerLine = document.querySelectorAll(".burger_line");
let isOpen = false; // Track the state of the menu

gsap.set(navLinks, { xPercent: 50, autoAlpha: 0 });
gsap.set(navLinksBox, { pointerEvents: "none" });

const mobileMask = document.querySelector(".mobile_mask");
const flames = document.querySelector(".flames");
// Get the computed style of the flames element to find its margin-bottom
const flamesStyle = window.getComputedStyle(flames);
const flamesMarginBottom = flamesStyle.marginBottom;

// Alternative way to get the margin-bottom value
const flamesMarginBottomValue = parseInt(flamesStyle.marginBottom, 10);







function openMenu() {
  if (window.innerWidth > 479) {
    gsap.to(flamesBox, {
      height: 0,
      duration: 0.5,
    });
  }

  let newY0 = "0.8rem";
  let newY1 = "-0.8rem";
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
    mobileMask.classList.add("is-opened");
    newY0 = "0.5rem";
    newY1 = "-0.5rem";
  }

  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });
  //   gsap.to(navLinksBox, { autoAlpha: newOpacity, duration: 0.3 });
  gsap.set(navLinksBox, { pointerEvents: "auto" });
  // navLinks.forEach(link => {
  //   link.style.willChange = "transform, opacity";
  // });

  gsap.to(navLinks, {
    xPercent: 0,
    delay: 0.2,
    duration: 0.3,
    stagger: 0.04,
    autoAlpha: 1,

    ease: "power1.inOut",
    onComplete: () => {
      document.addEventListener("click", handleOutsideClick);
      burger.removeEventListener("click", openMenu);
      // navLinks.forEach(el => el.style.willChange = "");
    },
  });

  isOpen = true; // Set the state to open
}

function closeMenu() {
  if (window.innerWidth > 479) {
    if (progress === 0) {
      gsap.to(flamesBox, {
        height: distanceFromTop,
        duration: 0.5,
      });
    } else {
      gsap.to(flamesBox, {
        height: document.querySelector('.label').offsetHeight,
        duration: 0.5,
      });
    }
  }
  const newWidth = "100%";
  const newRotation0 = 0;
  const newRotation1 = 0;
  const newY0 = "0rem";
  const newY1 = "0rem";
  const newOpacity = 0;
  // Простая проверка ширины экрана
  if (window.innerWidth >= 480) {
    // Код для десктопа
    gsap.to(mask, { width: newWidth, duration: 0.5, delay: 0.4 });
  } else {
    // Код для мобильных
    setTimeout(() => {
      mobileMask.classList.remove("is-opened");
    }, 400);
  }

  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });
  gsap.set(navLinksBox, { pointerEvents: "none" });
  //   gsap.to(navLinksBox, { autoAlpha: newOpacity, delay: 0.5, duration: 0.3 });

  gsap.to(navLinks, {
    xPercent: 50,
    stagger: 0.04,
    duration: 0.3,
    autoAlpha: 0,
    ease: "power1.inOut",
    onComplete: () => {
      document.removeEventListener("click", handleOutsideClick);
      burger.addEventListener("click", openMenu);
    },
  });

  isOpen = false; // Set the state to closed
}

function toggleMenu() {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

burger.addEventListener("click", openMenu);

const handleOutsideClick = (event) => {
  const path = event.composedPath();
  const isClickInsideDropdownOrButton = Array.from(navLinksBox.children).some(
    (button) => path.includes(button)
  );

  if (!isClickInsideDropdownOrButton) {
    closeMenu();
  }
};

//#endregion BURGER MENU__________________________________________________________________________________________________________

// var Webflow = Webflow || [];
// Webflow.push(function(){
//   initGsap();
// });

//#region PRICES
let pricePeriod = "quarterly";
// const initialTrial = parseInt(
//   document.querySelectorAll("[data-price]")[0].textContent.replace(",", "")
// );
const initialSingle = parseInt(
  document.querySelectorAll("[data-price]")[0].textContent.replace(",", "")
);
const initialDouble = parseInt(
  document.querySelectorAll("[data-price]")[1].textContent.replace(",", "")
);
const initialTrouble = parseInt(
  document.querySelectorAll("[data-price]")[2].textContent.replace(",", "")
);

const prices = [ initialSingle, initialDouble, initialTrouble];

const activeElement = document.querySelector(".plans_swither_active");
document
  .querySelector("[data-switcher]")
  .children[0].addEventListener("click", () => {
    activeElement.style.transform = "translateX(-100%)";

    pricePeriod = "monthly";
    countPrice();
  });
document
  .querySelector("[data-switcher]")
  .children[1].addEventListener("click", () => {
    activeElement.style.transform = "translateX(0%)";

    pricePeriod = "quarterly";
    countPrice();
  });

document.querySelectorAll(".switcher").forEach((switcher) => {
  switcher.addEventListener("click", () => {
    switcher.querySelector(".head-switcher").classList.toggle("is-active");
    countPrice();
  });
});

function countPrice() {
  const isActive = document.querySelector("[data-cat] .is-active") !== null;
  const isLabelActive =
    document.querySelector("[data-label] .is-active") !== null;
  const priceMultipliers = {
    monthly: 1.15,
    quarterly: 1,
    inactive: 1.2,
    label: 1.1,
  };

  document.querySelectorAll("[data-price]").forEach((element, index) => {
    let finalPrice = prices[index];

    finalPrice *=
      pricePeriod === "monthly"
        ? priceMultipliers.monthly
        : priceMultipliers.quarterly;
    finalPrice *= !isActive ? priceMultipliers.inactive : 1;
    finalPrice *= isLabelActive ? priceMultipliers.label : 1;

    const formattedPrice = finalPrice
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    element.textContent = formattedPrice;
  });
}

//#endregion PRICES

//#region FAQ

// Function to toggle dropdown that can be called from anywhere
function toggleDropdown(dropdownIndex) {
  const items = document.querySelectorAll(".answer_item");
  if (items.length === 0 || dropdownIndex >= items.length) return;
  
  const item = items[dropdownIndex];
  const dropElement = item.querySelector(".answer_drop");
  
  // Close all other dropdowns first
  document.querySelectorAll(".answer_drop.is-active").forEach((drop) => {
    if (drop !== dropElement) {
      drop.classList.remove("is-active");
      gsap.to(drop, {
        height: 0,
        duration: 0.3,
      });
    }
  });

  // Toggle clicked dropdown
  dropElement.classList.toggle("is-active");
  gsap.to(dropElement, {
    height: dropElement.classList.contains("is-active") ? "auto" : 0,
    duration: 0.3,
  });
}

// Add click event listeners to each dropdown item
document.querySelectorAll(".answer_item").forEach((item, index) => {
  item.addEventListener("click", () => {
    toggleDropdown(index);
  });
});

gsap.set(".answer_drop", { height: 0 });

// Open the first dropdown by default
const firstDropElement = document.querySelector(".answer_item .answer_drop");
if (firstDropElement) {
  firstDropElement.classList.add("is-active");
  console.log(firstDropElement);
  gsap.set(firstDropElement, {
    height: "auto",
    onComplete: () => {
      console.log("complete");
    },
  });
}

//#endregion FAQ__________________________________________________________________________________________________________

// Инициализация медиа-запросов однократно
function initMediaQueries() {
  mm.revert(); // Очистка предыдущих медиа-запросов





  mm.add("(min-width: 480px)", () => {
    initDesktopAnimations();
    console.log("initDesktopAnimations");
    // window.addEventListener('load', () => {
    //   distanceFromTop = logo.getBoundingClientRect().bottom + window.scrollY;
    //   // console.log(distanceFromTop);
    //   // flamesBox.style.height = `${distanceFromTop}px`;
    //   gsap.set(flamesBox, { height: `${distanceFromTop}px` });
    // });
  
    return () => {
      /* cleanup function */
    };
  });

  mm.add("(max-width: 479px)", () => {
    initMobileAnimations();
    return () => {
      /* cleanup function */
      mobileSwiper.destroy();
      processTrack.classList.remove("swiper-wrapper");
      processCards.forEach((card) => {
        card.classList.remove("swiper-slide");
      });
    };
  });
}

initMediaQueries();

// Инициализируем медиа-запросы при загрузке


// Обработчик изменения размера окна только для десктопа
let resizeTimeout;
window.addEventListener('resize', () => {
  // Проверяем, что ширина окна соответствует десктопу (≥ 480px)
  if (window.innerWidth >= 480) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('Resizing on desktop - reinitializing animations');
      initMediaQueries();
    }, 250);
  }
});

// Событие срабатывает когда Lottie анимация полностью загружена
fireAnimation.addEventListener('DOMLoaded', () => {
  // Ваш код здесь
  fireLastStepHeight = Math.min(flames.offsetHeight + flamesMarginBottomValue, window.innerHeight - document.querySelector('.footer').offsetHeight)
  initMediaQueries();
});

