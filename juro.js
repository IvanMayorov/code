
// Get all videos inside reviews_card_photo_wrap elements
const reviewCardVideos = document.querySelectorAll('.reviews_card_photo_wrap video');

// Add event listeners to each video
reviewCardVideos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
  });
});


// Get all review card photo wraps
const reviewCardPhotoWraps = document.querySelectorAll('.reviews_card_photo_wrap');

// Add click event listeners to each photo wrap
reviewCardPhotoWraps.forEach(photoWrap => {
  photoWrap.addEventListener('click', () => {
    // Get the testimonial link from the data attribute
    const testimonialLink = photoWrap.getAttribute('data-testimonial-link');
    
    if (testimonialLink) {
      // Find the testimonial container
      const testimonialContainer = document.querySelector('.testimonial_container');
      // Get the poster image URL from the data attribute
      const posterImage = photoWrap.getAttribute('data-poster');
      
      // If the testimonial container exists and we have a poster image
      if (testimonialContainer && posterImage) {
        // Set the background image of the testimonial container
        testimonialContainer.style.backgroundImage = `url('${posterImage}')`;
        testimonialContainer.style.backgroundSize = 'cover';
        testimonialContainer.style.backgroundPosition = 'center';
      }
      
      console.log(testimonialContainer);
      if (testimonialContainer) {
        // Add autoplay parameter to the link
        const autoplayLink = testimonialLink.includes('?') 
          ? `${testimonialLink}&autoplay=1` 
          : `${testimonialLink}?autoplay=1`;
        
        // Create Kinescope iframe based on the example
        const iframeHTML = `<iframe src="${autoplayLink}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>`;
        
        // Clear the container and add the iframe
        testimonialContainer.innerHTML = iframeHTML;
      }
    }
  });
});


$(document).on("closing", '.remodal[data-remodal-id="testimonial"]', function () {
    const modal = $(this); 
    modal.find("iframe").remove();
  });

// Initialize Swiper for reviews
document.addEventListener('DOMContentLoaded', () => {
  // Check if Swiper is loaded and reviews_wrap exists
  if (typeof Swiper !== 'undefined' && document.querySelector('.reviews_wrap')) {
    const mobileSpaceBetween = window.innerWidth <= 479 ? 23 : 90;
    
    const reviewsSwiper = new Swiper('.reviews_wrap', {
      // Enable grabbing cursor
      grabCursor: true,
      
      // Enable smooth sliding
      slidesPerView: 'auto',
      spaceBetween: mobileSpaceBetween,
      centeredSlides: true,
      loop: true,
      
      // Navigation arrows
      navigation: {
        nextEl: '.next',  // Custom class for next button
        prevEl: '.prev',  // Custom class for prev button
      },
    });
    
    // Ensure videos still work with swiper
    reviewsSwiper.on('slideChange', () => {
      // Pause all videos when sliding
      document.querySelectorAll('.reviews_card_photo_wrap video').forEach(video => {
        video.pause();
      });
    });

    // Update spaceBetween on window resize
    window.addEventListener('resize', () => {
      const newSpaceBetween = window.innerWidth <= 479 ? 23 : 90;
      reviewsSwiper.params.spaceBetween = newSpaceBetween;
      reviewsSwiper.update();
    });
  } else {
    console.warn('Swiper not loaded or reviews_wrap not found');
  }
});

// Create a text rotation animation for departments
document.addEventListener('DOMContentLoaded', () => {
  // Array of department names to rotate through
  const departments = [
    'legal',
    'sales',
    'finance',
    'HR',
    'everyone'
  ];
  
  // Find the element to animate (assuming there's an element with a class or data attribute)
  const departmentElement = document.querySelector('.is-changing');
  
  if (departmentElement) {
    let currentIndex = 0;
    
    // Function to update the text
    function rotateDepartment() {
      // Fade out
      departmentElement.style.opacity = 0;
      
      // Change text and fade in after a short delay
      setTimeout(() => {
        departmentElement.textContent = departments[currentIndex];
        departmentElement.style.opacity = 1;
        
        // Move to next department
        currentIndex = (currentIndex + 1) % departments.length;
      }, 500);
    }
    
    // Set initial text
    departmentElement.textContent = departments[0];
    
    // Start rotation with interval
    setInterval(rotateDepartment, 3000);
  }
});


  

  

  
Webflow.push(function () {

    function findLottie(wrap) {
      return window.Webflow.require("lottie")
        .lottie.getRegisteredAnimations()
        .find(
          (animation) => animation.wrapper === wrap.querySelector("div.pont_lottie")
        );
    }

    document.querySelectorAll(".pont_card").forEach((card) => {
        const anim = findLottie(card);
        console.log(anim);
        if (anim) {

          // Create an Intersection Observer
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Element is visible
                  console.log("Anim");
                  anim.goToAndPlay(0, true); // Start Lottie animation
                } else {
                  // Element is not visible
                  anim.pause(); // Pause Lottie animation
                }
              });
            },
            {
              threshold: 0.1, // Trigger when at least 10% of the element is visible
              rootMargin: "0px" // No margin
            }
          );
          
          // Start observing the card element
          observer.observe(card);
        } 
      });

});
  