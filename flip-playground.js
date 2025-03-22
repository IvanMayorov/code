

document.querySelector('.btn').addEventListener('click', () => {
  let state = Flip.getState('.green_box');
  const grid = document.querySelector('.grid');
  const isChanged = grid.classList.toggle('is-changed');
//   if (grid.classList.contains('is-changed')) {
//     state = Flip.getState('.green_box');
//   }
//   // Update the state before the animation
//   state = Flip.getState('.green_box');
  
  Flip.from(state, {
    duration: 0.3,
    ease: 'power1.inOut',
    stagger: 0.1,
    scale: true
    // position: 'absolute',
  });
});