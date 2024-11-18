// script.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let stars = [];
    
    // Distance modifier for particle explosion
    const distanceModifier = 1.5; // Adjust this value to change the distance particles explode

    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Star {
        constructor(x, y, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.finalSize = Math.random() * 2;
            this.size = this.finalSize * 2; // Starting size is twice the final size
            this.alpha = 1;
            this.velocityX = velocityX * 0.05;
            this.velocityY = 1 + Math.random() + velocityY * 0.05;
            this.gravity = 0.02;
            this.drag = 0.97;
            this.turbulence = () => Math.random() * 0.5 - 0.25;
            this.timeElapsed = 0; // Time since the star was created
            this.fadeSpeed = 0.002; // было 0.005
        }
    
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    
        update(deltaTime) {
            this.x += this.velocityX + this.turbulence();
            this.velocityX *= this.drag;
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            this.alpha = Math.max(0, this.alpha - this.fadeSpeed);
    
            this.timeElapsed += deltaTime;
            if (this.timeElapsed < 2000) { // 2000 milliseconds = 2 seconds
                this.size = this.finalSize * 2 - (this.finalSize * this.timeElapsed / 2000);
            } else {
                this.size = this.finalSize;
            }
        } 
    }
    

    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    
    function addStar(e) {
        // Calculate mouse velocity
        mouseVelocityX = e.clientX - lastMouseX;
        mouseVelocityY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    
        // Создаем несколько звёзд за раз
        const starsPerMove = 3; // Количество звёзд за одно движение
        for (let i = 0; i < starsPerMove; i++) {
            // Random offset for mouse velocity
            let randomOffsetX = (Math.random() - 0.5) * 100;
            let randomOffsetY = (Math.random() - 0.5) * 100;
            
            // Добавляем случайное смещение к позиции курсора
            let randomPosX = e.clientX + (Math.random() - 0.5) * 30;
            let randomPosY = e.clientY + (Math.random() - 0.5) * 30;

            // Create new star with modified velocity
            stars.push(new Star(randomPosX, randomPosY, (mouseVelocityX + randomOffsetX) * distanceModifier, (mouseVelocityY + randomOffsetY) * distanceModifier));
        }
    }

    function explodeStars(x, y) {
        const explosionCount = 300; // Increased number of stars to create in the explosion
        for (let i = 0; i < explosionCount; i++) {
            const angle = Math.random() * Math.PI * 2; // Random angle
            const velocity = (Math.random() * 100 + 5) * distanceModifier; // Increased random velocity for stronger explosion
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            stars.push(new Star(x, y, vx, vy));
        }
    }
    
    canvas.addEventListener('mousemove', addStar);
    canvas.addEventListener('click', (e) => {
        explodeStars(e.clientX, e.clientY); // Trigger explosion on click
    });
    
    let lastTime = 0;

    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;

        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => star.update(deltaTime));
        stars.forEach(star => star.draw());
        stars = stars.filter(star => star.alpha > 0 && star.y < height && star.x > 0 && star.x < width);
        requestAnimationFrame(update);
    }

    // Добавляем начальные звёзды
    function addInitialStars() {
        const initialStarsCount = 50;
        for (let i = 0; i < initialStarsCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const vx = (Math.random() - 0.5) * 10;
            const vy = (Math.random() - 0.5) * 10;
            stars.push(new Star(x, y, vx, vy));
        }
    }
    
    addInitialStars();
    
    update();
});
