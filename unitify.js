
(function(){
  function readyLibs(){ return window.gsap && window.Swiper }
  function q(s, r=document){ return r.querySelector(s) }
  function qa(s, r=document){ return Array.from(r.querySelectorAll(s)) }

  function initSwitch(root){
    const buttons = qa('[data-framer-name="button"]', root)
    const switchEl = q('[data-framer-name="switch"]', root)
    if (!switchEl || switchEl.dataset.inited) return

    const monthPrices = qa('[data-framer-name="month price"]', root)
    const annualPrices = qa('[data-framer-name="annual price"]', root)
    
    // При загрузке показываем "annual price", скрываем "month price"
    if (monthPrices.length || annualPrices.length) {
      monthPrices.forEach(el => { el.style.display = 'none' })
      annualPrices.forEach(el => { el.style.display = '' })
    }

    buttons.forEach((btn, idx) => {
      if (btn.dataset.bound) return
      btn.dataset.bound = '1'
      btn.addEventListener('click', () => {
        const br = btn.getBoundingClientRect()
        const pr = btn.offsetParent ? btn.offsetParent.getBoundingClientRect() : {left:0, top:0}
        const left = br.left - pr.left
        const width = br.width
        switchEl.style.left = left + 'px'
        switchEl.style.width = width + 'px'
        switchEl.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'

        // Переключение цен по кнопке
        if (btn.textContent.toLowerCase().includes('annual')) {
          annualPrices.forEach(el => { el.style.display = '' })
          monthPrices.forEach(el => { el.style.display = 'none' })
        } else {
          annualPrices.forEach(el => { el.style.display = 'none' })
          monthPrices.forEach(el => { el.style.display = '' })
        }
      })
    })
    switchEl.dataset.inited = '1'
  }

  //#region TABS ______________________________________________________________________
  function activateTab(tab, tabs, root = document){
    const tabIndex = tabs.indexOf(tab)
    // Исключаем слайды, которые находятся внутри свайпера
    const swiperWrapper = q('[data-framer-name="slider-wrapper"]', root)
    const allSlides = qa('[data-framer-name="Slide"]', root)
    const slides = allSlides.filter(slide => {
      // Пропускаем слайды, которые находятся внутри свайпера
      return !swiperWrapper || !swiperWrapper.contains(slide)
    })
    
    // Находим Bottom bar и тексты внутри него
    const bottomBar = q('[data-framer-name="Bottom bar"]', root)
    const bottomBarTexts = bottomBar ? qa('[data-framer-name="tab text"]', bottomBar) : []
    
    tabs.forEach(other=>{
      other.classList.remove('global-shadow-mini')
      other.style.paddingTop = ''
      other.style.paddingBottom = ''
      const t = q('[data-framer-name="tab title"] p', other)
      if (t) t.classList.remove('red-text')
      // Скрываем текст внутри таба
      const tx = q('[data-framer-name="tab text"]', other)
      if (tx) {
        tx.style.height = '0';
        tx.style.opacity = '0';
        tx.style.transform = 'scale(0.97)';
        tx.style.display = 'none';
        tx.style.overflow = 'hidden';
      }
    })
    
    // Скрываем все тексты в Bottom bar
    bottomBarTexts.forEach(tx => {
      tx.style.height = '0';
      tx.style.opacity = '0';
      tx.style.transform = 'scale(0.97)';
      tx.style.display = 'none';
      tx.style.overflow = 'hidden';
    })
    
    // Скрываем все слайды (только те, что не в свайпере)
    slides.forEach(slide => {
      slide.style.display = 'none'
    })
    
    // Показываем соответствующий слайд по порядковому номеру
    if (slides[tabIndex]) {
      slides[tabIndex].style.display = ''
    }
    
    // Показываем соответствующий текст в Bottom bar
    if (bottomBarTexts[tabIndex]) {
      const txt = bottomBarTexts[tabIndex]
      txt.style.display = 'block';
      txt.style.height = 'auto';
      txt.style.opacity = '1';
      txt.style.overflow = '';
      txt.style.transform = 'scale(1)';
    }
    
    tab.classList.add('global-shadow-mini')
    tab.style.paddingTop = '20px'
    tab.style.paddingBottom = '20px'
    const at = q('[data-framer-name="tab title"] p', tab)
    if (at) at.classList.add('red-text')
    // Показываем текст внутри активного таба
    const txt = q('[data-framer-name="tab text"]', tab)
    if (txt){
      txt.style.display = 'block';
      txt.style.height = 'auto';
      txt.style.opacity = '1';
      txt.style.overflow = '';
      txt.style.transform = 'scale(1)';
    }
  }
  //#endregion TABS


  function initTabs(root){
    if (!window.gsap) return
    const mainBar = q('[data-framer-name="Main bar"]', root)
    if (!mainBar) return
    const tabs = qa('[data-framer-name="tab"]', mainBar)
    if (!tabs.length) return
    
    // Находим Bottom bar и тексты внутри него
    const bottomBar = q('[data-framer-name="Bottom bar"]', root)
    const bottomBarTexts = bottomBar ? qa('[data-framer-name="tab text"]', bottomBar) : []
    
    // Инициализируем стили переходов
    // tabs.forEach(t=>{ 
    //   t.style.transition='padding-top 0.3s cubic-bezier(0.4,0,0.2,1), padding-bottom 0.3s cubic-bezier(0.4,0,0.2,1)' 
    // })
    
    // Устанавливаем начальное состояние текстов в Bottom bar
    bottomBarTexts.forEach((el, i) => {
      if (i === 0) {
        el.style.opacity = '1';
        el.style.height = 'auto';
        el.style.display = 'block';
        el.style.overflow = '';
        el.style.transform = 'scale(1)';
      } else {
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.display = 'none';
        el.style.overflow = 'hidden';
        el.style.transform = 'scale(0.97)';
      }
    });
    
    // Устанавливаем начальное состояние текстов внутри табов в Main bar
    tabs.forEach((tab, i) => {
      const tabText = q('[data-framer-name="tab text"]', tab)
      if (tabText) {
        if (i === 0) {
          tabText.style.opacity = '1';
          tabText.style.height = 'auto';
          tabText.style.display = 'block';
          tabText.style.overflow = '';
          tabText.style.transform = 'scale(1)';
        } else {
          tabText.style.opacity = '0';
          tabText.style.height = '0';
          tabText.style.display = 'none';
          tabText.style.overflow = 'hidden';
          tabText.style.transform = 'scale(0.97)';
        }
      }
    });
    // Привязываем обработчики клика
    tabs.forEach(t=>{
      if (t.dataset.bound) return
      t.dataset.bound='1'
      t.addEventListener('click',()=>activateTab(t,tabs,root))
    })
    
    // Инициализируем первый слайд при загрузке
    const slides = qa('[data-framer-name="Slide"]', root)
    // Исключаем слайды свайпера
    const swiperWrapper = q('[data-framer-name="slider-wrapper"]', root)
    const tabSlides = slides.filter(slide => {
      return !swiperWrapper || !swiperWrapper.contains(slide)
    })
    // Скрываем все слайды табов
    tabSlides.forEach((slide, i) => {
      if (i === 0) {
        slide.style.display = ''
      } else {
        slide.style.display = 'none'
      }
    })
    
    // Активируем первый таб, если он еще не активирован
    if (!tabs[0].classList.contains('global-shadow-mini')) {
      activateTab(tabs[0],tabs,root)
    }
  }
 

   //#region SWIPER______________________________________________________________________
  function initSwiper(root){
    if (!window.Swiper) return
    const el = q('[data-framer-name=slider-wrapper]', root)
    if (!el) return
    const wrapper = q('[data-framer-name=slider]', el)
    if (!wrapper) return
    
    // Добавляем обработчик изменения размера окна (если еще не добавлен)
    if (!el.__resizeHandler) {
      let resizeTimeout
      el.__resizeHandler = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          el.dataset.swiperInited = ''
          initSwiper(root)
        }, 150)
      }
      window.addEventListener('resize', el.__resizeHandler)
    }
    
    const windowWidth = window.innerWidth
    
    // Если ширина <= 1180, уничтожаем свайпер если он существует
    if (windowWidth <= 1180) {
      if (el.__swiper) {
        el.__swiper.destroy(true, true)
        el.__swiper = null
        el.dataset.swiperInited = ''
        wrapper.classList.remove('swiper-wrapper')
        qa('[data-framer-name=slide]', el).forEach(s=>s.classList.remove('swiper-slide'))
      }
      return
    }
    
    // Если ширина > 1180, инициализируем свайпер
    if (el.dataset.swiperInited) return
    wrapper.classList.add('swiper-wrapper')
    qa('[data-framer-name=slide]', el).forEach(s=>s.classList.add('swiper-slide'))
    el.__swiper && el.__swiper.destroy(true,true)
    el.__swiper = new Swiper(el,{
        // loop:true,
    // Add navigation for next slide button with data-framer-name="next"
    navigation: {
      nextEl: '[data-framer-name="next"]',
      prevEl: '[data-framer-name="prev"]'
    },
    })
    el.dataset.swiperInited='1'
  }
  //#endregion SWIPER

  //#region FIXED MENU______________________________________________________________________
  function initFixedMenu(root){
    if (!window.gsap) return
    
    const fixedMenu = q('[data-framer-name="Fixed menu"]', root)
    const devices = q('[data-framer-name="devices"]', root)
    if (!fixedMenu || !devices) return
    
    // Функция для показа/скрытия фиксированного меню через GSAP
    let isInitialized = false
    function showFixedMenu(show, immediate = false) {
      if (show) {
        // Сначала делаем видимым для кликов и видимости, затем анимируем прозрачность и поднимаем
        fixedMenu.style.pointerEvents = ''
        fixedMenu.style.visibility = ''
        if (immediate) {
          gsap.set(fixedMenu, { opacity: 1, y: 0 })
        } else {
          gsap.to(fixedMenu, { 
            opacity: 1,
            y: 0,
            duration: 0.3, 
            ease: "power1.out",
            onStart: () => {
              fixedMenu.style.pointerEvents = ''
              fixedMenu.style.visibility = ''
            }
          })
        }
      } else {
        if (immediate) {
          gsap.set(fixedMenu, { opacity: 0, y: 100 })
          fixedMenu.style.pointerEvents = 'none'
          fixedMenu.style.visibility = 'hidden'
        } else {
          // Анимируем прозрачность, опускаем вниз и скрываем по завершении
          gsap.to(fixedMenu, { 
            opacity: 0,
            y: 100,
            duration: 0.3, 
            ease: "power1.in",
            onComplete: () => {
              fixedMenu.style.pointerEvents = 'none'
              fixedMenu.style.visibility = 'hidden'
            }
          })
        }
      }
    }

    // Используем IntersectionObserver, чтобы отследить уход из зоны видимости devices
    let hasBeenVisible = null
    let isFirstCheck = true
    function onVisibilityChange(isVisible) {
      if (hasBeenVisible === isVisible) return
      hasBeenVisible = isVisible
      // При первой проверке устанавливаем состояние без анимации
      showFixedMenu(!isVisible, isFirstCheck)
      if (isFirstCheck) {
        isFirstCheck = false
        isInitialized = true
      }
    }

    // Синхронная проверка начального состояния для избежания мигания
    const rect = devices.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const isInitiallyVisible = rect.top < viewportHeight && rect.bottom > 0
    // Устанавливаем начальное состояние сразу, без анимации
    onVisibilityChange(isInitiallyVisible)
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(entry.isIntersecting)
      },
      {
        threshold: 0.01,
      }
    )
    observer.observe(devices)
  }
  //#endregion FIXED MENU

  //#region INIT 
  function init(){
    initSwitch(document)
    initTabs(document)
    initSwiper(document)
    if (window.innerWidth > 800) {
      initDropdowns(document)
    }
    initFixedMenu(document)
  }

  function initDropdowns(root) {
    const windowWidth = window.innerWidth
    
    // Если ширина <= 800, не создаем дропдауны
    if (windowWidth <= 800) {
      // Если дропдауны были инициализированы, закрываем их и сбрасываем флаги
      const dropdowns = document.querySelectorAll('[data-framer-name="Dropdown"]')
      dropdowns.forEach(d => {
        if (d.dataset.dropdownInited) {
          d.classList.remove('is-active')
          const dropdownContent = d.lastElementChild
          if (dropdownContent) {
            dropdownContent.classList.remove('is-active')
            gsap.to(dropdownContent, { 
              height: 0, 
              opacity: 0,
              duration: 0.3, 
              ease: "power1.in"
            })
          }
          d.dataset.dropdownInited = ''
        }
      })
      return
    }
    
    // Добавляем обработчик изменения размера окна (если еще не добавлен)
    if (!window.__dropdownResizeHandler) {
      let resizeTimeout
      window.__dropdownResizeHandler = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          document.querySelectorAll('[data-framer-name="Dropdown"]').forEach(d => {
            d.dataset.dropdownInited = ''
          })
          initDropdowns(root)
        }, 150)
      }
      window.addEventListener('resize', window.__dropdownResizeHandler)
    }
    
    const dropdowns = document.querySelectorAll('[data-framer-name="Dropdown"]')

    dropdowns.forEach(d => {
      // Пропускаем если уже инициализирован
      if (d.dataset.dropdownInited) return
      d.dataset.dropdownInited = '1'
      
      const dropdownItem = d.firstElementChild
      const dropdownContent = d.lastElementChild

      dropdownContent.style.overflow = 'hidden'
      gsap.set(dropdownContent, { height: 0 })

      dropdownItem.addEventListener('click', () => {
        const isActive = d.classList.toggle('is-active')
        dropdownContent.classList.toggle('is-active')
        if (isActive) {
          // Открытие: анимируем до полной высоты контента
          gsap.to(dropdownContent, { 
            height: 'auto', 
            opacity: 1,
            duration: 0.3, 
            ease: "power1.out",

          });
        } else {
          // Закрытие: анимируем высоту до 0
          gsap.to(dropdownContent, { 
            height: 0, 
            opacity: 0,
            duration: 0.3, 
            ease: "power1.in"
          });
        }
      })
    })
  }
  function resilientInit(start=performance.now()){
    if (!(window.gsap || window.Swiper)){
      if (performance.now()-start<5000) return void setTimeout(()=>resilientInit(start),100)
    }
    init()
  }

  const mo = new MutationObserver(()=>resilientInit())
  mo.observe(document.documentElement,{childList:true,subtree:true})

  document.addEventListener('DOMContentLoaded', resilientInit)
//   window.addEventListener('framerPageChange', resilientInit)
//   window.addEventListener('pageshow', resilientInit)
})();
