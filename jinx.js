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
  let sections = gsap.utils.toArray(".section-1");
  const sectionWidth = document.querySelector('.section-1').offsetWidth;
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      pin: true,
      scrub: 1,
      end: 5000,
      onUpdate: self => {
        console.log("Progress in pixels:", self.progress * sectionWidth);
      }
    }
  });

  tl.to('.track', {
    x: - sectionWidth,
    ease: "none"
  })
  .to('.section-2', {
    yPercent: -100,
    ease: "none"
  })
  .to('.track', {
      x: - sectionWidth * 2,
      ease: "none"
    });
}

window.addEventListener('resize', () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  initGsap();
});

initGsap();