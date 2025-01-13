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
  gsap.to(selector, { yPercent: 0, duration: 0.3 });
};

const animateLabelOut = selector => {
  gsap.to(selector, { yPercent: -150, duration: 0.3 });
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
    end: getSectionPosition(5),
    // markers: true
  }
});

tl.to('.track', {
  x: -getSectionPosition(1),
  ease: "none",
  duration: 1,
  onUpdate() {
    updateTitle('.label:nth-of-type(1)', this.progress(), 'in');
  }
})
.to('.flames', {
  y: '-40%',
  ease: "none",
  duration: 0.5
}, 0)
.to('.track', {
  x: -getSectionPosition(2),
  ease: "none",
  duration: 1,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(1)', p, 'out');
    updateTitle('.label:nth-of-type(2)', p, 'in');
  }
})
.to('.track', {
  x: -getSectionPosition(3),
  ease: "none",
  duration: 3,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(2)', p, 'out', 0.8);
    updateTitle('.label:nth-of-type(3)', p, 'in', 0.9);
  }
})
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
  x: -getSectionPosition(5),
  ease: "none",
  duration: 3,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(3)', p, 'out', 0.1);
    updateTitle('.label:nth-of-type(4)', p, 'in', 0.15);

  }
})
.to('.projects_section', {
  y: -calculatedProjectsHeight,
  ease: "none",
  duration: 3,
  onUpdate() {
    const p = this.progress();
    updateBigtitleRows(p, bigtitleRowsProjects, activeRowsProjects, bigtitleWrapsProjects);
    updateTitle('.label:nth-of-type(4)', p, 'out', 0);
    updateTitle('.label:nth-of-type(5)', p, 'in', 0);
  }
})
.to('.track', {
  x: -getSectionPosition(6),
  ease: "none",
  duration: 2,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(5)', p, 'out', 0.1);
    updateTitle('.label:nth-of-type(6)', p, 'in', 0.15);
  }
})
.to('.track', {
  x: -getSectionPosition(7),
  ease: "none",
  duration: 1,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(6)', p, 'out', 0.7);
    updateTitle('.label:nth-of-type(7)', p, 'in', 0.7);
  }
})
.to('.track', {
  x: -(getSectionPosition(9) - firstSection.offsetWidth),
  ease: "none",
  duration: 2,
  onUpdate() {
    const p = this.progress();
    updateTitle('.label:nth-of-type(7)', p, 'out', 0.1);
    updateTitle('.label:nth-of-type(8)', p, 'in', 0.15);
  }
})
.to('.navbar, .footer, .main_mask', {
  y: - footerHeight,
  ease: "none",
  duration: 0.5,

})
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


const burger = document.querySelector('.burger_button');
const mask = document.querySelector('.main_mask');
const burgerLine = document.querySelectorAll('.burger_line');
let isOpen = false; // Track the state of the menu

burger.addEventListener('click', () => {
  
  const newWidth = isOpen ? '100%' : 'calc(100% - 28.5rem)';
  const newRotation0 = isOpen ? 0 : 45;
  const newRotation1 = isOpen ? 0 : -45;
  const newY0 = isOpen ? '0rem' : '0.8rem';
  const newY1 = isOpen ? '0rem' : '-0.8rem';

  gsap.to(mask, { width: newWidth, duration: 0.3 });
  gsap.to(burgerLine[0], { rotation: newRotation0, duration: 0.3, y: newY0 });
  gsap.to(burgerLine[1], { rotation: newRotation1, duration: 0.3, y: newY1 });

  isOpen = !isOpen; // Toggle the state
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