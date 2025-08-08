
const elCanvas = document.getElementById('c')
const stage = document.getElementById('stage')
const bgInput = document.getElementById('bgInput')
const resetBtn = document.getElementById('reset')
const downloadBtn = document.getElementById('download')
const btnChoose1 = document.getElementById('btn_choose_1')
const btnChoose2 = document.getElementById('btn_choose_2')
const btnChoose3 = document.getElementById('btn_choose_3')
const btnUpload = document.querySelector('.btn_upload')
const btnReset = document.querySelector('.btn_reset')
const btnDownload = document.querySelector('.btn_download')

const canvas = new fabric.Canvas(elCanvas,{preserveObjectStacking:true,backgroundVpt:true,fireRightClick:false,stopContextMenu:true})
let bgImage = null
let overlayObjects = [] // Массив для хранения всех оверлеев

// URL изображений для трех оверлеев
const OVERLAY_URLS = {
  overlay1: 'https://cdn.prod.website-files.com/6894c5d77370c0ff0cb661a0/6895ef4a973ed6b64f02a610_image%2026.avif',
  overlay2: 'https://cdn.prod.website-files.com/6894c5d77370c0ff0cb661a0/6895f1377bc8f98125650d8f_image%2028.avif',
  overlay3: 'https://cdn.prod.website-files.com/6894c5d77370c0ff0cb661a0/6895f148991ef13ff3f61437_image%2027.avif'
}

function resizeCanvas(){
  const w = stage.clientWidth
  const h = stage.clientHeight
  canvas.setWidth(w)
  canvas.setHeight(h)
  if(bgImage) fitBackground(bgImage)
  canvas.requestRenderAll()
}

function fitBackground(img){
  const cw = canvas.getWidth(), ch = canvas.getHeight()
  const iw = img.width, ih = img.height
  const r = Math.min(cw/iw, ch/ih)
  const w = iw*r, h = ih*r
  img.set({scaleX:r, scaleY:r, left:(cw-w)/2, top:(ch-h)/2})
  canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas))
}

function loadFileAsDataURL(file){
  return new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(file) })
}

// Функция для загрузки предустановленного overlay
function loadPredefinedOverlay(overlayUrl, overlayType){
  fabric.Image.fromURL(overlayUrl, img=>{
    const cw = canvas.getWidth(), ch = canvas.getHeight()
    const maxSide = Math.min(cw, ch)*0.6
    const r = Math.min(maxSide/img.width, maxSide/img.height)
    
    // Смещаем каждый следующий оверлей немного в сторону
    const offset = overlayObjects.length * 50
    img.set({
      left: cw/2 + offset, 
      top: ch/2 + offset, 
      originX:'center', 
      originY:'center', 
      scaleX:r, 
      scaleY:r, 
      cornerStyle:'circle', 
      transparentCorners:false
    })
    
    // Сохраняем тип оверлея в объекте
    img._overlayType = overlayType
    
    overlayObjects.push(img)
    canvas.add(img).setActiveObject(img)
    canvas.requestRenderAll()
  },{crossOrigin:'anonymous'})
}

bgInput.addEventListener('change', async e=>{
  const f = e.target.files[0]; if(!f) return
  const url = await loadFileAsDataURL(f)
  fabric.Image.fromURL(url, img=>{
    bgImage = img
    fitBackground(bgImage)
    // Скрываем кнопку загрузки после добавления картинки
    if(btnUpload) {
      btnUpload.style.display = 'none'
    }
    // Показываем кнопку сброса
    if(btnReset) {
      btnReset.style.display = 'flex'
    }
    // Показываем кнопку скачивания
    if(btnDownload) {
      btnDownload.style.display = 'flex'
    }
    // Убираем класс is-disabled со всех assets_box
    const assetsBoxes = document.querySelectorAll('.assets_box')
    assetsBoxes.forEach(box => {
      box.classList.remove('is-disabled')
    })
  },{crossOrigin:'anonymous', selectable:false, evented:false})
})

resetBtn.addEventListener('click', ()=>{
  canvas.clear()
  canvas.setBackgroundImage(null, null)
  overlayObjects = []
  bgImage = null
  resizeCanvas()
  
  // Возвращаем текст кнопок к исходному состоянию
  btnChoose1.textContent = 'CHOOSE'
  btnChoose2.textContent = 'CHOOSE'
  btnChoose3.textContent = 'CHOOSE'
  
  // Убираем класс is-delete со всех кнопок
  btnChoose1.classList.remove('is-delete')
  btnChoose2.classList.remove('is-delete')
  btnChoose3.classList.remove('is-delete')
  
  // Показываем кнопку загрузки при сбросе
  if(btnUpload) {
    btnUpload.style.display = ''
  }
  // Скрываем кнопку сброса при сбросе
  if(btnReset) {
    btnReset.style.display = 'none'
  }
  // Скрываем кнопку скачивания при сбросе
  if(btnDownload) {
    btnDownload.style.display = 'none'
  }
  // Добавляем класс is-disabled обратно ко всем assets_box при сбросе
  const assetsBoxes = document.querySelectorAll('.assets_box')
  assetsBoxes.forEach(box => {
    box.classList.add('is-disabled')
  })
})

downloadBtn.addEventListener('click', ()=>{
  const url = canvas.toDataURL({format:'png', multiplier:2})
  const a = document.createElement('a')
  a.href = url
  a.download = 'result@2x.png'
  a.click()
})

// Обработчики для кнопок выбора оверлеев
btnChoose1.addEventListener('click', ()=>{
  if (btnChoose1.classList.contains('is-delete')) {
    // Удаляем первый оверлей
    const overlayToRemove = overlayObjects.find(obj => obj._overlayType === 'overlay1')
    if (overlayToRemove) {
      canvas.remove(overlayToRemove)
      const index = overlayObjects.indexOf(overlayToRemove)
      overlayObjects.splice(index, 1)
      btnChoose1.textContent = 'CHOOSE'
      btnChoose1.classList.remove('is-delete')
      canvas.requestRenderAll()
    }
  } else {
    // Добавляем первый оверлей
    loadPredefinedOverlay(OVERLAY_URLS.overlay1, 'overlay1')
    btnChoose1.textContent = 'Delete'
    btnChoose1.classList.add('is-delete')
  }
})

btnChoose2.addEventListener('click', ()=>{
  if (btnChoose2.classList.contains('is-delete')) {
    // Удаляем второй оверлей
    const overlayToRemove = overlayObjects.find(obj => obj._overlayType === 'overlay2')
    if (overlayToRemove) {
      canvas.remove(overlayToRemove)
      const index = overlayObjects.indexOf(overlayToRemove)
      overlayObjects.splice(index, 1)
      btnChoose2.textContent = 'CHOOSE'
      btnChoose2.classList.remove('is-delete')
      canvas.requestRenderAll()
    }
  } else {
    // Добавляем второй оверлей
    loadPredefinedOverlay(OVERLAY_URLS.overlay2, 'overlay2')
    btnChoose2.textContent = 'Delete'
    btnChoose2.classList.add('is-delete')
  }
})

btnChoose3.addEventListener('click', ()=>{
  if (btnChoose3.classList.contains('is-delete')) {
    // Удаляем третий оверлей
    const overlayToRemove = overlayObjects.find(obj => obj._overlayType === 'overlay3')
    if (overlayToRemove) {
      canvas.remove(overlayToRemove)
      const index = overlayObjects.indexOf(overlayToRemove)
      overlayObjects.splice(index, 1)
      btnChoose3.textContent = 'CHOOSE'
      btnChoose3.classList.remove('is-delete')
      canvas.requestRenderAll()
    }
  } else {
    // Добавляем третий оверлей
    loadPredefinedOverlay(OVERLAY_URLS.overlay3, 'overlay3')
    btnChoose3.textContent = 'Delete'
    btnChoose3.classList.add('is-delete')
  }
})

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

let pinchActive=false
let pinch0=null
let obj0=null

function twoTouchesData(ev){
  if(!ev.touches || ev.touches.length<2) return null
  const rect = canvas.upperCanvasEl.getBoundingClientRect()
  const t1 = ev.touches[0], t2 = ev.touches[1]
  const p1 = { x: t1.clientX - rect.left, y: t1.clientY - rect.top }
  const p2 = { x: t2.clientX - rect.left, y: t2.clientY - rect.top }
  const cx = (p1.x + p2.x)/2
  const cy = (p1.y + p2.y)/2
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const dist = Math.hypot(dx,dy)
  const angle = Math.atan2(dy,dx)
  return {cx, cy, dist, angle}
}

canvas.upperCanvasEl.addEventListener('touchstart', e=>{
  if(overlayObjects.length === 0) return
  if(e.touches.length===2){
    const d = twoTouchesData(e)
    if(!d) return
    
    // Находим активный объект под пальцами
    const activeObj = canvas.getActiveObject()
    if(!activeObj || !overlayObjects.includes(activeObj)) return
    
    pinchActive = true
    pinch0 = d
    obj0 = {
      left: activeObj.left,
      top: activeObj.top,
      scale: activeObj.scaleX,
      angle: activeObj.angle || 0,
      cx: d.cx,
      cy: d.cy
    }
    activeObj.set({ originX:'center', originY:'center' })
    canvas.setActiveObject(activeObj)
    e.preventDefault()
  }
},{passive:false})

canvas.upperCanvasEl.addEventListener('touchmove', e=>{
  if(!pinchActive) return
  const d = twoTouchesData(e)
  if(!d) return
  
  const activeObj = canvas.getActiveObject()
  if(!activeObj || !overlayObjects.includes(activeObj)) return
  
  const s = obj0.scale * (d.dist / pinch0.dist)
  const rot = obj0.angle + (d.angle - pinch0.angle) * 180 / Math.PI
  const nx = obj0.left + (d.cx - obj0.cx)
  const ny = obj0.top + (d.cy - obj0.cy)
  activeObj.set({ scaleX:s, scaleY:s, angle:rot, left:nx, top:ny })
  canvas.requestRenderAll()
  e.preventDefault()
},{passive:false})

canvas.upperCanvasEl.addEventListener('touchend', e=>{
  if(e.touches.length<2){
    pinchActive=false
    pinch0=null
    obj0=null
  }
},{passive:false})


//#region Sound _________________________________________________________________________________________

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
