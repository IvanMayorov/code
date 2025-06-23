gsap.from('.main_heading-wrap .flex-v-c *, .main_btn-wrap, .main_heading-wrap .flex-h-c, .main_marquee-item_container > *', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out'
});
gsap.from('.section_online .online_heading-wrap > *', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.online_heading-wrap',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_features .online_heading-wrap, .section_features .features_grid-item', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_features',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_how_new .online_heading-wrap, .section_how_new .how_list-item', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_how_new',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_programs_flow_new .programs_flow_heading-wrap, .section_programs_flow_new .programs_flow_grid-item, .section_programs_flow_new .programs_flow-btn-wrap', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_programs_flow_new',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.feel_flex-wrap > *, .fell_info-wrap', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_feel_new',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_price .price_heading-wrap, .price_grid-item', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_price',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_cta .is-h2_programs, .section_cta .max-w-803, .section_cta .session_information_box', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_cta',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

gsap.from('.section_flow .is-h2_programs, .student_stories_card', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_flow',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.section_cta_footer', {
  y: 50,
  opacity: 0,
  duration: 0.8,

  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_cta_footer',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.faq_title_box, .faq_card', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section_faq',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
