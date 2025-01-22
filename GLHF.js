const candlestickWrap = document.querySelector('.candlestick_wrap');
// const offsetLeft = window.getComputedStyle(candlestickWrap).getPropertyValue('left');
// const offsetBottom = window.getComputedStyle(candlestickWrap).getPropertyValue('bottom');
// console.log(offsetLeft, offsetBottom);
const trumpHead = document.querySelector('.trump_head');
const trumpBubble = document.querySelector('.trump_bubble');
trumpHead.classList.remove('is-opened');
gsap.to(trumpBubble, { opacity: 0, scale: 0.5 });


const bigButton = document.querySelector('.big_button');
const section2 = document.querySelector('.section_2');
let cloneOffset = 0; // Initialize offset for each clone
let verticalOffset = 0;
let prevCandlestickHeight = 100;
bigButton.addEventListener('click', () => {
    trumpHead.classList.add('is-opened');
    gsap.to(trumpBubble, { opacity: 1, scale: 1 });
    setTimeout(() => {
        trumpHead.classList.remove('is-opened');
        gsap.to(trumpBubble, { opacity: 0, scale: 0.5 });
    }, 1000);
  const candlestickClone = candlestickWrap.cloneNode(true);
  const candlestickWidth = candlestickWrap.offsetWidth;
  cloneOffset += candlestickWidth + 0.6 * parseFloat(getComputedStyle(document.documentElement).fontSize); 
  
  
  // Randomly change the height of candlestick_bold within the cloned element
  const candlestickBold = candlestickClone.querySelector('.candlestick_bold');
  const randomHeight = Math.random() * (100 - 15) + 15; // Random height between 15 and 100
  candlestickBold.style.height = `${randomHeight}px`;
  
  verticalOffset += prevCandlestickHeight - randomHeight*0.1;
  candlestickClone.style.transform = `translateX(${cloneOffset}px) translateY(-${verticalOffset}px)`; // Use the updated offset
  section2.appendChild(candlestickClone); // Append the cloned candlestick to section_2
  prevCandlestickHeight = randomHeight;
});

