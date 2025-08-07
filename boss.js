console.log('DOMContentLoaded');
const soundBtn = document.querySelector('.sound_btn');
const soundText = soundBtn.querySelector('.sound_text');
const soundOnIcon = soundBtn.querySelector('.sound_on');
const soundOffIcon = soundBtn.querySelector('.sound_off');

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
});