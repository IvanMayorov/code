gsap.registerPlugin(ScrollTrigger);

// gsap.to(".section", {
//   scrollTrigger: {
//     trigger: ".section",
//     pin: true,
//     start: "top top",
//     end: "+=500",
//     scrub: true
//   }
// });

function initGsap() {






//   let totalWidth = 0;
//   let current = servicesSection?.previousElementSibling;
  
//   while (current && current.tagName === 'DIV') {
//       totalWidth += current.offsetWidth;
//       current = current.previousElementSibling;
//   }








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
    markers: true
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
  yPercent: -40,
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
  duration: 2,
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
  duration: 2,
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
  duration: 1.5,
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
  duration: 1.5,
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

  // gsap.to('.benefits_section', {
  //   backgroundColor: 'red',
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: '.benefits_section',
  //     containerAnimation: tl,
  //     // scrub: true,
  //     start: '0% center',
  //     end: '100% center',
  //     toggleActions: 'play reverse play reverse',
  //     markers: true
  //   }
  // })
// gsap.to('.benefits_label', {
//   yPercent: 0,
//   duration: 0.2,
//   scrollTrigger: {
//     containerAnimation: tl,
//     trigger: '.mnfst_section',
//     // scrub: true,
//     start: 'left center',
//     end: 'right center',
//     toggleActions: 'play reverse play reverse',
//     markers: true
//   }
// })

// gsap.to('.manifest_label', {
//   yPercent: 0,
//   duration: 0.2,
//   scrollTrigger: {
//     containerAnimation: tl,
//     trigger: '.mnfst_section',
//     // scrub: true,
//     start: 'left center',
//     end: 'right center',
//     toggleActions: 'play reverse play reverse',
//     markers: true
//   }
// })

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

initGsap();



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