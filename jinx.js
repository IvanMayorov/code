gsap.registerPlugin(ScrollTrigger);


function initGsap() {

const firstSection = document.querySelector('.main_section');
const benefitsSection = document.querySelector('.benefits_section');
const manifestSection = document.querySelector('.mnfst_section');
const servicesSection = document.querySelector('.services_section');
const processSection = document.querySelector('.process_section');
const projectsSection = document.querySelector('.projects_section');
const boardSection = document.querySelector('.board_section');
const footerHeight = document.querySelector('.footer').offsetHeight ;
const servicesSectionHeight = document.querySelector('.services_section .bigtitle_row')?.offsetHeight || 0;
const projectsSectionHeight = document.querySelector('.projects_section .bigtitle_row')?.offsetHeight || 0;

const navLinksBox = document.querySelector('.nav_links_box');
const navLinks = document.querySelectorAll('.nav_links_box a');

const navLogo = document.querySelector('.nav_logo');
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

gsap.set('.bigtitle_wrap', { opacity: 0 });
gsap.set('.section_title_box *', { yPercent: -150 });
gsap.set('.answer_drop', { height: 0 });

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

let tl = gsap.timeline({
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
.to('.track', {
  x: -getSectionPosition(5),
  ease: "none",
  duration: 2,
  onUpdate() {
    const p = this.progress();
    updateTitle('4', p, 'out', 0.8);
    updateTitle('5', p, 'in', 0.9);
  }
})

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
  y: - footerHeight,
  ease: "none",
  duration: 0.5,

})
.addLabel('contacts')
.to(navLogo, { opacity: 1, duration: 0.3 }, "<0.1");


const swiper = new Swiper('.news_slider_wrap', {
  // Optional parameters
  loop: true,
  navigation: {
    nextEl: '.is-next',
    prevEl: '.is-prev',
  },

});

// Intersection Observer________________________________________________________________________________________


// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Create thresholds from 0 to 1 in increments of 0.01
// };

// const observerCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const visibilityPercentage = Math.round(entry.intersectionRatio * 100);
//       console.log(visibilityPercentage);
//       if (visibilityPercentage > 50) {
//         animateLabelIn('.label:nth-of-type(1)');
//       }
//       else {
//         animateLabelOut('.label:nth-of-type(1)');
//       }
//     }
//   });
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);

// if (manifestSection) {
//   observer.observe(manifestSection);
// }


const burger = document.querySelector('.burger_button');
const mask = document.querySelector('.main_mask');
const burgerLine = document.querySelectorAll('.burger_line');
let isOpen = false; // Track the state of the menu

gsap.set(navLinksBox, {autoAlpha: 0});
gsap.set(navLinks, {x: '50%', opacity: 0});
const cookieTextWrap = document.querySelector('.cookie_text_wrap');

const navMenuBackground = document.querySelector('.nav_menu_background');
const navMenuButton = document.querySelector('.nav_menu_button');
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

burger.addEventListener('mouseenter', () => {
  
  gsap.to(navMenuBackground, { width: `7rem`, transform: `translateX(${navMenuButtonWidth}px)`, duration: 0.3, overwrite: true });
});
burger.addEventListener('mouseleave', () => {
 
  gsap.to(navMenuBackground, { width: navMenuButtonWidth, transform: 'translateX(0)', duration: 0.3, overwrite: true });
});

burger.addEventListener('click', () => {
  
  const newWidth = isOpen ? '100%' : `calc(100% - ${navLinksBox.offsetWidth}px)`;
  const newRotation0 = isOpen ? 0 : 45;
  const newRotation1 = isOpen ? 0 : -45;
  const newY0 = isOpen ? '0rem' : '0.8rem';
  const newY1 = isOpen ? '0rem' : '-0.8rem';
  const newOpacity = isOpen ? 0 : 1;
  // const newX = isOpen ? '50%' : '0%';
  gsap.to(mask, { width: newWidth, duration: 0.5 });
  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });
  gsap.to(navLinksBox, {autoAlpha: newOpacity, duration: 0.3});
  if (!isOpen) {
    gsap.to(navLinks, {x: '0%', delay: 0.2, duration: 0.3, stagger: 0.04, opacity: 1, ease: 'power1.inOut'});
  }
  else {
    gsap.to(navLinks, {x: '50%', duration: 0.3, opacity: 0, ease: 'power1.inOut'});
  }

  isOpen = !isOpen; // Toggle the state
});


navLinks.forEach((link, index) => {
  const sections = ["benefits", "manifest", "services", "process", "projects", "plans", "answers", "board", "contacts"];
  link.addEventListener('click', () => {
    gsap.to(window, {scrollTo: tl.scrollTrigger.labelToScroll(sections[index]), duration: 0.5});
  });
});




}





window.addEventListener('resize', () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  initGsap();
});


var Webflow = Webflow || [];
Webflow.push(function(){
  initGsap();
}); 


let pricePeriod = 'quarterly';
const initialTrial = parseInt(document.querySelectorAll('[data-price]')[0].textContent.replace(',', ''));
const initialSingle = parseInt(document.querySelectorAll('[data-price]')[1].textContent.replace(',', ''));
const initialDouble= parseInt(document.querySelectorAll('[data-price]')[2].textContent.replace(',', ''));
const initialTrouble= parseInt(document.querySelectorAll('[data-price]')[3].textContent.replace(',', ''));

const prices = [initialTrial, initialSingle, initialDouble, initialTrouble];



const activeElement = document.querySelector('.plans_swither_active');
document.querySelector('.plans_swither_box').children[0].addEventListener('click', () => {
  activeElement.style.transform = 'translateX(-100%)';
  
 
    pricePeriod = 'monthly';
    countPrice(); 
  
});
document.querySelector('.plans_swither_box').children[1].addEventListener('click', () => {
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

document.querySelectorAll('.answer_item').forEach(item => {
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



    // onUpdate: function() {
    //   const bigtitleRows = document.querySelectorAll('.bigtitle_row');
    //   const progress = this.progress();
    //   const index = Math.floor(progress * bigtitleRows.length);
    //   bigtitleRows.forEach((row, i) => {
    //     if (i === index) {
    //       row.classList.add('is-hovered');
    //     } 
    //   });
    // }