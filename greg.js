const mutedIcon = document.querySelector('.is-muted')
const playingIcon = document.querySelector('.is-playing')

const audio = new Audio('https://pub-3e6a388657dd447a81ae3581d6962b0a.r2.dev/demoaudio.mp3');
audio.loop = true;
let clicked = false;
let muted = false;

document.querySelector('.box-sound').addEventListener('click', function() {
    if (!clicked && !muted) {
        console.log('unmuted')
        mutedIcon.style.display = 'none'
        playingIcon.style.display = 'flex'
        muted = true;
     } 
     else if (!clicked && muted) {
        console.log('muted')
        mutedIcon.style.display = 'flex'
        playingIcon.style.display = 'none'
        muted = false;
     }


    if (audio.paused && clicked) {
        audio.play();
        mutedIcon.style.display = 'none'
        playingIcon.style.display = 'flex'
    } else if (!audio.paused && clicked) {
        audio.pause();
        mutedIcon.style.display = 'flex'
        playingIcon.style.display = 'none'
    } 


    // else {
    //     audio.pause();
    //     mutedIcon.style.display = 'flex'
    //     playingIcon.style.display = 'none'
    // }
});

document.querySelector('.btn').addEventListener('click', function() {
    if (audio.paused && !muted) {
        audio.play();
        mutedIcon.style.display = 'none'
        playingIcon.style.display = 'flex'
    } 
    clicked = true;
});

document.querySelector('[data-eagle]').addEventListener('click', function() {
    const eagle = new Audio('https://pub-3e6a388657dd447a81ae3581d6962b0a.r2.dev/eagle.mp3');
    eagle.play();
});

document.querySelector('.wrp-ribbon').addEventListener('click', function() {
		navigator.clipboard.writeText('1234').then(() => {
				    document.querySelector('.copied').style.display = 'flex';
      setTimeout(() => {
              document.querySelector('.copied').style.display = 'none';
      }, 3000);
    });

});


document.querySelector('[data-how]').addEventListener('click', function() {
    // Create overlay for the popup
    console.log('clicked')
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'relative';
    videoContainer.style.width = 'auto';
    videoContainer.style.maxWidth = '800px';
    videoContainer.style.maxHeight = '80vh'; // Limit container height to 80% of viewport height
    videoContainer.style.display = 'flex';
    videoContainer.style.flexDirection = 'column';
    
    // Create video element
    const video = document.createElement('video');
    video.src = 'https://github.com/fatfellas/fellawebsite/raw/refs/heads/main/FNS_HOW_TO_BUY_NO_AUDIO.mp4';

    video.style.height = '80vh'; // Limit video height to 80% of viewport height
    // Set aspect ratio for the video (16:9 - 1280x720)
    video.style.aspectRatio = '9/16';
    video.style.objectFit = 'contain'; // Maintain aspect ratio
    video.controls = true;
    video.autoplay = true;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '-40px';
    closeButton.style.right = '0';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '30px';
    closeButton.style.cursor = 'pointer';
    
    // Add elements to the DOM
    videoContainer.appendChild(video);
    videoContainer.appendChild(closeButton);
    overlay.appendChild(videoContainer);
    document.body.appendChild(overlay);
    
    // Close popup when clicking the close button or outside the video
    closeButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
        video.pause();
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            video.pause();
        }
    });

});