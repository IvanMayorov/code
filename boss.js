
const soundBtn = document.querySelector('.sound_btn');
const soundText = soundBtn.querySelector('.sound_text');
const soundOnIcon = soundBtn.querySelector('.sound_on');
const soundOffIcon = soundBtn.querySelector('.sound_off');

const audioUrl = 'https://res.cloudinary.com/do7m7foqv/video/upload/v1754586487/Final_boss_tayess.mp3';
const audio = new Audio(audioUrl);
audio.loop = true;
audio.preload = 'auto';

let isSoundOn = false;

function updateSoundButton() {
  if (isSoundOn) {
    if (soundText) soundText.textContent = 'off';
    if (soundOnIcon) soundOnIcon.style.display = 'none';
    if (soundOffIcon) soundOffIcon.style.display = '';
  } else {
    if (soundText) soundText.textContent = 'on';
    if (soundOnIcon) soundOnIcon.style.display = '';
    if (soundOffIcon) soundOffIcon.style.display = 'none';
  }
}

// Initial state
updateSoundButton();

soundBtn.addEventListener('click', function() {
  isSoundOn = !isSoundOn;
  updateSoundButton();
  if (isSoundOn) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
});

const addressBox = document.querySelector('.address_box');
const address = document.querySelector('.address');
const copyIcon = document.querySelector('.copied');

if (addressBox && address) {
  addressBox.addEventListener('click', function() {
    const text = address.textContent || address.innerText;
    let copied = false;
    if (navigator.clipboard && text) {
      navigator.clipboard.writeText(text);
      copied = true;
    } else if (document.execCommand && text) {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        copied = true;
      } catch (e) {}
      document.body.removeChild(textarea);
    }
    if (copied && copyIcon) {
      copyIcon.style.display = 'block';
      setTimeout(() => {
        copyIcon.style.display = 'none';
      }, 1000);
    }
  });
}

const headBox = document.querySelector('.head_box');
const rotateMax = 10;
if (headBox) {
  document.addEventListener('mousemove', function(e) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    // Map mouseY (0 at top, windowHeight at bottom) to rotateMax (top) to -rotateMax (bottom)
    let rotateZ;
    let rotateY;
    if (mouseX > windowWidth / 2) {
      // В правой части: инвертируем наклон по Z
      rotateZ = -rotateMax + ((mouseY / windowHeight) * (rotateMax * 2));
      rotateY = 180;
    } else {
      // В левой части: стандартный наклон
      rotateZ = rotateMax - ((mouseY / windowHeight) * (rotateMax * 2));
      rotateY = 0;
    }
    headBox.style.transform = `rotateZ(${rotateZ}deg) rotateY(${rotateY}deg)`;
  });
}

// const banner = document.querySelector('.banner');
// if (banner) {
//   banner.style.willChange = 'transform';

//   let position = 0;
//   const maxShift = 50; // percent

//   function animateBanner() {
//     position += 0.2; // adjust speed here
//     if (position > maxShift) {
//       position = 0;
//     }
//     banner.style.transform = `translateX(${position}%)`;
//     requestAnimationFrame(animateBanner);
//   }

//   animateBanner();
// }
