var Webflow = Webflow || [];
Webflow.push(function(){
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


const tlGrid = gsap.timeline({        
  scrollTrigger: {
    trigger: '.s4-heading-wrap',
    start: 'top 70%',
    end: 'bottom 20%',
    // markers: true,
  }   
})

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

}, ">-=0.5").from('.character', {
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
  // scrollTrigger: {
  //   trigger: element,
  //   start: 'top 80%',
  //   toggleActions: 'play none none none'
  // },
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



const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-2',
    start: '0% top',
    end: '100% bottom',
    scrub: 2,
    // markers: true,
  }
});


  tl2.from('.s2-heading-wrap', {
    // opacity: 0,
    y: '100%',
    duration: 0.3,
    ease: 'power2.out',
  })
tl2.add(() => {
  tl.play();
}, "<")
tl2.from('.s2-square-box1', {
  // opacity: 0,
  y: -calculateDistanceFromTop('.s2-square-box1', '.section-2'),
  duration: 0.5,
  ease: 'power2.out',
})

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

const backersTl = gsap.timeline({
scrollTrigger: {
  trigger: '.backers_section',
  start: 'top 50%',
  end: 'bottom 20%',
  // markers: true,
}
})
backersTl.from('.backers_section .char', {
opacity: 0,
filter: 'blur(10px)',
duration: 0.7,
stagger: 0.05,
});

// Animate all s5-box elements individually
const s5Boxes = document.querySelectorAll('.s5-box');
s5Boxes.forEach((box, index) => {
// console.log(document.querySelector(`.s5-box:nth-child(${index + 1})`));
backersTl.from(box, {
  y: '-100vh',
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.7,

}, ">-=0.5");
});



  }); 





//#region Swipers 
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

const swiperGames2 = new Swiper(".swiper-games2", {
  // Optional parameters
  direction: "horizontal",
  // loop: true,
  nested: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  autoplay: {
            delay: 2000,  
        },
  navigation: {
            nextEl: ".swiper-games2-next",
            prevEl: ".swiper-games2-prev",
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


//#region Tetris Game Implementation


const title = document.querySelector('.hero_title');
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
const COLS = 21; // 21 cells wide as requested

// DOM elements
const gameBoard = document.querySelector('#tetris-board');

// Calculate cell size and number of rows based on viewport height
function calculateBoardDimensions() {
  // Calculate viewport width without scrollbar
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  
  // Allow fractional cell sizes for better fitting
  cellSize = viewportWidth / COLS;
  
  // Calculate maximum number of rows that can fit in 100vh
  const maxRows = Math.floor(viewportHeight / cellSize);
  ROWS = Math.min(maxRows, 20); // Limit to 20 rows maximum
  
  gameBoard.style.width = `100%`;
  gameBoard.style.height = `${ROWS * cellSize}px`;
  
  // Position the game board at the bottom of the viewport
  gameBoard.style.position = 'absolute';
  gameBoard.style.bottom = '0';
  gameBoard.style.left = '0';
}

// Initialize the game board
function initBoard() {
  board = [];
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

// Restart the game
function restartGame() {
  // Clear any existing game interval
  title.innerHTML = 'PixelVerse';
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  
  // Reset game state
  gameOver = false;
  
  // Reinitialize the game
  initBoard();
  createBoardDivs();
  newPiece();
  gameInterval = setInterval(moveDown, 500);
}

// Handle keyboard controls
document.addEventListener('keydown', (e) => {
  if (gameOver) return;
  
  switch (e.key) {
    case 'ArrowLeft':
    case 'a':
    case 'A':
      moveLeft();
      e.preventDefault();
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      moveRight();
      e.preventDefault();
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      moveDown();
      e.preventDefault(); // Prevent page scrolling when pressing down arrow
      break;
    case 'ArrowUp':
    case 'w':
    case 'W':
      rotatePiece();
      drawPiece();
      e.preventDefault();
      break;
    case ' ':
      dropPiece();
      e.preventDefault();
      break;
  }
});

// Add click event listener to title to restart the game
title.addEventListener('click', restartGame);

// Handle window resize
window.addEventListener('resize', () => {
  calculateBoardDimensions();
  createBoardDivs();
  updateBoard();
  drawPiece();
});

// Start the game
function startGame() {
  initBoard();
  createBoardDivs();
  newPiece();
  gameInterval = setInterval(moveDown, 500);
}

// Initialize the game
startGame();

//#endregion Tetris Game Implementation