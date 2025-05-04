var Webflow = Webflow || [];
Webflow.push(function(){
  // Only create and run the footer animation on desktop
  const footerAnimation = gsap.matchMedia();
  
  footerAnimation.add("(min-width: 768px)", () => {
    gsap.from('[data-footer-item]', {
      opacity: 0,
      y: '-50vh',
      stagger: {
        each: 0.2,
        from: 'random'
      },
      duration: 1,
      scrollTrigger: {
        trigger: '.footer-section',
        start: 'top 40%',
        end: 'bottom 20%',
        // markers: true,
      }
    });
  });

// Split text animation for elements with data-split attribute
  console.log('DOMContentLoaded');
  // Calculate the distance from the element being animated to its container
  function calculateDistanceFromTop(elementSelector, containerSelector) {
    const container = document.querySelector(containerSelector);
    const element = document.querySelector(elementSelector);
    
    if (!container || !element) {
      console.error(`Elements not found: ${containerSelector} or ${elementSelector}`);
      return 0;
    }
    
    // Get the positions relative to the viewport
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate the distance between the top of container and the top of element
    const distance = elementRect.bottom - containerRect.top;
    // console.log(distance);
    return distance +5;
  }


// Find all elements with data-split attribute
const splitElements = document.querySelectorAll('[data-split]');

// Process each element
splitElements.forEach(element => {
  // Create the SplitText instance
  const splitText = new SplitText(element, {
    type: 'chars, words',
    charsClass: 'char',
    wordsClass: 'word',
  });
  
  // Store the split instance on the element for potential later use
  // element.splitText = splitText;
  // Create a timeline for animations

});

gsap.from('.s3-container .char', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '.s3-container',
    start: 'top 70%',
    end: 'bottom 20%',
    // markers: true,
  }
})

gsap.from('.s6-container .char', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '.s6-container',
    start: 'top 70%',
    end: 'bottom 20%',
    // markers: true,
  }
})

//#region Grid
//________________________________________________________________________________________________________________________

const tlGrid = gsap.timeline({        
  scrollTrigger: {
    trigger: '.s4-heading-wrap',
    start: 'top 90%',
    end: 'bottom 20%',
    // markers: true,
  }   
})


tlGrid.from('.s4-container .char', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  // ease: 'power2.out',
  stagger: 0.05,
})
tlGrid.from('.s4-container .text-18, .s4-container .button', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  stagger: 0.4,
}, ">-=0.7")
tlGrid.from('.cell', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  ease: 'power2.out',
  stagger: {
    each: 0.05,
    from: "random"
  },

}, "+0.6").from('.character', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,
  ease: 'power2.out',
  stagger: {
    each: 0.05,
    from: "random"
  },

}, ">-=0.4")


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.s2-container',
    start: 'top 60%',
    toggleActions: 'play none none none'
  },
  paused: true
});

// Add animations to the timeline
tl.from('.section-tag', {
  opacity: 0,
  y: 40,
  filter: 'blur(10px)',
  duration: 0.7,
  ease: 'power2.out',
})
.from('.section-2 .char', {
  opacity: 0,
  // y: 20,
  stagger: 0.04,
  duration: 0.7,
  filter: 'blur(10px)',
  ease: 'power2.out',
}, "-=0.4")

; // Start slightly before the first animation ends


//#region Section 2
// Check if we're on desktop (not mobile)
const isDesktop = window.innerWidth > 768; // Common breakpoint for desktop

// Only create and run the animation on desktop
if (isDesktop) {
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-2',
      start: '0% top',
      end: '100% bottom',
      scrub: 2,
      // markers: true,
    }
  });

  // tl2.from('.s2-heading-wrap', {
  //   // opacity: 0,
  //   y: '100%',
  //   duration: 0.3,
  //   ease: 'power2.out',
  // })
  // tl2.add(() => {
  //   tl.play();
  // })
  tl2.from('.s2-square-box1', {
    // opacity: 0,
    y: -calculateDistanceFromTop('.s2-square-box1', '.section-2'),
    duration: 0.5,
    ease: 'power2.out',
  }, )

  tl2.from('.s2-square-box2', {
    // opacity: 0,
    y: -calculateDistanceFromTop('.s2-square-box2', '.section-2'),
    duration: 0.5,
    ease: 'power2.out',
  }, "-=0.3")

  tl2.from('.s2-square-box3', { 
    // opacity: 0,
    y: -calculateDistanceFromTop('.s2-square-box3', '.section-2'),
    duration: 0.5,
    ease: 'power2.out',
  }, "-=0.3")

  tl2.from('.s2-square-box4', {
    // opacity: 0,
    y: -calculateDistanceFromTop('.s2-square-box4', '.section-2'),
    duration: 0.5,
    ease: 'power2.out',
  }, "-=0.3")

  tl2.from('.s2-box-content', {
    opacity: 0,
    xPercent: 50,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  }, "-=0.2")
} else {
  //#region Mobile
  // Create individual timelines for each s2-square-box
  const s2Boxes = document.querySelectorAll('.s2-square-box');
  
  s2Boxes.forEach((box, index) => {

    // Create individual timeline for each box
    const boxTl = gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: '0% 80%',
        end: '100% 50%',
        // markers: true,
      }
    });
    
    // Animation for the box
      boxTl.from(box.querySelector('.s2-color-box'), {
      opacity: 0,
      xPercent: -50,
      duration: 0.5,
      ease: 'power2.out',
    });
    
    // Animation for the content inside the box
    boxTl.from(box.querySelectorAll('.s2-box-content > *'), {
      opacity: 0,
      xPercent: 50,
      filter: 'blur(10px)',
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, "<+=.2");
  });

  function animateWithBlur(selector, triggerSelector) {
    gsap.from(selector, {
      opacity: 0,
      filter: 'blur(10px)',
      yPercent: 10,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerSelector || selector,
        start: '0% 80%',
        end: '100% 50%',
        // markers: true,
      }
    });
  }
  
  // Use the function for s3-content
  animateWithBlur('.s3-slide1-right', '.s3-slide1-right');
  animateWithBlur('.s3-slide1-left', '.s3-slide1-left');
  animateWithBlur('.s3-slide2-content', '.s3-slide2-content');
  animateWithBlur('.maxw-222-mob', '.maxw-222-mob');
  animateWithBlur('.s6-content', '.s6-content');
  // animateWithBlur('.s3-content', '.s3-section');

}

//#endregion

//#region Backers
//________________________________________________________________________________________________________________________

const backersTl = gsap.timeline({
scrollTrigger: {
  trigger: '.backers_section',
  start: 'top 50%',
  end: 'bottom 20%',
  // markers: true,
}
})

backersTl.from('.s5-container', {
  opacity: 0,
})

backersTl.from('.backers_section .char', {
opacity: 0,
filter: 'blur(10px)',
duration: 0.7,
stagger: 0.05,
}, "<");

// Animate all s5-box elements individually
const s5Boxes = document.querySelectorAll('.s5-box');
s5Boxes.forEach((box, index) => {
// console.log(document.querySelector(`.s5-box:nth-child(${index + 1})`));
backersTl.from(box, {
  y: '-100vh',
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,

}, ">-=0.6");
});



  }); 





//#region Swipers 
//________________________________________________________________________________________________________________________

const swiperGames = new Swiper(".swiper-games", {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: false,
  mousewheel: {
    forceToAxis: true
  },
  grabCursor: true,
  speed: 300,
  navigation: {
            nextEl: ".swiper-games-next",
            prevEl: ".swiper-games-prev",
        },
  on: {
            resize: function disableOnMobile(swiper){
                // Disable the slider when the window width is less than or equal to 479
                if(479 > window.innerWidth){
                    swiper.disable()
                    swiper.el.classList.add('-non-slider')
                }else{
                    swiper.enable()
                    swiper.el.classList.remove('-non-slider')
                }
            },
        }
});

// Add click event listener to elements with data-nexus attribute
document.querySelectorAll('[data-nexus]').forEach(element => {
  element.addEventListener('click', function() {
    // Slide to the second slide (index 1) of swiperGames
    if (swiperGames) {
      swiperGames.slideTo(1);
    }
  });
});


const swiperGames2 = new Swiper(".swiper-games2", {

  // loop: true,
  nested: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  autoplay: {
            delay: 2000,  
        },
  // navigation: {
  //           nextEl: ".swiper-games2-next",
  //           prevEl: ".swiper-games2-prev",
  //       },

  on: {
            slideChange: function() {
                const paginationItems = document.querySelectorAll('.pagination_inner');
                if (paginationItems.length) {
                    // Reset all progress lines
                    paginationItems.forEach(item => {
                        const progressLine = item.querySelector('.pagination_progress_line');
                        if (progressLine) {
                            progressLine.style.width = '0%';
                        }
                    });
                    
                    // Fill all previous pagination items completely
                    for (let i = 0; i < this.activeIndex; i++) {
                        if (paginationItems[i]) {
                            const progressLine = paginationItems[i].querySelector('.pagination_progress_line');
                            if (progressLine) {
                                progressLine.style.width = '100%';
                            }
                        }
                    }
                }
            },
            autoplayTimeLeft: function(swiper, time, progress) {
                const paginationItems = document.querySelectorAll('.pagination_inner');
                if (paginationItems.length && this.activeIndex < paginationItems.length) {
                    const currentItem = paginationItems[this.activeIndex];
                    const progressLine = currentItem.querySelector('.pagination_progress_line');
                    if (progressLine) {
                        // Calculate width based on remaining time (100% - progress)
                        const width = (1 - progress) * 100;
                        progressLine.style.width = `${width}%`;
                    }
                }
            }
  },
  speed: 300,
});

const swiperPress = new Swiper(".swiper-press", {
  // Optional parameters
  direction: "horizontal",
  // loop: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  centeredSlides: false,
  grabCursor: true,
  speed: 300,
  navigation: {
            nextEl: ".swiper-press-next",
            prevEl: ".swiper-press-prev",
        },
});


//#region Tetris
//________________________________________________________________________________________________________________________

const title = document.querySelector('.hero_title');
const gradient = document.querySelector('.hero-gradient-overlay');
const titleBox = document.querySelector('.hero-content');

// Game configuration
const EMPTY_CELL = 'empty';
const COLORS = [
  'rgba(84, 182, 99, 0.8)', // Green with opacity
  'rgba(129, 92, 217, 0.8)', // Purple with opacity
  'rgba(51, 98, 236, 0.8)', // Blue with opacity
  'rgba(255, 212, 0, 0.8)', // Yellow with opacity
];

// Tetromino shapes
const SHAPES = [
  // I
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  // O
  [
    [1, 1],
    [1, 1]
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
];

// Game variables
let board = [];
let currentPiece = null;
let currentX = 0;
let currentY = 0;
let gameOver = false;
let gameInterval = null;
let cellSize = 0;
let ROWS = 20; // Default value, will be calculated dynamically
let COLS = 21; // Default for desktop, will be 12 for mobile
let gameInitialized = false; // Flag to track initialization
let gamePaused = false; // Flag to track pause state

// DOM elements
const gameBoard = document.querySelector('#tetris-board');

// Initialize the board and UI after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Tetris initialization starting');
  setTimeout(initializeTetris, 100); // Small delay to ensure DOM is ready
});

// Main initialization function
function initializeTetris() {
  console.log('Tetris initializing...');
  if (!gameBoard) {
    console.error('Game board not found!');
    return;
  }
  
  startGame();
  gameInitialized = true;
  console.log('Tetris initialization complete');
}

// Calculate cell size and number of rows based on viewport height
function calculateBoardDimensions() {
  // Calculate viewport width without scrollbar
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  
  // Set number of columns based on device width
  COLS = viewportWidth <= 479 ? 12 : 21;
  
  // Calculate cell size to fit the viewport width precisely
  cellSize = viewportWidth / COLS;
  
  // Ensure the board height doesn't exceed the visible area
  // For mobile, reserve additional space for navigation elements
  // const mobileNavOffset = viewportWidth <= 479 ? 70 : 0; // Add space for mobile navigation
  const maxRows = Math.floor((viewportHeight) / cellSize);
  // ROWS = Math.min(20, maxRows);
  ROWS = maxRows;
  
  const boardHeight = ROWS * cellSize;
  
  // Set board dimensions - use exact viewport width to avoid rounding issues
  gameBoard.style.width = `${viewportWidth}px`;
  gameBoard.style.height = `${boardHeight}px`;
  gameBoard.style.maxHeight = `100dvh`;
  
  // // Center the board horizontally and position at bottom
  // gameBoard.style.position = 'absolute';
  // gameBoard.style.bottom = '0';
  // gameBoard.style.left = '50%';
  // gameBoard.style.transform = 'translateX(-50%)';
  
  // Make sure cells are crisp on high-DPI displays
  gameBoard.style.zIndex = '1'; // Ensure board is above other elements
  
}

// Initialize the game board
function initBoard() {
  board = [];
  // Fill the entire board with empty cells
  for (let y = 0; y < ROWS; y++) {
    board[y] = [];
    for (let x = 0; x < COLS; x++) {
      board[y][x] = EMPTY_CELL;
    }
  }
}

// Create the visual board with divs
function createBoardDivs() {
  calculateBoardDimensions();
  gameBoard.innerHTML = '';
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement('div');
      cell.className = 'tetris-cell';
      cell.id = `cell-${y}-${x}`;
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.position = 'absolute';
      cell.style.top = `${y * cellSize}px`;
      cell.style.left = `${x * cellSize}px`;
      
      
      gameBoard.appendChild(cell);
    }
  }
}

// Update the visual board based on the game state
function updateBoard() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = document.getElementById(`cell-${y}-${x}`);
      if (board[y][x] === EMPTY_CELL) {
        cell.style.backgroundColor = 'transparent';
        cell.style.backdropFilter = 'none';
      } else {
        cell.style.backgroundColor = COLORS[board[y][x]];
        cell.style.backdropFilter = 'blur(5px)';
      }
    }
  }
}

// Create a new random piece
function newPiece() {
  const shapeIndex = Math.floor(Math.random() * SHAPES.length);
  const shape = SHAPES[shapeIndex];
  const colorIndex = Math.floor(Math.random() * COLORS.length); // Random color from available colors
  currentPiece = {
    shape: shape,
    color: colorIndex,
    x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
    y: 0
  };
  
  // Check if the new piece can be placed
  if (!isValidMove(0, 0)) {
    gameOver = true;
    clearInterval(gameInterval);
    title.innerHTML = 'Try again';
    titleBox.classList.add('is-top');
    gradient.classList.add('is-top');
    // alert('Game Over!');
  }
}

// Check if the current move is valid
function isValidMove(offsetX, offsetY, newShape = null) {
  const shape = newShape || currentPiece.shape;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = currentPiece.x + x + offsetX;
        const newY = currentPiece.y + y + offsetY;
        
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return false;
        }
        
        if (newY >= 0 && board[newY][newX] !== EMPTY_CELL) {
          return false;
        }
      }
    }
  }
  
  return true;
}

// Rotate the current piece
function rotatePiece() {
  const newShape = [];
  const size = currentPiece.shape.length;
  
  for (let y = 0; y < size; y++) {
    newShape[y] = [];
    for (let x = 0; x < size; x++) {
      newShape[y][x] = currentPiece.shape[size - 1 - x][y];
    }
  }
  
  if (isValidMove(0, 0, newShape)) {
    currentPiece.shape = newShape;
  }
}

// Move the piece down
function moveDown() {
  if (isValidMove(0, 1)) {
    currentPiece.y++;
  } else {
    lockPiece();
    clearLines();
    newPiece();
  }
  drawPiece();
}

// Move the piece left
function moveLeft() {
  if (isValidMove(-1, 0)) {
    currentPiece.x--;
    drawPiece();
  }
}

// Move the piece right
function moveRight() {
  if (isValidMove(1, 0)) {
    currentPiece.x++;
    drawPiece();
  }
}

// Drop the piece to the bottom
function dropPiece() {
  while (isValidMove(0, 1)) {
    currentPiece.y++;
  }
  lockPiece();
  clearLines();
  newPiece();
  drawPiece();
}

// Lock the piece in place
function lockPiece() {
  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        const boardY = currentPiece.y + y;
        const boardX = currentPiece.x + x;
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece.color;
        }
      }
    }
  }
}

// Clear completed lines
function clearLines() {
  for (let y = ROWS - 1; y >= 0; y--) {
    let isLineComplete = true;
    
    for (let x = 0; x < COLS; x++) {
      if (board[y][x] === EMPTY_CELL) {
        isLineComplete = false;
        break;
      }
    }
    
    if (isLineComplete) {
      // Move all lines above down
      for (let yy = y; yy > 0; yy--) {
        for (let x = 0; x < COLS; x++) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      
      // Clear the top line
      for (let x = 0; x < COLS; x++) {
        board[0][x] = EMPTY_CELL;
      }
      
      // Check the same line again
      y++;
    }
  }
}

// Draw the current piece on the board
function drawPiece() {
  // Clear the board (only visually)
  updateBoard();
  
  // Draw the current piece
  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        const boardY = currentPiece.y + y;
        const boardX = currentPiece.x + x;
        
        if (boardY >= 0) {
          const cell = document.getElementById(`cell-${boardY}-${boardX}`);
          if (cell) {
            cell.style.backgroundColor = COLORS[currentPiece.color];
            cell.style.backdropFilter = 'blur(5px)';
          }
        }
      }
    }
  }
}

// Pause the game
function pauseGame() {
  if (!gameOver && !gamePaused) {
    clearInterval(gameInterval);
    gamePaused = true;
 
    
    console.log('Game paused');
  }
}

// Resume the game
function resumeGame() {
  if (!gameOver && gamePaused) {
    gameInterval = setInterval(moveDown, 500);
    gamePaused = false;

    

    
    console.log('Game resumed');
  }
}

// Toggle pause state
function togglePause() {
  if (gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
}

// Start the game
function startGame() {
  console.log('Starting game...');
  calculateBoardDimensions();
  // Initialize empty board
  initBoard();
  createBoardDivs();
  newPiece();
  // Draw the initial state
  updateBoard();
  drawPiece();
  gameInterval = setInterval(moveDown, 500);
}

// Restart the game
function restartGame() {
  // Clear any existing game interval
  title.innerHTML = 'PixelVerse';
  titleBox.classList.remove('is-top');
  gradient.classList.remove('is-top');
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  
  // Reset game state
  gameOver = false;
  gamePaused = false;
  

  
  // Reinitialize the game
  initBoard();
  createBoardDivs();
  newPiece();
  // Update the board
  updateBoard();
  drawPiece();
  gameInterval = setInterval(moveDown, 500);
}

const leftButton = document.querySelector('.joystick_arrow.left');
const rightButton = document.querySelector('.joystick_arrow.right');
const downButton = document.querySelector('.joystick_arrow.bottom');
const rotateButton = document.querySelector('.joystick_arrow.top');

// Disable dragging on control buttons to prevent unwanted behavior
[leftButton, rightButton, downButton, rotateButton].forEach(button => {
  if (button) {
    button.addEventListener('dragstart', e => e.preventDefault());
    button.style.userSelect = 'none';
    button.style.webkitUserSelect = 'none';
    button.setAttribute('draggable', 'false');
  }
});

// Variables to track button press state and intervals
let leftInterval = null;
let rightInterval = null;
let downInterval = null;

// Helper function to handle button press events
function setupButtonControls(button, action, interval) {
  // Handle click for single press
  button.addEventListener('click', (e) => {
    e.preventDefault();
    action();
  });
  
  // Handle touch start for continuous action
  button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (interval.current) clearInterval(interval.current);
    
    // Execute action immediately
    action();
    
    // Then set up interval for repeated execution
    interval.current = setInterval(action, 100);
  });
  
  // Handle touch end to stop continuous action
  button.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  });
  
  // Handle touch cancel to stop continuous action
  button.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  });
}

// Set up controls for each button
setupButtonControls(leftButton, moveLeft, { current: leftInterval });
setupButtonControls(rightButton, moveRight, { current: rightInterval });
setupButtonControls(downButton, moveDown, { current: downInterval });

// For rotate button, we don't need continuous rotation
rotateButton.addEventListener('click', (e) => {
  e.preventDefault();
  rotatePiece();
  drawPiece();
});

rotateButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  rotatePiece();
  drawPiece();
});




// Handle keyboard controls
document.addEventListener('keydown', (e) => {
  if (gameOver) return;
  
  switch (e.key) {
    case 'ArrowLeft':
    case 'a':
    case 'A':
      if (!gamePaused) moveLeft();
      e.preventDefault();
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      if (!gamePaused) moveRight();
      e.preventDefault();
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      if (!gamePaused) moveDown();
      e.preventDefault(); // Prevent page scrolling when pressing down arrow
      break;
    case 'ArrowUp':
    case 'w':
    case 'W':
      if (!gamePaused) {
        rotatePiece();
        drawPiece();
      }
      e.preventDefault();
      break;
    case ' ':
      if (!gamePaused) dropPiece();
      e.preventDefault();
      break;
    case 'p':
    case 'P':
      togglePause();
      e.preventDefault();
      break;
    case 'Escape':
      togglePause();
      e.preventDefault();
      break;
  }
});

// Add touch controls for mobile
let touchStartX = null;
let touchStartY = null;
const MIN_SWIPE_DISTANCE = 30; // Minimum distance for a swipe to be registered

gameBoard.addEventListener('touchstart', (e) => {
  if (gameOver) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  e.preventDefault(); // Prevent scrolling while touching the game board
});

gameBoard.addEventListener('touchmove', (e) => {
  if (gameOver) return;
  e.preventDefault(); // Prevent scrolling while touching the game board
});

gameBoard.addEventListener('touchend', (e) => {
  if (gameOver || touchStartX === null || touchStartY === null) return;
  
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Determine if the swipe was primarily horizontal or vertical
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) >= MIN_SWIPE_DISTANCE) {
      if (deltaX > 0) {
        if (!gamePaused) moveRight();
      } else {
        if (!gamePaused) moveLeft();
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) >= MIN_SWIPE_DISTANCE) {
      if (deltaY > 0) {
        if (!gamePaused) dropPiece(); // Swipe down for hard drop
      } else {
        if (!gamePaused) {
          rotatePiece(); // Swipe up to rotate
          drawPiece();
        }
      }
    }
  }
  
  touchStartX = null;
  touchStartY = null;
  e.preventDefault();
});

// Add click event listener to title to restart the game
title.addEventListener('click', restartGame);



// calculateBoardDimensions();
// createBoardDivs();
// updateBoard();
// drawPiece();

// Initialize the game
startGame();

//#endregion Tetris Game Implementation

// // Add scroll event listener to pause the game on mobile devices
// if (window.innerWidth <= 768) { // Common breakpoint for mobile devices
//   let scrollTimeout;
//   let lastScrollPosition = window.scrollY;
  
//   window.addEventListener('scroll', function() {
//     // If the game is running (not paused and not over), pause it
//     if (!gamePaused && !gameOver) {
//       pauseGame();
      
//       // Clear any existing timeout
//       if (scrollTimeout) {
//         clearTimeout(scrollTimeout);
//       }
//     }
    
//     // Store current scroll position
//     lastScrollPosition = window.scrollY;
//   });
  
//   // Check if user returned to the top of the page
//   window.addEventListener('scroll', function() {
//     if (scrollTimeout) {
//       clearTimeout(scrollTimeout);
//     }
    
//     scrollTimeout = setTimeout(function() {
//       // If user is near the top of the page and game is paused, resume it
//       if (window.scrollY < 100 && gamePaused && !gameOver) {
//         resumeGame();
//       }
//     }, 500);
//   });
// }
