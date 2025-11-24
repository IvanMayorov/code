
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

  function activateTab(tab, tabs){
    tabs.forEach(other=>{
      other.classList.remove('global-shadow-mini')
      other.style.paddingTop = ''
      other.style.paddingBottom = ''
      const t = q('[data-framer-name="tab title"] p', other)
      if (t) t.classList.remove('red-text')
      const tx = q('[data-framer-name="tab text"]', other)
      if (tx) {
        gsap.to(tx,{height:0,autoAlpha:0,scale:0.97,duration:0.3,ease:'power2.in',overwrite:'auto',onStart:()=>{tx.style.overflow='hidden'},onComplete:()=>{tx.style.display='none'}})
      }
    })
    tab.classList.add('global-shadow-mini')
    tab.style.paddingTop = '20px'
    tab.style.paddingBottom = '20px'
    const at = q('[data-framer-name="tab title"] p', tab)
    if (at) at.classList.add('red-text')
    const txt = q('[data-framer-name="tab text"]', tab)
    if (txt){
      gsap.set(txt,{display:'block'})
      gsap.fromTo(txt,{height:0,autoAlpha:0,scale:0.97,overflow:'hidden'},{height:'auto',autoAlpha:1,scale:1,duration:0.4,ease:'power2.out',overwrite:'auto',onComplete:()=>{txt.style.overflow='';txt.style.height=''}})
    }
  }

  function initTabs(root){
    if (!window.gsap) return
    const tabs = qa('[data-framer-name="tab"]', root)
    if (!tabs.length) return
    
    const tabTexts = qa('[data-framer-name="tab text"]', root)
    
    // Инициализируем стили переходов
    tabs.forEach(t=>{ 
      t.style.transition='padding-top 0.3s cubic-bezier(0.4,0,0.2,1), padding-bottom 0.3s cubic-bezier(0.4,0,0.2,1)' 
    })
    
    // Устанавливаем начальное состояние текстов табов
    tabTexts.forEach((el,i)=>{
      if (i===0) gsap.set(el,{autoAlpha:1,height:'auto',display:'block',overflow:'',scale:1})
      else gsap.set(el,{autoAlpha:0,height:0,display:'none',overflow:'hidden',scale:0.97})
    })
    
    // Привязываем обработчики клика
    tabs.forEach(t=>{
      if (t.dataset.bound) return
      t.dataset.bound='1'
      t.addEventListener('click',()=>activateTab(t,tabs))
    })
    
    // Активируем первый таб, если он еще не активирован
    if (!tabs[0].classList.contains('global-shadow-mini')) {
      activateTab(tabs[0],tabs)
    }
  }

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
