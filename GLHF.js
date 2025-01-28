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
gsap.set('.mask_wrap', { opacity: 0, scale: 0.5 });

const bigButton = document.querySelector('[data-candle-button]');
const section2 = document.querySelector('.section_2');
let cloneOffset = 0; // Initialize offset for each clone
let verticalOffset = 0;
let prevCandlestickHeight = 100;
bigButton.addEventListener('click', () => {
    trumpHead.classList.add('is-opened');

    gsap.to(trumpBubble, { opacity: 1, scale: 1, duration: 0.2 });
    gsap.to('.mask_wrap', { opacity: 1, scale: 1, duration: 0.2 });

    // Clear any existing timeout to reset the timer
    clearTimeout(window.trumpTimeout);

    window.trumpTimeout = setTimeout(() => {
        trumpHead.classList.remove('is-opened');
        gsap.to(trumpBubble, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to('.mask_wrap', { opacity: 0, scale: 0.5, duration: 0.2 });
        
        // Use a counter to keep track of the current index
        if (!window.newsIndex) {
            window.newsIndex = 0; // Initialize if it doesn't exist
        }

        document.querySelector('[data-user]').textContent = news[window.newsIndex].user;
        document.querySelector('[data-action]').textContent = news[window.newsIndex].action;
        document.querySelector('[data-date]').textContent = news[window.newsIndex].date;
        document.querySelector('[data-img]').src = news[window.newsIndex].img;

        // Increment the index and reset if it exceeds the length of the news array
        window.newsIndex = (window.newsIndex + 1) % news.length;
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


let news = [
    {
        "user": "@Melania",
        "action": "I recently bought $MELANIA",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b5122f19acfbef8eddc2_ava_6.avif"
    },
    {
        "user": "@GaryGensler",
        "action": "I recently bought $BTC",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b51182aa06e6412bf6c1_ava_3.avif"
    },
    {
        "user": "@BlackRock",
        "action": "I recently bought $SOL",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b511eaeabdbe9499a351_ava_1.avif"
    },
    {
        "user": "@VitalikButerin",
        "action": "I recently bought $ETH",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b5117b081e4bf5ac5c73_ava_4.avif"
    },
    {
        "user": "@ChangpengZhao",
        "action": "I recently bought $BNB",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b511a3f13d7cbcd4336c_ava_2.avif"
    },
    {
        "user": "@SamBankman",
        "action": "I recently bought $ETX",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/6797b5118807df4d17389a3e_ava_5.avif"
    },
    {
        "user": "@Elon",
        "action": "I recently bought $DOGE",
        "date": "20/01/2025",
        "img": "https://cdn.prod.website-files.com/679104bf5daa4d6b4e8ca972/67913a0c885c65d16552a5d3_mask.avif"
    }
]


let isPlaying = false;
const audio = new Audio('https://clicker-images.pixelverse.xyz/rich/movie.mp3');

document.querySelector('.bt-sound').addEventListener('click', () => {
    const soundButton = document.querySelector('.icon-bt-sound.on');
    
    if (isPlaying) {
        soundButton.style.opacity = '0.5'; // Change opacity to indicate sound is off
        audio.pause(); // Pause the audio
    } else {
        soundButton.style.opacity = '1'; // Change opacity to indicate sound is on
        audio.play(); // Play the audio
    }
    
    isPlaying = !isPlaying; // Toggle the playing state
});