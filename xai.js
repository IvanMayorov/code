let swiperBuild;
let swiperWorks;

function handleSwipers() {
  // For sec_build, only swiper when width > 480
  if (window.innerWidth > 480) {
    if (!swiperBuild) {
      swiperBuild = new Swiper('.sec_build', {
        slidesPerView: 'auto',
        spaceBetween: 16,
      });
    }
    // Destroy works swiper on wide screens
    if (swiperWorks) {
      swiperWorks.destroy(true, true);
      swiperWorks = null;
    }
  } else {
    // Destroy sec_build swiper on small screens
    if (swiperBuild) {
      swiperBuild.destroy(true, true);
      swiperBuild = null;
    }
    // For works_container, only swiper when width <= 480
    if (!swiperWorks) {
      swiperWorks = new Swiper('.works_container .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 12,
        navigation: {
          nextEl: '.arrow_box.next',
          prevEl: '.arrow_box.prev',
        },
        // Optionally, you may want freeMode or scrollbar if needed, depending on design
        // freeMode: true,
        // scrollbar: { el: '.swiper-scrollbar', draggable: true },
      });
    }
  }
}

handleSwipers();
window.addEventListener('resize', handleSwipers);

// Initialize Lottie animation
Webflow.push(function() {
  // Get Lottie library - try multiple methods
  let lottie;
  
  if (window.lottie && typeof window.lottie.loadAnimation === 'function') {
    // Global lottie variable (loaded via script tag)
    lottie = window.lottie;
  } else if (window.Webflow && window.Webflow.require) {
    const lottieModule = window.Webflow.require('lottie');
    // Check if it's the library directly or has a .lottie property
    if (lottieModule && typeof lottieModule.loadAnimation === 'function') {
      lottie = lottieModule;
    } else if (lottieModule && lottieModule.lottie && typeof lottieModule.lottie.loadAnimation === 'function') {
      lottie = lottieModule.lottie;
    }
  }
  
  if (!lottie || typeof lottie.loadAnimation !== 'function') {
    console.error('Lottie library not found or loadAnimation is not available');
    console.log('Available:', { windowLottie: window.lottie, webflowRequire: window.Webflow && window.Webflow.require && window.Webflow.require('lottie') });
  } else {
    const container = document.querySelector(".build_lottie_anim");
    if (!container) {
      console.error('Container .build_lottie_anim not found');
      return;
    }

    // Ensure container has proper positioning for absolute children
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || container.offsetWidth || 800;
    const containerHeight = containerRect.height || container.offsetHeight || 1000;

    // Create wrapper for smooth transitions
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = containerWidth + 'px';
    wrapper.style.height = containerHeight + 'px';
    // Clear existing content but preserve wrapper
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(wrapper);

    // Create idle animation container (with loop)
    let idleContainer = document.createElement('div');
    idleContainer.style.width = containerWidth + 'px';
    idleContainer.style.height = containerHeight + 'px';
    idleContainer.style.position = 'absolute';
    idleContainer.style.top = '0';
    idleContainer.style.left = '0';
    idleContainer.style.opacity = '1';
    idleContainer.style.transition = 'opacity 0s ease-in-out';
    wrapper.appendChild(idleContainer);

    console.log('Creating idle animation...', { containerWidth, containerHeight, idleContainer });
    let buildLottieIdle = lottie.loadAnimation({
      container: idleContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://cdn.prod.website-files.com/69118442979af1742824e092/691438043599bdc59471d885_Woman_laptop_idle.json",
    });

    // Debug: log when animation is loaded
    buildLottieIdle.addEventListener('DOMLoaded', function() {
      console.log('Idle animation DOM loaded');
    });

    buildLottieIdle.addEventListener('data_ready', function() {
      console.log('Idle animation data ready');
    });

    buildLottieIdle.addEventListener('data_failed', function() {
      console.error('Idle animation data failed to load');
    });

    // Check if animation is playing after a short delay
    setTimeout(() => {
      console.log('Animation check:', {
        isPaused: buildLottieIdle.isPaused,
        currentFrame: buildLottieIdle.currentFrame,
        totalFrames: buildLottieIdle.totalFrames,
        containerVisible: idleContainer.offsetWidth > 0 && idleContainer.offsetHeight > 0
      });
    }, 500);

    let buildLottieClick = null;
    let clickContainer = null;
    let isClickInProgress = false;

    // Function to switch to click animation after idle finishes
    function switchToClickAnimation() {
      // Prevent multiple clicks while switching or if click animation already exists
      if (isClickInProgress || !buildLottieIdle || buildLottieClick) return;
      isClickInProgress = true;

      // Stop loop and wait for current animation cycle to complete
      buildLottieIdle.setLoop(false);
      
      // Wait for the current animation cycle to complete
      const onIdleComplete = function() {
        // Remove event listener
        buildLottieIdle.removeEventListener('complete', onIdleComplete);
        
        // Create or reuse click container (positioned on top of idle)
        const currentWidth = wrapper.offsetWidth || containerWidth;
        const currentHeight = wrapper.offsetHeight || containerHeight;
        
        if (!clickContainer) {
          clickContainer = document.createElement('div');
          clickContainer.style.width = currentWidth + 'px';
          clickContainer.style.height = currentHeight + 'px';
          clickContainer.style.position = 'absolute';
          clickContainer.style.top = '0';
          clickContainer.style.left = '0';
          clickContainer.style.transition = 'opacity 0s ease-in-out';
          wrapper.appendChild(clickContainer);
        } else {
          // Reuse existing container
          clickContainer.innerHTML = '';
          clickContainer.style.width = currentWidth + 'px';
          clickContainer.style.height = currentHeight + 'px';
          clickContainer.style.display = 'block';
        }
        clickContainer.style.opacity = '0';
        
        // Create click animation (no loop) - create first, then fade in
        buildLottieClick = lottie.loadAnimation({
          container: clickContainer,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: "https://cdn.prod.website-files.com/69118442979af1742824e092/6914380451bf766c8ee32c72_Woman_laptop_click.json",
        });
        
        // Fade in click animation and fade out idle
        requestAnimationFrame(() => {
          clickContainer.style.opacity = '1';
          idleContainer.style.opacity = '0';
        });
        
        // After transition, stop and hide idle animation (but keep container)
        setTimeout(() => {
          if (buildLottieIdle) {
            buildLottieIdle.pause();
            buildLottieIdle = null;
          }
        }, 200);
        
        // When click animation completes, recreate idle animation with loop
        buildLottieClick.addEventListener('complete', function onClickComplete() {
          buildLottieClick.removeEventListener('complete', onClickComplete);
          
          // Clear idle container and recreate animation
          const returnWidth = wrapper.offsetWidth || containerWidth;
          const returnHeight = wrapper.offsetHeight || containerHeight;
          
          if (idleContainer) {
            idleContainer.innerHTML = '';
            idleContainer.style.width = returnWidth + 'px';
            idleContainer.style.height = returnHeight + 'px';
            idleContainer.style.display = 'block';
          } else {
            idleContainer = document.createElement('div');
            idleContainer.style.width = returnWidth + 'px';
            idleContainer.style.height = returnHeight + 'px';
            idleContainer.style.position = 'absolute';
            idleContainer.style.top = '0';
            idleContainer.style.left = '0';
            idleContainer.style.transition = 'opacity 0s ease-in-out';
            wrapper.appendChild(idleContainer);
          }
          idleContainer.style.opacity = '0';
          
          // Create new idle animation
          buildLottieIdle = lottie.loadAnimation({
            container: idleContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://cdn.prod.website-files.com/69118442979af1742824e092/691438043599bdc59471d885_Woman_laptop_idle.json",
          });
          
          // Fade in idle and fade out click
          requestAnimationFrame(() => {
            idleContainer.style.opacity = '1';
            clickContainer.style.opacity = '0';
          });
          
          // After transition, stop and hide click animation
          setTimeout(() => {
            if (buildLottieClick) {
              buildLottieClick.pause();
              buildLottieClick = null;
            }
            // Keep clickContainer but hide it for reuse
            if (clickContainer) {
              clickContainer.style.display = 'none';
            }
          }, 200);
          
          // Reset flag
          isClickInProgress = false;
        });
      };
      
      // Listen for complete event
      buildLottieIdle.addEventListener('complete', onIdleComplete);
    }

    // Add click event listener to container
    container.addEventListener('click', switchToClickAnimation);
  }
});