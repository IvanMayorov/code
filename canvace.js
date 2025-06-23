const loader = document.querySelector('.loader');
const codeVideo = document.querySelector('.background-video video');
const abstractVideo = document.querySelector('.abstract video');
const overlay = document.querySelector('.color_overlay');

// Вспомогательные функции для управления DOM-элементами и видео
function showElement(el) {
  if (el) {
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
  }
}
function hideElement(el) {
  if (el) {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  }
}
function playVideo(video, time = 0) {
  if (video) {
    video.currentTime = time;
    video.play();
  }
}
function pauseVideo(video, time = null) {
  if (video) {
    video.pause();
    if (time !== null) video.currentTime = time;
  }
}
function setOverlayColor(color) {
  if (overlay) overlay.style.backgroundColor = color;
}
function resetLoaderBackground() {
  if (loader) loader.style.background = '';
}

// Настройка abstract video
if (abstractVideo) {
  abstractVideo.muted = true;
  abstractVideo.style.objectFit = 'cover';
}

// Изначально скрываем loader, показываем видео
if (loader) loader.style.transition = 'opacity .3s ease';
if (codeVideo) codeVideo.style.transition = 'opacity .3s ease';
hideElement(loader);
showElement(codeVideo);


function playAnimation(step = 1) {
  switch (step) {
    case 1:
      setOverlayColor('#D26E62');
      playVideo(codeVideo, 0);
      hideElement(loader);
      resetLoaderBackground();
      setTimeout(() => {
        hideElement(codeVideo);
        pauseVideo(codeVideo);
        showElement(loader);
        resetLoaderBackground();
        playVideo(abstractVideo, 0);
        animateLoader(() => {
          hideElement(loader);
          resetLoaderBackground();
          showElement(codeVideo);
          playVideo(codeVideo, 0);
          pauseVideo(abstractVideo, 3);
          // setTimeout(() => playAnimation(2), 3000);
          playAnimation(2)
        });
      }, 8000);
      break;
    case 2:
      setOverlayColor('transparent');
      playVideo(codeVideo, 0);
      hideElement(loader);
      resetLoaderBackground();
      setTimeout(() => {
        hideElement(codeVideo);
        pauseVideo(codeVideo);
        showElement(loader);
        resetLoaderBackground();
        playVideo(abstractVideo, 3);
        animateLoader(() => {
          hideElement(loader);
          resetLoaderBackground();
          showElement(codeVideo);
          playVideo(codeVideo, 0);
          pauseVideo(abstractVideo);
          // setTimeout(() => playAnimation(3), 3000);
          playAnimation(3)
        });
      }, 8000);
      break;
    case 3:
      setOverlayColor('hsla(218, 37%, 36%, 1)');
      playVideo(codeVideo, 0);
      hideElement(loader);
      resetLoaderBackground();
      setTimeout(() => {
        hideElement(codeVideo);
        pauseVideo(codeVideo);
        showElement(loader);
        resetLoaderBackground();
        playVideo(abstractVideo, 6);
        animateLoader(() => {
          hideElement(loader);
          resetLoaderBackground();
          showElement(codeVideo);
          playVideo(codeVideo, 0);
          pauseVideo(abstractVideo);
          // setTimeout(() => playAnimation(4), 3000);
          playAnimation(4)
        });
      }, 8000);
      break;
    case 4:
      setOverlayColor('transparent');
      playVideo(codeVideo, 0);
      hideElement(loader);
      resetLoaderBackground();
      setTimeout(() => {
        hideElement(codeVideo);
        pauseVideo(codeVideo);
        showElement(loader);
        resetLoaderBackground();
        playVideo(abstractVideo, 9);
        animateLoader(() => {
          hideElement(loader);
          resetLoaderBackground();
          showElement(codeVideo);
          playVideo(codeVideo, 0);
          pauseVideo(abstractVideo);
          playAnimation(5);
        });
      }, 8000);
      break;
    case 5:
      setOverlayColor('#555');
      playVideo(codeVideo, 0);
      hideElement(loader);
      resetLoaderBackground();
      setTimeout(() => {
        hideElement(codeVideo);
        pauseVideo(codeVideo);
        showElement(loader);
        resetLoaderBackground();
        playVideo(abstractVideo, 12);
        animateLoader(() => {
          hideElement(loader);
          resetLoaderBackground();
          showElement(codeVideo);
          playVideo(codeVideo, 0);
          pauseVideo(abstractVideo);
          playAnimation(1);
        });
      }, 8000);
      break;
    default:
      break;
  }
}

function animateLoader(onComplete) {
  if (!loader) {
    if (onComplete) onComplete();
    return;
  }
  let progress = 0;
  const duration = 3000; // 3 seconds
  const startTime = performance.now();
  function update(timestamp) {
    const elapsed = timestamp - startTime;
    progress = (elapsed / duration) * 100;
    loader.style.background = `linear-gradient(90deg, white ${progress}%, transparent ${progress}%)`;
    if (progress < 100) {
      requestAnimationFrame(update);
    } else {
      resetLoaderBackground();
      if (onComplete) onComplete();
    }
  }
  requestAnimationFrame(update);
}

// Запуск анимации
playAnimation();
