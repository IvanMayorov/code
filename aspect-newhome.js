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

  // Simulate click on cookie banner when clicking on X prefs button
$('#cookies-prefs-close').on('click', function(){
  $('#cookies-banner-button').click()
});

  var typed = new Typed(".typed-block", {
  strings: ["CRM","health needs","goals","tastes","labs","budget"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 800,
  startDelay: 500,
  loop: true,
  showCursor: false,
  cursorChar: "|",
  attr: null,
});
