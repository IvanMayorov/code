// // Function to animate fire images in sequence without GSAP (looped animation)
// function animateFireImages() {
//   // Get all fire images
//   const fireImages = document.querySelectorAll('.fire_img');
//   console.log(fireImages);
//   // If no images found, exit the function
//   if (!fireImages.length) return;
  
//   // Hide all images initially
//   fireImages.forEach(img => {
//     img.style.display = 'none';
//   });
  
//   // Calculate time per image (total 4 seconds divided by number of images)
//   const timePerImage = 4000 / fireImages.length; // in milliseconds
  
//   let currentIndex = 0;
  
//   // Function to show the next image
//   function showNextImage() {
//     // Hide all images
//     fireImages.forEach(img => {
//       img.style.display = 'none';
//     });
    
//     // Show current image
//     fireImages[currentIndex].style.display = 'block';
    
//     // Update index for next iteration (loop through images)
//     currentIndex = (currentIndex + 1) % fireImages.length;
    
//     // Schedule next image (continuous loop)
//     setTimeout(showNextImage, timePerImage);
//   }
  
//   // Start the animation loop
//   showNextImage();
// }

// // Run the looped animation when the document is ready
// document.addEventListener('DOMContentLoaded', animateFireImages);


// const options = {
//   frames: 19,
//   src:    {
//     tarURL:   'https://ivanmayorov.github.io/code/fire.tar',
//     imageURL: (index) => `${index}-min.svg`,
//   },
//   clearCanvas: true,
//   // showDebugInfo: true,

//   loop: true,  
//   objectFit: 'cover',
// };

// const sequence = new FastImageSequence(document.querySelector('.flames'), options);
function addWillChange(targets, props = ['transform']) {
  gsap.utils.toArray(targets).forEach(el => {
    el.style.willChange = props.join(', ');
  });
}

function removeWillChange(targets) {
  gsap.utils.toArray(targets).forEach(el => {
    el.style.willChange = '';
  });
}

// Initialize Lenis only on desktop (width >= 480px)
let lenis = null;

if (window.innerWidth >= 480) {
  // Initialize a new Lenis instance for smooth scrolling
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
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
}

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// gsap.registerPlugin(ScrollSmoother) 

// ScrollSmoother.create({
//   smooth: 1.5,
//   effects: true,
// });

const remSize = parseFloat(
  getComputedStyle(document.documentElement).fontSize
);
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
      audio = new Audio("https://res.cloudinary.com/do7m7foqv/video/upload/v1750862291/Punchy_Fashion_Groove_Loop-2_m3aoub.mp3");
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
const benefitsSection = document.querySelector(".benefits_section");
const mask = document.querySelector(".main_mask");
const mobileMask = document.querySelector(".mobile_mask");
const navLinksBox = document.querySelector(".nav_links_box");
const flames = document.querySelector(".flames");
const footer = document.querySelector(".footer");
const plansWrap = document.querySelector(".plans_wrap");

const manifestSection = document.querySelector(".mnfst_section");
const servicesSection = document.querySelector(".services_section");
const processSection = document.querySelector(".process_section");
const processTrack = document.querySelector(".process_track");
const projectsSection = document.querySelector(".projects_section");
const boardSection = document.querySelector(".board_section");


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
const jokeCard = document.querySelector("[data-joke-card]");
const jokeInitial = document.querySelector(".joke_initial");
const jokeFinal = document.querySelector(".joke_box");
const jokeFinalImg = document.querySelector(".joke_final")
const fires = document.querySelectorAll("[data-fire]");
let isFirstClick = true;
let clickCount = 0;

jokeCard.addEventListener("click", () => {
  clickCount++;
  
  if (isFirstClick) {
    // First click: Change the button text
    jokeButton.querySelector("div").textContent = "seriously, don't touch it";
    isFirstClick = false;
  } else if (clickCount === 2) {
    // Second click: Show "please stop"
    jokeButton.querySelector("div").textContent = "please stop";
  } else if (clickCount === 3) {
    // Third click: Show 10 spaces
    jokeButton.querySelector("div").textContent = " ";
    fires.forEach(fire => {
      fire.style.display = "block";
    });
    jokeButton.classList.add("is-no-hover");
    jokeInitial.querySelector(".process_img").style.display = "none";
  } else if (clickCount === 4) {
    // Fourth click: Hide the button
    jokeButton.style.display = "none";
    jokeInitial.style.display = "none";
    jokeFinal.style.display = "block";
    jokeFinalImg.style.display = "block";
    fires.forEach(fire => {
      fire.style.display = "none";
    });
  }
});

let fireLastStepHeight ;

//Fire
const fireAnimation = lottie.loadAnimation({
  container: document.querySelector(".flames"),
  renderer: "canvas",
  loop: true,
  autoplay: true,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/6851a5a63a4abe0654cc6de0_fire-optimized.json",

});
fireAnimation.setSpeed(1.5);




//Hero
lottie.loadAnimation({
  container: document.querySelector(".hero_lottie"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: window.innerWidth <= 479 
    ? "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/6866b27b6bafcde2d7f86c0c_Up%20to%20no%20good%20Mobile-S6Vy3.json"
    : "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67de76d3c963e2fea84cfb4f_main-EUmoj.json",
});



//Benefits
const benefitsLottie = lottie.loadAnimation({
  container: document.querySelector(".traditional-h2-image"), // Make sure this element exists
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/67de874bff0309089a98e25b_scratch-qddRu.json", // Update with your actual JSON path
});

const comingSoon = lottie.loadAnimation({
  container: document.querySelector(".board_coming"), // Make sure this element exists
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/685e94ae3ee655e469776d0b_coming-wJCLU.json", // Update with your actual JSON path
});

//Benefits Label
const benefitsLabel = lottie.loadAnimation({
  container: document.querySelector(".benefits_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/68146f194dd86b56fbde0eaf_benefits_label-FQvG1.json",
});

//Manifest Label
const manifestLabel = lottie.loadAnimation({
  container: document.querySelector(".manifest_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/681477fe3163f4f6126f0cb8_manifest_label-Pxk2x.json",
});

//Services Label
const servicesLabel = lottie.loadAnimation({
  container: document.querySelector(".services_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/68148608064b80892684b202_services_label-xVIqh.json",
});

//Process Label
const processLabel = lottie.loadAnimation({
  container: document.querySelector(".process_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/681cbb16001b784d7d8f4201_process_label-sk1PM.json",
});

//Projects Label
const projectsLabel = lottie.loadAnimation({
  container: document.querySelector(".projects_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/682223822306064bb407a26d_projects-jNY2o.json",
});

//Plans Label
const plansLabel = lottie.loadAnimation({
  container: document.querySelector(".plans_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/68222382f75c06e8c882a8c8_plans-SRaVI.json",
});

//Answers Label
const answersLabel = lottie.loadAnimation({
  container: document.querySelector(".answers_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/682223829c40e640b2942c8f_answers-jiNP1.json",
});

//Pinboard Label
const pinboardLabel = lottie.loadAnimation({
  container: document.querySelector(".pinboard_label"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "https://cdn.prod.website-files.com/6762d7172f3ea79ecef9e911/68222382aac5f71fa2951fde_pinboard-Gbj7A.json",
});

// Group all label animations for easier management
const labelAnimations = {
  benefits: benefitsLabel,
  manifest: manifestLabel,
  services: servicesLabel,
  process: processLabel,
  projects: projectsLabel,
  plans: plansLabel,
  answers: answersLabel,
  pinboard: pinboardLabel,
};

// Function to play a specific label animation
function playLabelAnimation(labelName, speed = 1, direction = 1) {
  const animation = labelAnimations[labelName];
  if (animation) {
    animation.setSpeed(speed);
    animation.setDirection(direction);
    animation.play();

  }
  // Update the active navigation link based on the label name
  const labelToSelectorMap = {
    benefits: 1,
    manifest: 2,
    services: 3,
    process: 4,
    projects: 5,
    plans: 6,
    answers: 7,
    pinboard: 8
  };
  
  // Get the selector number from the label name and update the navigation
  const selectorNumber = labelToSelectorMap[labelName];
  if (selectorNumber) {
    updateActiveNavLink(selectorNumber);
  }
}

// Function to update active navigation link
function updateActiveNavLink(selector) {
  // Remove 'is-active' class from all navigation links
  document.querySelectorAll(`.nav_links_box a`).forEach((link) => {
    link.classList.remove("is-active");
  });
  
  // Add 'is-active' class to the specified navigation link
  const navLink = document.querySelector(
    `.nav_links_box a:nth-of-type(${selector})`
  );
  
  if (navLink) {
    navLink.classList.add("is-active");
  }
}


function backAllLabelAnimation() {
  // Loop through all animations in the labelAnimations object
  Object.values(labelAnimations).forEach(animation => {
    if (animation) {
      animation.setSpeed(3);
      animation.setDirection(-1);
      // Play the animation
      animation.play();
    }
  });
}






//Scratches
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
  

  
  const footerHeight = footer.offsetHeight;
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

  const animateMenu = (selector) => {
    const navLink = document.querySelector(
      `.nav_links_box a:nth-of-type(${selector})`
    );

    if (navLink) {
      document.querySelectorAll(`.nav_links_box a`).forEach((link) => {
        link.classList.remove("is-active");
      });
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

  // function updateTitle(selector, progress, direction, threshold = 0.5) {
  //   const action =
  //     progress > threshold === (direction === "in")
  //       ? animateLabelIn
  //       : animateLabelOut;
  //   action(selector);
  // }

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
  // #region Timeline
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scrub: true,
      end: getSectionPosition(9),
      onRefresh: () => {
        backAllLabelAnimation();
      },
      // markers: true
      // onUpdate: self => {
      //   const currentTime = tl.time();
      //   const labels = tl.labels;
      //   let activeLabel = null;
  
      //   for (let label in labels) {
      //     if (currentTime >= labels[label]) {
      //       activeLabel = label;
      //     }
      //   }
  
      //   console.log("Текущий активный label:", activeLabel);
      // }
    },
  });

  distanceFromTop = logo.getBoundingClientRect().bottom + window.scrollY;
  distanceFromTopFooter = footerLogo.getBoundingClientRect().bottom + window.scrollY;
  // console.log(distanceFromTop);
  gsap.set(flamesBox, { height: `${distanceFromTop}px` });

  tl.addLabel("hero")
 
  tl.to(".track", {
    x: -getSectionPosition(1),
    ease: "none",
    duration: 1,
    onUpdate() {
      // updateTitle("1", this.progress(), "in");

    const progress = this.progress();
    if (progress > 0.5 ) {
      playLabelAnimation('benefits');
      benefitsLottie.play();
    } else {
      backAllLabelAnimation();
      updateActiveNavLink(0);
    }
    },
  })
//   .add(() => {
//     backAllLabelAnimation();
// }, "-=0.6")
//   .add(() => {
//       benefitsLabel.setSpeed(1);
//       benefitsLabel.setDirection(1);
//       benefitsLabel.play();
//   }, "-=0.5")
//   .add(() => {
//     backAllLabelAnimation();
// }, "+=0.8")
    .to(
      ".flames_box",
      {
        height: document.querySelector('.lottie_labels').offsetHeight,
        ease: "none",
        duration: 0.5,
        onComplete: () => {
          progress = 1;
        },
        onReverseComplete: () => {
          progress = 0;
          console.log('onReverseComplete');
        },
      },
      0.1
    )
    .addLabel("benefits")

    // Add Lottie animation for benefits section
    // .add(() => {
    //   // Create a new Lottie animation when we reach the benefits section
    //   benefitsLottie.play();
    // }, "benefits")
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
        // updateTitle("1", p, "out");
        // updateTitle("2", p, "in");
        if (this.progress() > 0.5) {
          playLabelAnimation('manifest');
        } else {
          backAllLabelAnimation();
        }
        if (this.progress() < 0.3) {
          playLabelAnimation('benefits');
        } 
      },
    })
    .addLabel("manifest")
    .to(".track", {
      x: -getSectionPosition(3),
      ease: "none",
      duration: 3,
      onUpdate() {
        // const p = this.progress();
        // updateTitle("2", p, "out", 0.8);
        // updateTitle("3", p, "in", 0.9);
        if (this.progress() > 0.9) {
          playLabelAnimation('services');
        } else {
          backAllLabelAnimation();
        }
        if (this.progress() < 0.8) {
          playLabelAnimation('manifest');
        }

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
        if (p > 0.9) {
          playLabelAnimation('process');
          
        } else {
          backAllLabelAnimation();
        }
        if (p < 0.8) {
          playLabelAnimation('services');
        }
        if (p > 0.5) {
          scratchLottie.play();
        }

      },
    })
    .addLabel("process")

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
        if (p > 0.5) {
          playLabelAnimation('projects');
        } else {
          backAllLabelAnimation();
        }
        if (p < 0.4) {
          playLabelAnimation('process');
        }
      }
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
        if (p > 0.5) {
          playLabelAnimation('plans');
        } else {
          backAllLabelAnimation();
        }
        if (p < 0.4) {
          playLabelAnimation('projects');
        }
      }
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
        if (p > 0.5) {
          playLabelAnimation('answers');
        } else {
          backAllLabelAnimation();
        }
        if (p < 0.4) {
          playLabelAnimation('plans');
        }
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
      duration: 2,
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
        if (p > 0.5) {
          playLabelAnimation('pinboard');
        } else {
          backAllLabelAnimation();
        }
        if (p < 0.4) {
          playLabelAnimation('answers');
        }
      },
    })
    .addLabel("board")
    .to(".track", {
      x: -(getSectionPosition(9) - firstSection.offsetWidth),
      ease: "none",
      duration: 2,
      onStart: () => {
        comingSoon.play();
      },
    })
    // .to(".navbar, .footer, .main_mask, .nav_links_box", {
    //   y: -footerHeight,
    //   ease: "none",
    //   duration: 0.5,
 
          
    //     })
    // .add(() => {
    //   flamesBox.style.maxHeight = `${flames.offsetHeight * 0.7}px`;
    // }, "<")

    
    .addLabel("contacts")
 
    

  const flamesTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      // markers: true
    }
  });

  flamesTimeline
    .to(".flames_box", {
      height: fireLastStepHeight,
      ease: "none",
      duration: 0.5,
      immediateRender: false,
      onStart: () => {
        backAllLabelAnimation();
      },
      onReverseComplete: () => {
        playLabelAnimation('pinboard');
      }
    })
    .to(navLogo, { 
      opacity: 1, 
      duration: 0.3 
    }, "<0.1");
  
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
      
      // If contacts section, scroll to footer
      if (sections[index] === "contacts") {
        gsap.to(window, {
          scrollTo: ".footer",
          duration: 1,
        });
      } else {
        gsap.to(window, {
          scrollTo: tl.scrollTrigger.labelToScroll(sections[index]),
          duration: 1,
        });
      }
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
      const matchingLottie = lottieAnimationsServices.find(anim => anim.rowIndex === i);
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


function initMobileAnimations() {


  // При клике на элемент с data-link="plans" скроллим к .plans_section
  document.querySelectorAll('[data-link="plans"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: {
          y: ".plans_section",
          offsetY: 0
        },
        duration: 1,
        ease: "power2.inOut"
      });
    });
  });
  // alert('mobile');

  // Сбросить все ScrollTrigger
  ScrollTrigger.refresh();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Пересоздаем медиа-запросы
  mm.revert(); // Отменить предыдущие медиа-запросы

  // весь код для мобильных
  const bigtitleRows = document.querySelectorAll(".bigtitle_row");

  //SWIPERS_
  // const processTrack = document.querySelector(".process_track");
  // const processCards = document.querySelectorAll(".process_card");

  // const planSlider = document.querySelector(".plans_slider");
  // const plansSlides = document.querySelectorAll(".plans_slider > *");

  const benefitsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: benefitsSection,
      start: "top 10%",
      end: "bottom 70%",
      scrub: true,
      // markers: true,
    }
  });

benefitsTimeline
  .add(() => {
    addWillChange([
      '.benefits_title_box',
      '.benefits_card',
      '.benefits_square_wrap',
      '.benefits_descr'
    ]);
    benefitsLottie.play();
  })
  .to(".benefits_title_box", 
    { x: "-30rem", duration: 1, ease: "none" },
  )
  .to(".benefits_card", 
    { x: "0", duration: 1, ease: "none", onComplete: () => {
        // gsap.to(".benefits_card[data-right]", 
        //   { opacity: 0, duration: 0.1}
        // )
    } }, '<0.5'
  )

  .to(".benefits_square_wrap", 
    { x: "-29.2rem", duration: 1, ease: "none", onComplete: () => {
        // gsap.to(".benefits_square_wrap[data-left]", 
        //   { opacity: 0, duration: 0.1}
        // )
    } 
  }, '<0.5'
  )

  .to(".benefits_descr", 
    { x: "0.5rem", duration: 1, ease: "none" }, '<0.5'
  )
  .add(() => {
    removeWillChange([
      '.benefits_title_box',
      '.benefits_card',
      '.benefits_square_wrap',
      '.benefits_descr'
    ]);
  });

  const plansSlider = document.querySelector(".plans_slider");
  const plansSliderChildren = plansSlider.children;
  
  // Calculate total width of all children including margins
  const plansSliderWidth = Array.from(plansSliderChildren).reduce((total, child) => {
    const computedStyle = window.getComputedStyle(child);
    const marginLeft = parseInt(computedStyle.marginLeft) || 0;
    const marginRight = parseInt(computedStyle.marginRight) || 0;
    return total + child.offsetWidth + marginLeft + marginRight;
  }, 0);
  
  // Calculate the shift distance (total children width minus slider width)
  const shiftDistance = plansSliderWidth - plansSlider.offsetWidth;
  
  gsap.to(plansSlider, {
    x: -shiftDistance,
    ease: "none",
    duration: 1,
    scrollTrigger: {
      trigger: plansWrap,
      start: "top top",
      end: "90% bottom",
      scrub: true,
      // markers: true, 
    },
  });


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

  // #region Swipers
  // processTrack.classList.add("swiper-wrapper");
  // planSlider.classList.add("swiper-wrapper");

  // function addSwiperSlideClass(cards) {
  //   cards.forEach((card) => {
  //     card.classList.add("swiper-slide");
  //   });
  // }

  // addSwiperSlideClass(processCards);
  // addSwiperSlideClass(plansSlides);

  // mobileSwiper = new Swiper(".process_right_col", {
  //   spaceBetween: 10,
  // });
  // plansSlider = new Swiper(".plans_section", {
  //   // spaceBetween: 10,
  //   slidesPerView: "auto",
  // });



  // #region Process ___________________________________________________________________________________________________________



  const processLeftCol = document.querySelector(".process_left_col");
  const processRightBox = document.querySelector(".process_right_box");
  const processCards = document.querySelectorAll(".process_card");

  gsap.set(processRightBox, {
    opacity: 0,
  });

  gsap.to(processSection, {
    scrollTrigger: {
      trigger: processSection,
      start: "top 10%",
      end: "bottom 10%",
      // markers: true,
      onEnter: () => {
        scratchLottie.play();
      },
    }
  });
  const processTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: processSection,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    }
  });

  processCards.forEach((card, index) => {
    const cardWidth = card.offsetWidth;
    const shift = -cardWidth - 1.5 * remSize;
    processTimeline.to(card, {
      x: shift,
      duration: 0.2,
      ease: "none",
    }, index * 0.2);
  });
  processTimeline.to(processLeftCol, {
    opacity: 0,
    duration: 0,
  }, "<0.1");
  processTimeline.to(processRightBox, {
    opacity: 1,
    duration: 0,
  }, "<");
  processTimeline.to(processTrack, {
    x: "-100vw",
    duration: 0.2,
    ease: "none",
  }, );

  // #endregion


  // Flames scroll animation

  if (flames) {
    gsap.to(flamesBox, {
      height: 40,
      duration: 0.3,
      scrollTrigger: {
        trigger: ".main_section", // Assuming this is the main container
        start: "top top",
        end: "70% top",
        toggleActions: "play none none reverse",
        scrub: true,
        // markers: true,

      }
    });
  }

  const bigtitleRowsArr = Array.from(bigtitleRows);

  bigtitleRowsArr.forEach((row, idx) => {
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
          onEnter: () => {
            row.classList.add("is-hovered");
            const matchingLottie = lottieAnimationsServices.find(anim => anim.rowIndex === idx);
            if (matchingLottie && matchingLottie.animation) {
              matchingLottie.animation.play(0);
            }
          },
          onLeaveBack: () => {
            row.classList.remove("is-hovered");
          },
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
      end: "bottom 100%",
      scrub: true,
      // markers: true,
      onUpdate: self => {
        // self.progress — это число от 0 до 1
        if (self.progress >= 0.1) {
          comingSoon.play();
        }

      }
    },
  });

  // Create ScrollTrigger for each section in .track to show corresponding image in .section_title_box
  document.querySelectorAll(".track > div").forEach((section, index) => {
    // Adjust index to start showing images from the second section
    // For the second section (index 1), show the first image (index 0)
    const imageIndex = index > 0 ? index - 1 : null;
    const labelNames = ['benefits', 'manifest', 'services', 'process', 'projects', 'plans', 'answers', 'pinboard'];

    // Skip the first section
    if (imageIndex === null) return;
    // // Get the corresponding image in the section_title_box
    // const sectionImage = document.querySelector(
    //   `.section_title_box img:nth-child(${imageIndex + 1})`
    // );

   
      // gsap.set(sectionImage, { yPercent: -150 });

      // Create ScrollTrigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Show the corresponding image
          // gsap.to(sectionImage, { yPercent: 0, duration: 0.3 });
         
          
          
            playLabelAnimation(labelNames[index - 1]);
          
          
        },
        onLeave: () => {
          backAllLabelAnimation();
          // Hide the image when leaving the section
          // gsap.to(sectionImage, { yPercent: -150, duration: 0.3 });
        },
        onEnterBack: () => {
          // Show the image when scrolling back up
          
            playLabelAnimation(labelNames[index - 1]);
          
          // gsap.to(sectionImage, { yPercent: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          // Hide the image when scrolling back up past the section
          backAllLabelAnimation();
          // gsap.to(sectionImage, { yPercent: -150, duration: 0.3 });
        },
      });
    
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

// #region ANSWERS

ScrollTrigger.create({
  trigger: ".answers_section",
  start: "top center",
  end: "80% center",
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
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
});
// ... existing code ...


  
  // #region FOOTER

  
 
  
// gsap.to([mobileMask, document.querySelector('.navbar'), navLinksBox], {
//   y: -footer.offsetHeight,
//   ease: "none",
//   scrollTrigger: {
//     trigger: footer,
//     start: "top bottom",
//     end: "bottom bottom",
//     scrub: 1,
//   }
// });

gsap.to(".flames_box", {
  height: '18rem',

  scrollTrigger: {
    trigger: footer,
    start: "top 50%",
    end: "bottom bottom",
    scrub: 1,
    immediateRender: false,
    // onUpdate: (self) => {
    // const mobileFooterLogo = document.querySelector('.mobile_footer_logo');
    // if (mobileFooterLogo) {
    //   const rect = mobileFooterLogo.getBoundingClientRect();
    //   const distanceFromTop = rect.top;
      
    //   if (distanceFromTop < 16 * 16) { 
    //     gsap.to('.flames_box', { height: '10rem', overwrite: true });
    //   }
    // }
    // },
    // markers: true
  }
});
gsap.to(".nav_links_box", {
  y: '-100%',

  scrollTrigger: {
    trigger: footer,
    start: "top bottom",
    end: "bottom bottom",
    scrub: 1,
    immediateRender: false,
  }
});

// gsap.to(".flames_box", {
//   y: '-60%',

//   scrollTrigger: {
//     trigger: footer,
//     start: "60% 70%",
//     end: "bottom bottom",
//     scrub: 1,
//     // markers: true
//   }
// });

// window.visualViewport.addEventListener('resize', () => {
//   const height = window.visualViewport.height;
//   const rect = footer.getBoundingClientRect();
//   const isFooterVisible = rect.top < window.innerHeight && rect.bottom > 0;

//   if (isFooterVisible) {
//     console.log('Footer видим. Высота visualViewport:', height);
//   }
// });

// #endregion
} 




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

const navLinks = gsap.utils.toArray(".nav_links_box a");
const burger = document.querySelector(".burger_button");
const burgerLine = document.querySelectorAll(".burger_line");
let isOpen = false; // Track the state of the menu

gsap.set(navLinks, { xPercent: 50, autoAlpha: 0 });
gsap.set(navLinksBox, { pointerEvents: "none" });



// Get the computed style of the flames element to find its margin-bottom
const flamesStyle = window.getComputedStyle(flames);
// Extract the last value from the transform matrix
const flamesMarginBottom = flamesStyle.transform;
// Parse the matrix to get the last value (vertical translation)
const flamesTranslateY = flamesStyle.transform.match(/matrix\([^)]+\)/)?.[0]
  .split(',')
  .map(val => parseFloat(val.trim()))
  .pop() || 0;


// Alternative way to get the margin-bottom value
const flamesMarginBottomValue = parseInt(flamesTranslateY, 10);

fireLastStepHeight = Math.min(flames.offsetHeight + flamesMarginBottomValue, window.innerHeight - document.querySelector('.footer').offsetHeight, 47 * remSize)






function openMenu() {
  burger.querySelectorAll('*').forEach(child => {
    child.classList.add('w-variant-baa24fab-48d3-0f32-ef2a-7d7ee7f824f7');
  });
  if (window.innerWidth > 479) {
    gsap.to(flamesBox, {
      height: 0,
      duration: 0.5,
      // overwrite: true,
    });
  }


  const newWidth = `calc(100% - ${navLinksBox.offsetWidth}px)`;

  

  // Простая проверка ширины экрана
  if (window.innerWidth >= 480) {
    // Код для десктопа

    gsap.to(mask, { width: newWidth, duration: 0.5 });
  } else {
    // Код для мобильных
    mobileMask.classList.add("is-opened");

  }

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
  burger.querySelectorAll('*').forEach(child => {
    child.classList.remove('w-variant-baa24fab-48d3-0f32-ef2a-7d7ee7f824f7');
  });
  
  if (window.innerWidth > 479) {
    if (progress === 0) {
      gsap.to(flamesBox, {
        height: distanceFromTop,
        duration: 0.5,
      });
    } else {
      gsap.to(flamesBox, {
        height: document.querySelector('.lottie_labels').offsetHeight,
        duration: 0.5,
      });
      console.log('closeMenu 2');
    }
  }
  const newWidth = "100%";

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

const pricesTable = {
  monthly: {
    normal:     [5200, 10400, 20800],
    cat:        [4200, 8400, 16800],
    white:      [5700, 11400, 22800],
    white_cat:  [4700, 9400, 18800]
  },
  quarterly: {
    normal:     [4400, 8800, 17600],
    cat:        [3500, 7000, 14000],
    white:      [4800, 9600, 19200],
    white_cat:  [4000, 8000, 16000]
  }
};

const activeElement = document.querySelector(".plans_swither_active");
const yearDescr = document.querySelectorAll(".plans_price_descr");
document
  .querySelector("[data-switcher]")
  .children[0].addEventListener("click", () => {
    activeElement.style.transform = "translateX(-100%)";
    pricePeriod = "monthly";
    countPrice();
    yearDescr.forEach(descr => descr.style.display = "none");
    document.querySelector("[data-switcher]").children[0].classList.add("is-active");
    document.querySelector("[data-switcher]").children[1].classList.remove("is-active");
    
  });
document
  .querySelector("[data-switcher]")
  .children[1].addEventListener("click", () => {
    activeElement.style.transform = "translateX(0%)";
    pricePeriod = "quarterly";
    countPrice();
    yearDescr.forEach(descr => descr.style.display = "block");
    document.querySelector("[data-switcher]").children[0].classList.remove("is-active");
    document.querySelector("[data-switcher]").children[1].classList.add("is-active");
  });

document.querySelectorAll("[data-price-toggle]").forEach((switcher) => {
  switcher.addEventListener("click", () => {
    switcher.querySelector(".head-switcher").classList.toggle("is-active");
    const switcherImages = switcher.querySelectorAll('.plans_swither_img');
    const activeImage = switcher.querySelector('.plans_swither_img.is-active');
    
    if (activeImage) {
      activeImage.classList.remove('is-active');
    }
    
    if (switcher.querySelector('.head-switcher').classList.contains('is-active')) {
      // Show second image when active
      if (switcherImages[1]) {
        switcherImages[1].classList.add('is-active');
      }
    } else {
      // Show first image when not active
      if (switcherImages[0]) {
        switcherImages[0].classList.add('is-active');
      }
    }
    countPrice();
  });
});

function countPrice() {
  // Определяем выбранный тип пакета
  let type = 'normal';
  if (document.querySelector("[data-cat] .is-active")) type = 'cat';
  if (document.querySelector("[data-label] .is-active")) type = 'white';
  if (document.querySelector("[data-cat] .is-active") && document.querySelector("[data-label] .is-active")) type = 'white_cat';

  // Берём нужный массив цен
  const prices = pricesTable[pricePeriod][type];

  // Вставляем значения в соответствующие элементы
  document.querySelectorAll("[data-price]").forEach((element, index) => {
    element.textContent = prices[index].toLocaleString();
  });

  document.querySelectorAll("[data-bundle]").forEach((element, index) => {
    element.textContent = (prices[index] * 3).toLocaleString();
  });
}

countPrice()
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

// document.querySelectorAll(".answer_item").forEach((item, index) => {
//   item.addEventListener("click", () => {
//     toggleDropdown(index);
//   });
// });

gsap.set(".answer_drop", { height: 0 });

// Open the first dropdown by default
const firstDropElement = document.querySelector(".answer_item .answer_drop");
if (firstDropElement) {
  firstDropElement.classList.add("is-active");
  gsap.set(firstDropElement, {
    height: "auto",
  });
}

//#endregion FAQ__________________________________________________________________________________________________________

// Инициализация медиа-запросов однократно
function initMediaQueries() {
  mm.revert(); // Очистка предыдущих медиа-запросов





  mm.add("(min-width: 480px)", () => {
    initDesktopAnimations();
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
// // Событие срабатывает когда Lottie анимация полностью загружена
// fireAnimation.addEventListener('DOMLoaded', () => {
//   // Ваш код здесь
//   fireLastStepHeight = Math.min(flames.offsetHeight + flamesMarginBottomValue, window.innerHeight - document.querySelector('.footer').offsetHeight, 47 * remSize)
//   initMediaQueries();
// });

