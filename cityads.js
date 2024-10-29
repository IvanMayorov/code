if (window.matchMedia("(min-width: 479px)").matches) {
    const swiper = new Swiper(".s2_main_section", {
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
      },
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
          console.log("slideEl");
          const scaleStep = 0.2;
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
  } else {
    const swiper = new Swiper(".s2_main_section", {
      slidesPerView: "auto",
  
      //   spaceBetween: 20,
      centeredSlides: true,
      // virtualTranslate: true,
      // touchStartForcePreventDefault: true,
      // slideToClickedSlide: true,
      // observer: true,
      //   centeredSlidesBounds: true,
  
      loop: true,
    });
  }

  gsap.to(".main_hero_section", {
    scrollTrigger: {
      trigger: ".hero-sticky_wrap",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    filter: "blur(24px)",
    opacity: 0,
  });
