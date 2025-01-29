
const options = {
    frames: 110,
    src:    {
      tarURL:   'https://clicker-images.pixelverse.xyz/rich/sup.tar',
      imageURL: (index) => `sup_${index}.png`,
    },
    clearCanvas: true,
  
    // loop: true,  
    objectFit: 'cover',
  };
  
  const sequence = new FastImageSequence(document.querySelector('.gif-sec-pump'), options);


const bigButton = document.querySelector('[data-candle-button]');
const candlestickWrap = document.querySelector('.candlestick_wrap');
const section2 = document.querySelector('.wrp-graph-pump');
const chartPercent = document.querySelector('.chart_percent span');
let chartPercentText = +chartPercent.textContent;
const increase = document.querySelector('.chart_increase span');
let cloneOffset = 0; // Initialize offset for each clone
let verticalOffset = 0;
let prevCandlestickHeight = 100;
bigButton.addEventListener('click', () => {
    sequence.stop();
    sequence.progress = 0
    sequence.play();
    // console.log(sequence.progress);
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




document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', event => event.preventDefault());
});


        // Получаем элемент с классом copy
        const copyElement = document.querySelector('.copy');

        // Добавляем обработчик события на клик
        copyElement.addEventListener('click', () => {
            // Текст, который нужно скопировать
            const textToCopy = document.querySelector('.address').textContent

            // Создаем временный элемент для копирования текста
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            const element = document.querySelector('.copied');

// Удаляем класс is-hidden
element.classList.remove('is-hidden');

// Через секунду добавляем класс обратно
setTimeout(() => {
    element.classList.add('is-hidden');
}, 1000);

        });

        const glitchTexts = document.querySelectorAll('.is-glitch');

        function randomizePosition() {
            glitchTexts.forEach(glitchText => {
                const randomX = (Math.random() - 0.5) * 20; // Random value between -10 and 10
                const randomY = (Math.random() - 0.5) * 20; // Random value between -10 and 10
                glitchText.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        }

        setInterval(randomizePosition, 100); // Change position every 100ms