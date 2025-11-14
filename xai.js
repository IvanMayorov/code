let swiper;
function initSwiperIfWide() {
  if (window.innerWidth > 480) {
    if (!swiper) {
      swiper = new Swiper('.sec_build', {
        slidesPerView: 'auto',
        spaceBetween: 16,
      });
    }
  } else {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  }
}

initSwiperIfWide();
window.addEventListener('resize', initSwiperIfWide);