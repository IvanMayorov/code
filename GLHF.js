const candlestickWrap = document.querySelector('.candlestick_wrap');
// const offsetLeft = window.getComputedStyle(candlestickWrap).getPropertyValue('left');
// const offsetBottom = window.getComputedStyle(candlestickWrap).getPropertyValue('bottom');
// console.log(offsetLeft, offsetBottom);
const trumpHead = document.querySelector('.trump_head');
const trumpBubble = document.querySelector('.trump_bubble');
const chartPercent = document.querySelector('.chart_percent span');
let chartPercentText = +document.querySelector('.chart_percent span').textContent;
const increase = document.querySelector('.chart_increase span');

trumpHead.classList.remove('is-opened');
gsap.to(trumpBubble, { opacity: 0, scale: 0.5 });
gsap.set('.mask_border', { opacity: 0, scale: 0.5 });

const bigButton = document.querySelector('[data-candle-button]');
const section2 = document.querySelector('.section_2');
let cloneOffset = 0; // Initialize offset for each clone
let verticalOffset = 0;
let prevCandlestickHeight = 100;
bigButton.addEventListener('click', () => {
    trumpHead.classList.add('is-opened');

    gsap.to(trumpBubble, { opacity: 1, scale: 1, duration: 0.2 });
    gsap.to('.mask_border', { opacity: 1, scale: 1, duration: 0.2 });
    setTimeout(() => {
        trumpHead.classList.remove('is-opened');
        gsap.to(trumpBubble, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to('.mask_border', { opacity: 0, scale: 0.5, duration: 0.2 });
    }, 1000);
    const candlestickClone = candlestickWrap.cloneNode(true);
    const candlestickWidth = candlestickWrap.offsetWidth;
    cloneOffset += candlestickWidth + 0.6 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    chartPercentText = parseFloat((chartPercentText + (Math.random() * 5 + 1)).toFixed(1));
    increase.textContent = (Math.random() * 5 + 1).toFixed(1);
    chartPercent.textContent = chartPercentText;
    // Randomly change the height of candlestick_bold within the cloned element
    const candlestickBold = candlestickClone.querySelector('.candlestick_bold');
    const randomHeight = Math.random() * (100 - 15) + 15; // Random height between 15 and 100
    candlestickBold.style.height = `${randomHeight}px`;
    
    verticalOffset += prevCandlestickHeight - randomHeight * 0.1;
    candlestickClone.style.transform = `translateX(${cloneOffset}px) translateY(-${verticalOffset}px)`; // Use the updated offset
    section2.appendChild(candlestickClone); // Append the cloned candlestick to section_2
    prevCandlestickHeight = randomHeight;

    // Log the distance of the cloned object from the top of the page
    const distanceFromTop = candlestickClone.getBoundingClientRect().top + window.scrollY;
    if (distanceFromTop < 0) {
        document.body.style.paddingTop = `${Math.abs(distanceFromTop)}px`;
    }
    console.log('Distance from top:', distanceFromTop);
});


const dropLink = document.querySelectorAll('.drop_row');
dropLink.forEach(link => {
    link.addEventListener('click', () => {
        link.querySelector('.drop_arrow').classList.toggle('is-opened');
        const dropWrap = link.querySelector('.drop_wrap'); // Find the sibling with class drop_wrap
        dropWrap.classList.toggle('is-opened'); // Toggle the class is-opened
    });
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', event => event.preventDefault());
});