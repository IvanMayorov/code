var mainSwiper = new Swiper('.main-swiper', {
    slidesPerView: 'auto',
    autoHeight: true,
    speed: 800,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  let msgTimeout;

  mainSwiper.on('slideChangeTransitionStart', function () {
    // Hide all messages immediately
    const messages = document.querySelectorAll('.hero_message');
    messages.forEach(msg => msg.classList.add('is-hidden'));

    // Clear any previous timeout to avoid overlap
    if (msgTimeout) clearTimeout(msgTimeout);

    // Show the current message after 500ms
    const activeIndex = mainSwiper.realIndex;
    msgTimeout = setTimeout(() => {
      if (messages[activeIndex]) {
        messages[activeIndex].classList.remove('is-hidden');
      }
    }, 500);
  });
