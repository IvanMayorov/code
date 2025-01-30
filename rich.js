
const options = {
    frames: 111,
    src:    {
      tarURL:   'https://clicker-images.pixelverse.xyz/rich/sup.tar',
      imageURL: (index) => `sup_${index}.png`,
    },
    clearCanvas: true,
    // showDebugInfo: true,
  
    loop: true,  
    objectFit: 'cover',
  };
  
  const sequence = new FastImageSequence(document.querySelector('.gif-sec-pump'), options);

// sequence.onLoadProgress(()=> {
//     console.log(sequence.progress);
// })

const bigButton = document.querySelector('[data-candle-button]');
const candlestickWrap = document.querySelector('.candlestick_wrap');
const section2 = document.querySelector('.wrp-graph-pump');
const chartPercent = document.querySelector('.chart_percent span');
let chartPercentText = +chartPercent.textContent;
const increase = document.querySelector('.chart_increase span');
let cloneOffset = 0; // Initialize offset for each clone
let verticalOffset = 0;
let prevCandlestickHeight = 100;

let candlestickBoldHeight = document.querySelector('.candlestick_bold').height;
let increaseValue = 0;
bigButton.addEventListener('click', () => {
    // sequence.stop();
    sequence.progress = 0
    // sequence.progress = 0.1
    sequence.play();
    sequence.tick(function(){
        if(sequence.progress === 1){
            // sequence.progress = 0
            sequence.stop();
        }
    })
    const candlestickClone = candlestickWrap.cloneNode(true);
    const candlestickWidth = candlestickWrap.offsetWidth;
    cloneOffset += candlestickWidth + 0.6 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    chartPercentText = parseFloat((chartPercentText + (Math.random())).toFixed(1));
    // increaseValue += +((Math.random() * 100 + 1));
    // increase.textContent = increaseValue.toFixed(1);
    increase.textContent = ((chartPercentText/0.77)*100).toFixed(1);
    chartPercent.textContent = chartPercentText;
    // Randomly change the height of candlestick_bold within the cloned element
    const candlestickBold = candlestickClone.querySelector('.candlestick_bold');
    // candlestickClone.querySelector('.candlestick_top').style.height = Math.random() * (100 - 15) + 15 + 'px';
    const randomHeight = Math.random() * (100 - 15) + 15; // Random height between 15 and 100
    candlestickBold.style.height = `${randomHeight}px`;
    candlestickBoldHeight = randomHeight;
    verticalOffset += candlestickBoldHeight;
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
        const copyText = document.querySelector('.copy_text');
        gsap.set(copyText, { autoAlpha: 0 });
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
            clearTimeout(window.selectorTimeout); // Clear any existing timeout
            const selectorTextCopy = document.querySelector('.selectopr-text-copy');
            if (selectorTextCopy) {
                gsap.to(selectorTextCopy, { width: 'auto',  duration: 0.3 });
                gsap.to(copyText, { autoAlpha: 1, duration: 0.3 });
            }
            window.selectorTimeout = setTimeout(() => {
                gsap.to(selectorTextCopy, { width: '0', duration: 0.3 });
                gsap.to(copyText, { autoAlpha: 0, duration: 0.3 });
            }, 1000);



        });

        const glitchTexts = document.querySelectorAll('.is-glitch');

        function randomizePosition() {
            glitchTexts.forEach(glitchText => {
                const randomX = (Math.random() - 0.5) * 2; // Random value between -10 and 10
                const randomY = (Math.random() - 0.5) * 2; // Random value between -10 and 10
                glitchText.style.transform = `translate(${randomX}rem, ${randomY}rem)`;
            });
        }

        setInterval(randomizePosition, 100); // Change position every 100ms


        if (window.innerWidth < 480) {
            const swiper = new Swiper('.swiper-container', {
                // Optional parameters
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 12,
                // If we need pagination
                pagination: {
                  el: '.swiper-pagination-custom',
                  bulletClass: 'swiper-pagination-custom-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-custom--active',
                  bulletElement: 'div',
                },
              
                // Navigation arrows
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              
                // And if we need scrollbar
                scrollbar: {
                  el: '.swiper-scrollbar',
                },
            });
        }


        // const secContractAddress = document.querySelector('.sec-contract-address');
        const image3Elements = document.querySelectorAll('.image-3');

        document.addEventListener('mousemove', (event) => {
            
            const { clientX, clientY } = event;
            // console.log(event)
            const xOffset = (clientX / window.innerWidth) * 3; // Scale to 0 to 4 rem
            const yOffset = ((clientY / window.innerHeight) * 4) - 2; // Scale to -2 to 2

            image3Elements.forEach((image) => {
                gsap.to(image, {
                    x: xOffset * 16, // Convert rem to pixels (assuming 1 rem = 16px)
                    y: yOffset * 16,
                    duration: 0.4,
                    ease: "power1.out"
                });
            });
        });
        
        const secContractAddress = document.querySelector('.sec-contract-address');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || window.pageYOffset; // Get the vertical scroll position
            const sectionOffset = secContractAddress.getBoundingClientRect().top; // Get the offset of the section
            const yOffset = (scrollY / window.innerHeight) * 6 - 4; // Scale to -4 to 2 rem

            if (sectionOffset < window.innerHeight && sectionOffset > 0) { // Check if the section is in view
                image3Elements.forEach((image) => {
                    gsap.to(image, {
                        y: yOffset * 16, // Convert rem to pixels (assuming 1 rem = 16px)
                        duration: 0.4,
                        ease: "power1.out"
                    });
                });
            }
        });

        

        const imgSecMain = document.querySelector('.img-sec-main');
        const mainCats = document.querySelectorAll('.main_cat');

  

        imgSecMain.addEventListener('click', () => {
            // Show the next main_cat in the sequence
            for (let i = 0; i < mainCats.length; i++) {
                if (mainCats[i].style.display !== 'none') {
                    mainCats[i].style.display = 'none'; // Hide the current one
                    const nextIndex = (i + 1) % mainCats.length; // Get the next index
                    if (nextIndex === 0) {
                        mainCats[mainCats.length - 1].style.display = 'block'; // Keep the last element visible
                        imgSecMain.removeEventListener('click', arguments.callee); // Disable further listening
                    } else {
                        mainCats[nextIndex].style.display = 'block'; // Show the next one
                    }
                    break;
                }
            }
        });